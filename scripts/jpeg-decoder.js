// Pure JS JPEG decoder & encoder from jpeg-js (BSD-3-Clause)
// Allows Node.js scripts to decode and resize JPEG images without native dependencies like sharp.
import { Buffer } from "node:buffer"

var dctZigZag = new Int32Array([
  0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40,
  48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29,
  22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54,
  47, 55, 62, 63,
])

var dctCos1 = 4017
var dctSin1 = 799
var dctCos3 = 3406
var dctSin3 = 2276
var dctCos6 = 1567
var dctSin6 = 3784
var dctSqrt2 = 5793
var dctSqrt1d2 = 2896

function JpegImage() {}

function buildHuffmanTable(codeLengths, values) {
  var k = 0,
    code = [],
    i,
    j,
    length = 16
  while (length > 0 && !codeLengths[length - 1]) length--
  code.push({ children: [], index: 0 })
  var p = code[0],
    q
  for (i = 0; i < length; i++) {
    for (j = 0; j < codeLengths[i]; j++) {
      p = code.pop()
      p.children[p.index] = values[k]
      while (p.index > 0) {
        if (code.length === 0)
          throw new Error("Could not recreate Huffman Table")
        p = code.pop()
      }
      p.index++
      code.push(p)
      while (code.length <= i) {
        code.push((q = { children: [], index: 0 }))
        p.children[p.index] = q.children
        p = q
      }
      k++
    }
    if (i + 1 < length) {
      code.push((q = { children: [], index: 0 }))
      p.children[p.index] = q.children
      p = q
    }
  }
  return code[0].children
}

function decodeScan(
  data,
  offset,
  frame,
  components,
  resetInterval,
  spectralStart,
  spectralEnd,
  successivePrev,
  successive,
  opts,
) {
  var mcusPerLine = frame.mcusPerLine
  var progressive = frame.progressive
  var startOffset = offset,
    bitsData = 0,
    bitsCount = 0

  function readBit() {
    if (bitsCount > 0) {
      bitsCount--
      return (bitsData >> bitsCount) & 1
    }
    bitsData = data[offset++]
    if (bitsData === 0xff) {
      var nextByte = data[offset++]
      if (nextByte)
        throw new Error(
          "unexpected marker: " + ((bitsData << 8) | nextByte).toString(16),
        )
    }
    bitsCount = 7
    return bitsData >>> 7
  }

  function decodeHuffman(tree) {
    var node = tree,
      bit
    while ((bit = readBit()) !== null) {
      node = node[bit]
      if (typeof node === "number") return node
      if (typeof node !== "object") throw new Error("invalid huffman sequence")
    }
    return null
  }

  function receive(length) {
    var n = 0
    while (length > 0) {
      var bit = readBit()
      if (bit === null) return
      n = (n << 1) | bit
      length--
    }
    return n
  }

  function receiveAndExtend(length) {
    var n = receive(length)
    if (n >= 1 << (length - 1)) return n
    return n + (-1 << length) + 1
  }

  function decodeBaseline(component, zz) {
    var t = decodeHuffman(component.huffmanTableDC)
    var diff = t === 0 ? 0 : receiveAndExtend(t)
    zz[0] = component.pred += diff
    var k = 1
    while (k < 64) {
      var rs = decodeHuffman(component.huffmanTableAC)
      var s = rs & 15,
        r = rs >> 4
      if (s === 0) {
        if (r < 15) break
        k += 16
        continue
      }
      k += r
      var z = dctZigZag[k]
      zz[z] = receiveAndExtend(s)
      k++
    }
  }

  function decodeDCFirst(component, zz) {
    var t = decodeHuffman(component.huffmanTableDC)
    var diff = t === 0 ? 0 : receiveAndExtend(t) << successive
    zz[0] = component.pred += diff
  }

  function decodeDCSuccessive(component, zz) {
    zz[0] |= readBit() << successive
  }

  var eobrun = 0
  function decodeACFirst(component, zz) {
    if (eobrun > 0) {
      eobrun--
      return
    }
    var k = spectralStart,
      e = spectralEnd
    while (k <= e) {
      var rs = decodeHuffman(component.huffmanTableAC)
      var s = rs & 15,
        r = rs >> 4
      if (s === 0) {
        if (r < 15) {
          eobrun = receive(r) + (1 << r) - 1
          break
        }
        k += 16
        continue
      }
      k += r
      var z = dctZigZag[k]
      zz[z] = receiveAndExtend(s) * (1 << successive)
      k++
    }
  }

  var successiveACState = 0,
    successiveACNextValue
  function decodeACSuccessive(component, zz) {
    var k = spectralStart,
      e = spectralEnd,
      r = 0
    while (k <= e) {
      var z = dctZigZag[k]
      var direction = zz[z] < 0 ? -1 : 1
      switch (successiveACState) {
        case 0: {
          var rs = decodeHuffman(component.huffmanTableAC)
          var s = rs & 15,
            rVal = rs >> 4
          if (s === 0) {
            if (rVal < 15) {
              eobrun = receive(rVal) + (1 << rVal)
              successiveACState = 4
            } else {
              r = 16
              successiveACState = 1
            }
          } else {
            if (s !== 1) throw new Error("invalid ACn encoding")
            successiveACNextValue = receiveAndExtend(s)
            successiveACState = rVal ? 2 : 3
            r = rVal
          }
          continue
        }
        case 1:
        case 2:
          if (zz[z]) zz[z] += (readBit() << successive) * direction
          else {
            r--
            if (r === 0) successiveACState = successiveACState === 2 ? 3 : 0
          }
          break
        case 3:
          if (zz[z]) zz[z] += (readBit() << successive) * direction
          else {
            zz[z] = successiveACNextValue << successive
            successiveACState = 0
          }
          break
        case 4:
          if (zz[z]) zz[z] += (readBit() << successive) * direction
          break
      }
      k++
    }
    if (successiveACState === 4) {
      eobrun--
      if (eobrun === 0) successiveACState = 0
    }
  }

  function decodeMcu(component, decode, mcu, row, col) {
    var mcuRow = (mcu / mcusPerLine) | 0
    var mcuCol = mcu % mcusPerLine
    var blockRow = mcuRow * component.v + row
    var blockCol = mcuCol * component.h + col
    if (component.blocks[blockRow] === undefined && opts.tolerantDecoding)
      return
    decode(component, component.blocks[blockRow][blockCol])
  }

  function decodeBlock(component, decode, mcu) {
    var blockRow = (mcu / component.blocksPerLine) | 0
    var blockCol = mcu % component.blocksPerLine
    if (component.blocks[blockRow] === undefined && opts.tolerantDecoding)
      return
    decode(component, component.blocks[blockRow][blockCol])
  }

  var componentsLength = components.length
  var component, i, j, k, n
  var decodeFn
  if (progressive) {
    if (spectralStart === 0)
      decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive
    else decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive
  } else {
    decodeFn = decodeBaseline
  }

  var mcu = 0,
    marker
  var mcuExpected =
    componentsLength === 1
      ? components[0].blocksPerLine * components[0].blocksPerColumn
      : mcusPerLine * frame.mcusPerColumn
  if (!resetInterval) resetInterval = mcuExpected

  var h, v
  while (mcu < mcuExpected) {
    for (i = 0; i < componentsLength; i++) components[i].pred = 0
    eobrun = 0

    if (componentsLength === 1) {
      component = components[0]
      for (n = 0; n < resetInterval; n++) {
        decodeBlock(component, decodeFn, mcu)
        mcu++
      }
    } else {
      for (n = 0; n < resetInterval; n++) {
        for (i = 0; i < componentsLength; i++) {
          component = components[i]
          h = component.h
          v = component.v
          for (j = 0; j < v; j++) {
            for (k = 0; k < h; k++) {
              decodeMcu(component, decodeFn, mcu, j, k)
            }
          }
        }
        mcu++
        if (mcu === mcuExpected) break
      }
    }

    if (mcu === mcuExpected) {
      do {
        if (data[offset] === 0xff) {
          if (data[offset + 1] !== 0x00) break
        }
        offset += 1
      } while (offset < data.length - 2)
    }

    marker = (data[offset] << 8) | data[offset + 1]
    if (marker < 0xff00) throw new Error("marker was not found")
    if (marker >= 0xffd0 && marker <= 0xffd7) offset += 2
    else break
  }

  return offset - startOffset
}

function buildComponentData(frame, component) {
  var lines = []
  var blocksPerLine = component.blocksPerLine
  var blocksPerColumn = component.blocksPerColumn
  var samplesPerLine = blocksPerLine << 3
  var R = new Int32Array(64),
    r = new Uint8Array(64)

  function quantizeAndInverse(zz, dataOut, dataIn) {
    var qt = component.quantizationTable
    var v0, v1, v2, v3, v4, v5, v6, v7, t
    var p = dataIn
    var i

    for (i = 0; i < 64; i++) p[i] = zz[i] * qt[i]

    for (i = 0; i < 8; ++i) {
      var row = 8 * i
      if (
        p[1 + row] === 0 &&
        p[2 + row] === 0 &&
        p[3 + row] === 0 &&
        p[4 + row] === 0 &&
        p[5 + row] === 0 &&
        p[6 + row] === 0 &&
        p[7 + row] === 0
      ) {
        t = (dctSqrt2 * p[0 + row] + 512) >> 10
        p[0 + row] = t
        p[1 + row] = t
        p[2 + row] = t
        p[3 + row] = t
        p[4 + row] = t
        p[5 + row] = t
        p[6 + row] = t
        p[7 + row] = t
        continue
      }

      v0 = (dctSqrt2 * p[0 + row] + 128) >> 8
      v1 = (dctSqrt2 * p[4 + row] + 128) >> 8
      v2 = p[2 + row]
      v3 = p[6 + row]
      v4 = (dctSqrt1d2 * (p[1 + row] - p[7 + row]) + 128) >> 8
      v7 = (dctSqrt1d2 * (p[1 + row] + p[7 + row]) + 128) >> 8
      v5 = p[3 + row] << 4
      v6 = p[5 + row] << 4

      t = (v0 - v1 + 1) >> 1
      v0 = (v0 + v1 + 1) >> 1
      v1 = t
      t = (v2 * dctSin6 + v3 * dctCos6 + 128) >> 8
      v2 = (v2 * dctCos6 - v3 * dctSin6 + 128) >> 8
      v3 = t
      t = (v4 - v6 + 1) >> 1
      v4 = (v4 + v6 + 1) >> 1
      v6 = t
      t = (v7 + v5 + 1) >> 1
      v5 = (v7 - v5 + 1) >> 1
      v7 = t

      t = (v0 - v3 + 1) >> 1
      v0 = (v0 + v3 + 1) >> 1
      v3 = t
      t = (v1 - v2 + 1) >> 1
      v1 = (v1 + v2 + 1) >> 1
      v2 = t
      t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12
      v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12
      v7 = t
      t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12
      v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12
      v6 = t

      p[0 + row] = v0 + v7
      p[7 + row] = v0 - v7
      p[1 + row] = v1 + v6
      p[6 + row] = v1 - v6
      p[2 + row] = v2 + v5
      p[5 + row] = v2 - v5
      p[3 + row] = v3 + v4
      p[4 + row] = v3 - v4
    }

    for (i = 0; i < 8; ++i) {
      var col = i
      if (
        p[1 * 8 + col] === 0 &&
        p[2 * 8 + col] === 0 &&
        p[3 * 8 + col] === 0 &&
        p[4 * 8 + col] === 0 &&
        p[5 * 8 + col] === 0 &&
        p[6 * 8 + col] === 0 &&
        p[7 * 8 + col] === 0
      ) {
        t = (dctSqrt2 * dataIn[i + 0] + 8192) >> 14
        p[0 * 8 + col] = t
        p[1 * 8 + col] = t
        p[2 * 8 + col] = t
        p[3 * 8 + col] = t
        p[4 * 8 + col] = t
        p[5 * 8 + col] = t
        p[6 * 8 + col] = t
        p[7 * 8 + col] = t
        continue
      }

      v0 = (dctSqrt2 * p[0 * 8 + col] + 2048) >> 12
      v1 = (dctSqrt2 * p[4 * 8 + col] + 2048) >> 12
      v2 = p[2 * 8 + col]
      v3 = p[6 * 8 + col]
      v4 = (dctSqrt1d2 * (p[1 * 8 + col] - p[7 * 8 + col]) + 2048) >> 12
      v7 = (dctSqrt1d2 * (p[1 * 8 + col] + p[7 * 8 + col]) + 2048) >> 12
      v5 = p[3 * 8 + col]
      v6 = p[5 * 8 + col]

      t = (v0 - v1 + 1) >> 1
      v0 = (v0 + v1 + 1) >> 1
      v1 = t
      t = (v2 * dctSin6 + v3 * dctCos6 + 2048) >> 12
      v2 = (v2 * dctCos6 - v3 * dctSin6 + 2048) >> 12
      v3 = t
      t = (v4 - v6 + 1) >> 1
      v4 = (v4 + v6 + 1) >> 1
      v6 = t
      t = (v7 + v5 + 1) >> 1
      v5 = (v7 - v5 + 1) >> 1
      v7 = t

      t = (v0 - v3 + 1) >> 1
      v0 = (v0 + v3 + 1) >> 1
      v3 = t
      t = (v1 - v2 + 1) >> 1
      v1 = (v1 + v2 + 1) >> 1
      v2 = t
      t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12
      v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12
      v7 = t
      t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12
      v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12
      v6 = t

      p[0 * 8 + col] = v0 + v7
      p[7 * 8 + col] = v0 - v7
      p[1 * 8 + col] = v1 + v6
      p[6 * 8 + col] = v1 - v6
      p[2 * 8 + col] = v2 + v5
      p[5 * 8 + col] = v2 - v5
      p[3 * 8 + col] = v3 + v4
      p[4 * 8 + col] = v3 - v4
    }

    for (i = 0; i < 64; ++i) {
      var sample = 128 + ((p[i] + 8) >> 4)
      dataOut[i] = sample < 0 ? 0 : sample > 0xff ? 0xff : sample
    }
  }

  for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
    var scanLine = blockRow << 3
    for (i = 0; i < 8; i++) lines.push(new Uint8Array(samplesPerLine))
    for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
      quantizeAndInverse(component.blocks[blockRow][blockCol], r, R)
      var offset = 0,
        sample = blockCol << 3
      for (j = 0; j < 8; j++) {
        var line = lines[scanLine + j]
        for (i = 0; i < 8; i++) line[sample + i] = r[offset++]
      }
    }
  }
  return lines
}

function clampTo8bit(a) {
  return a < 0 ? 0 : a > 255 ? 255 : a
}

JpegImage.prototype = {
  parse: function (data) {
    var offset = 0
    function readUint16() {
      var value = (data[offset] << 8) | data[offset + 1]
      offset += 2
      return value
    }
    function readDataBlock() {
      var len = readUint16()
      var arr = data.subarray(offset, offset + len - 2)
      offset += arr.length
      return arr
    }
    function prepareComponents(frame) {
      var maxH = 0,
        maxV = 0
      var cId, c
      for (cId in frame.components) {
        if (frame.components.hasOwnProperty(cId)) {
          c = frame.components[cId]
          if (maxH < c.h) maxH = c.h
          if (maxV < c.v) maxV = c.v
        }
      }
      var mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / maxH)
      var mcusPerColumn = Math.ceil(frame.scanLines / 8 / maxV)
      for (cId in frame.components) {
        if (frame.components.hasOwnProperty(cId)) {
          c = frame.components[cId]
          var blocksPerLine = Math.ceil(
            (Math.ceil(frame.samplesPerLine / 8) * c.h) / maxH,
          )
          var blocksPerColumn = Math.ceil(
            (Math.ceil(frame.scanLines / 8) * c.v) / maxV,
          )
          var blocksPerLineForMcu = mcusPerLine * c.h
          var blocksPerColumnForMcu = mcusPerColumn * c.v
          var blocks = []
          for (var i = 0; i < blocksPerColumnForMcu; i++) {
            var row = []
            for (var j = 0; j < blocksPerLineForMcu; j++)
              row.push(new Int32Array(64))
            blocks.push(row)
          }
          c.blocksPerLine = blocksPerLine
          c.blocksPerColumn = blocksPerColumn
          c.blocks = blocks
        }
      }
      frame.maxH = maxH
      frame.maxV = maxV
      frame.mcusPerLine = mcusPerLine
      frame.mcusPerColumn = mcusPerColumn
    }

    var jfif = null,
      adobe = null
    var frame, resetInterval
    var quantizationTables = [],
      frames = []
    var huffmanTablesAC = [],
      huffmanTablesDC = []
    var fileMarker = readUint16()
    if (fileMarker !== 0xffd8) throw new Error("SOI not found")

    fileMarker = readUint16()
    while (fileMarker !== 0xffd9) {
      var i, j
      switch (fileMarker) {
        case 0xff00:
          break
        case 0xffe0:
        case 0xffe1:
        case 0xffe2:
        case 0xffe3:
        case 0xffe4:
        case 0xffe5:
        case 0xffe6:
        case 0xffe7:
        case 0xffe8:
        case 0xffe9:
        case 0xffea:
        case 0xffeb:
        case 0xffec:
        case 0xffed:
        case 0xffee:
        case 0xffef:
        case 0xfffe: {
          var appData = readDataBlock()
          if (
            fileMarker === 0xffe0 &&
            appData[0] === 0x4a &&
            appData[1] === 0x46 &&
            appData[2] === 0x49 &&
            appData[3] === 0x46 &&
            appData[4] === 0
          ) {
            jfif = { version: { major: appData[5], minor: appData[6] } }
          }
          if (
            fileMarker === 0xffee &&
            appData[0] === 0x41 &&
            appData[1] === 0x64 &&
            appData[2] === 0x6f &&
            appData[3] === 0x62 &&
            appData[4] === 0
          ) {
            adobe = { transformCode: appData[11] }
          }
          break
        }
        case 0xffdb: {
          var qLen = readUint16()
          var qEnd = qLen + offset - 2
          while (offset < qEnd) {
            var qSpec = data[offset++]
            var tData = new Int32Array(64)
            if (qSpec >> 4 === 0) {
              for (j = 0; j < 64; j++) tData[dctZigZag[j]] = data[offset++]
            } else if (qSpec >> 4 === 1) {
              for (j = 0; j < 64; j++) tData[dctZigZag[j]] = readUint16()
            } else throw new Error("DQT: invalid table spec")
            quantizationTables[qSpec & 15] = tData
          }
          break
        }
        case 0xffc0:
        case 0xffc1:
        case 0xffc2: {
          readUint16()
          frame = {}
          frame.extended = fileMarker === 0xffc1
          frame.progressive = fileMarker === 0xffc2
          frame.precision = data[offset++]
          frame.scanLines = readUint16()
          frame.samplesPerLine = readUint16()
          frame.components = {}
          frame.componentsOrder = []
          var cCount = data[offset++],
            cId
          for (i = 0; i < cCount; i++) {
            cId = data[offset]
            var h = data[offset + 1] >> 4
            var v = data[offset + 1] & 15
            var qId = data[offset + 2]
            frame.componentsOrder.push(cId)
            frame.components[cId] = { h: h, v: v, quantizationIdx: qId }
            offset += 3
          }
          prepareComponents(frame)
          frames.push(frame)
          break
        }
        case 0xffc4: {
          var hLen = readUint16()
          for (i = 2; i < hLen; ) {
            var hSpec = data[offset++]
            var cLens = new Uint8Array(16)
            var cSum = 0
            for (j = 0; j < 16; j++, offset++) {
              cSum += cLens[j] = data[offset]
            }
            var hVals = new Uint8Array(cSum)
            for (j = 0; j < cSum; j++, offset++) hVals[j] = data[offset]
            i += 17 + cSum
            ;(hSpec >> 4 === 0 ? huffmanTablesDC : huffmanTablesAC)[
              hSpec & 15
            ] = buildHuffmanTable(cLens, hVals)
          }
          break
        }
        case 0xffdd:
          readUint16()
          resetInterval = readUint16()
          break
        case 0xffdc:
          readUint16()
          readUint16()
          break
        case 0xffda: {
          readUint16()
          var sCount = data[offset++]
          var comps = [],
            cp
          for (i = 0; i < sCount; i++) {
            cp = frame.components[data[offset++]]
            var tSpec = data[offset++]
            cp.huffmanTableDC = huffmanTablesDC[tSpec >> 4]
            cp.huffmanTableAC = huffmanTablesAC[tSpec & 15]
            comps.push(cp)
          }
          var sStart = data[offset++]
          var sEnd = data[offset++]
          var sApprox = data[offset++]
          var processed = decodeScan(
            data,
            offset,
            frame,
            comps,
            resetInterval,
            sStart,
            sEnd,
            sApprox >> 4,
            sApprox & 15,
            this.opts,
          )
          offset += processed
          break
        }
        case 0xffff:
          if (data[offset] !== 0xff) offset--
          break
        default:
          if (
            data[offset - 3] === 0xff &&
            data[offset - 2] >= 0xc0 &&
            data[offset - 2] <= 0xfe
          ) {
            offset -= 3
            break
          }
          throw new Error("unknown JPEG marker " + fileMarker.toString(16))
      }
      fileMarker = readUint16()
    }

    if (frames.length !== 1)
      throw new Error("only single frame JPEGs supported")

    for (var fIdx = 0; fIdx < frames.length; fIdx++) {
      var frCp = frames[fIdx].components
      for (var fKey in frCp) {
        frCp[fKey].quantizationTable =
          quantizationTables[frCp[fKey].quantizationIdx]
        delete frCp[fKey].quantizationIdx
      }
    }

    this.width = frame.samplesPerLine
    this.height = frame.scanLines
    this.jfif = jfif
    this.adobe = adobe
    this.components = []
    for (var cOrd = 0; cOrd < frame.componentsOrder.length; cOrd++) {
      var curComp = frame.components[frame.componentsOrder[cOrd]]
      this.components.push({
        lines: buildComponentData(frame, curComp),
        scaleX: curComp.h / frame.maxH,
        scaleY: curComp.v / frame.maxV,
      })
    }
  },

  copyToImageData: function (imgData, formatAsRGBA) {
    var width = imgData.width,
      height = imgData.height
    var imageData = imgData.data
    var dataIdx = 0
    var c1 = this.components[0]
    var c2 = this.components[1]
    var c3 = this.components[2]

    for (var j = 0; j < height; j++) {
      var line1 = c1.lines[(j * c1.scaleY) | 0]
      var line2 = c2 ? c2.lines[(j * c2.scaleY) | 0] : null
      var line3 = c3 ? c3.lines[(j * c3.scaleY) | 0] : null

      for (var i = 0; i < width; i++) {
        var Y = line1[(i * c1.scaleX) | 0]
        var Cb = line2 ? line2[(i * c2.scaleX) | 0] : 128
        var Cr = line3 ? line3[(i * c3.scaleX) | 0] : 128

        var R = clampTo8bit(Y + 1.402 * (Cr - 128))
        var G = clampTo8bit(
          Y - 0.3441363 * (Cb - 128) - 0.71413636 * (Cr - 128),
        )
        var B = clampTo8bit(Y + 1.772 * (Cb - 128))

        imageData[dataIdx++] = R
        imageData[dataIdx++] = G
        imageData[dataIdx++] = B
        if (formatAsRGBA) imageData[dataIdx++] = 255
      }
    }
  },
}

export function decodeJpeg(buf) {
  var parser = new JpegImage()
  parser.opts = { tolerantDecoding: true }
  parser.parse(new Uint8Array(buf))
  var w = parser.width
  var h = parser.height
  var outBuf = Buffer.alloc(w * h * 4)
  parser.copyToImageData({ width: w, height: h, data: outBuf }, true)
  return { width: w, height: h, data: outBuf }
}
