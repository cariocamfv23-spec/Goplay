/**
 * scripts/inspect-mp4-audio.mjs
 *
 * Inspeciona arquivos MP4 baixando os metadados (caixas moov/trak/mdia/hdlr)
 * para identificar com precisão a presença de faixas de vídeo ('vide') e áudio ('soun'),
 * codecs (ex: 'mp4a' / AAC), taxa de amostragem e canais.
 * Roda de forma independente via Node.js (fora do Vite).
 */

const URLS = {
  soccer:
    "https://xjpzglglpkeggpywqtac.supabase.co/storage/v1/object/public/posts/test-soccer-training-mixkit.mp4",
  basketball:
    "https://xjpzglglpkeggpywqtac.supabase.co/storage/v1/object/public/posts/test-basketball-dunk-mixkit.mp4",
  soccerFallback:
    "https://xjpzglglpkeggpywqtac.supabase.co/storage/v1/object/public/posts/move/demo_futebol.mp4",
}

/**
 * Lê os primeiros bytes via HTTP Range para parsear as caixas ISOBMFF do MP4.
 */
async function fetchRange(url, start = 0, length = 1048576) {
  const end = start + length - 1
  const res = await fetch(url, {
    headers: {
      Range: `bytes=${start}-${end}`,
    },
  })
  const status = res.status
  const contentType = res.headers.get("content-type")
  const contentRange = res.headers.get("content-range")
  const acceptRanges = res.headers.get("accept-ranges")
  const accessControlAllowOrigin = res.headers.get(
    "access-control-allow-origin",
  )
  const arrayBuffer = await res.arrayBuffer()
  return {
    status,
    contentType,
    contentRange,
    acceptRanges,
    accessControlAllowOrigin,
    buffer: Buffer.from(arrayBuffer),
  }
}

/**
 * Parse simples de caixas MP4 recursivas
 */
function findBoxes(buffer, offset = 0, end = buffer.length) {
  const boxes = []
  let pos = offset
  while (pos + 8 <= end) {
    let size = buffer.readUInt32BE(pos)
    const type = buffer.toString("ascii", pos + 4, pos + 8)
    let headerSize = 8
    if (size === 1) {
      // 64-bit size
      if (pos + 16 > end) break
      const hi = buffer.readUInt32BE(pos + 8)
      const lo = buffer.readUInt32BE(pos + 12)
      size = hi * 2 ** 32 + lo
      headerSize = 16
    } else if (size === 0) {
      // extends to end of file
      size = end - pos
    }

    if (size < headerSize) break
    boxes.push({
      type,
      start: pos,
      headerSize,
      size,
      dataStart: pos + headerSize,
      dataEnd: Math.min(pos + size, end),
    })
    pos += size
  }
  return boxes
}

function findBoxRecursive(buffer, targetTypes) {
  // targetTypes: ex ['moov', 'trak']
  const results = []
  function search(start, end, depth) {
    if (depth >= targetTypes.length) return
    const targetType = targetTypes[depth]
    const boxes = findBoxes(buffer, start, end)
    for (const box of boxes) {
      if (box.type === targetType) {
        if (depth === targetTypes.length - 1) {
          results.push(box)
        } else {
          search(box.dataStart, box.dataEnd, depth + 1)
        }
      }
    }
  }
  search(0, buffer.length, 0)
  return results
}

async function testHttpUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD" })
    return {
      ok: res.ok,
      status: res.status,
      contentType: res.headers.get("content-type"),
    }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

export async function inspectMp4(url, label) {
  console.log(`\n==================================================`)
  console.log(`[INSPEÇÃO] ${label}`)
  console.log(`URL: ${url}`)

  // Faz teste de Range inicial de 2MB
  let headRes
  try {
    headRes = await fetchRange(url, 0, 2 * 1024 * 1024)
  } catch (err) {
    console.error(`Erro ao baixar ${label}:`, err)
    return { hasAudio: false, error: err.message }
  }

  console.log(`HTTP Status: ${headRes.status} (esperado: 206 Partial Content)`)
  console.log(`Content-Type: ${headRes.contentType}`)
  console.log(`Accept-Ranges: ${headRes.acceptRanges}`)
  console.log(`Content-Range: ${headRes.contentRange}`)
  console.log(
    `CORS (Access-Control-Allow-Origin): ${headRes.accessControlAllowOrigin || "não especificado"}`,
  )
  console.log(`Bytes recebidos: ${headRes.buffer.length}`)

  let buffer = headRes.buffer

  // Encontra moov
  let moovBoxes = findBoxRecursive(buffer, ["moov"])
  if (moovBoxes.length === 0) {
    // Pode estar no final do arquivo? Se moov estiver no final, baixar o fim do arquivo
    console.log(
      "moov não encontrado nos primeiros 2MB, tentando baixar arquivo completo...",
    )
    const fullRes = await fetch(url)
    buffer = Buffer.from(await fullRes.arrayBuffer())
    moovBoxes = findBoxRecursive(buffer, ["moov"])
  }

  if (moovBoxes.length === 0) {
    console.log("ERRO: Caixa 'moov' não encontrada no MP4.")
    return { hasAudio: false, error: "moov not found" }
  }

  const moov = moovBoxes[0]
  console.log(
    `Caixa 'moov' encontrada em offset ${moov.start}, tamanho ${moov.size} bytes.`,
  )

  // Procura por todas as caixas 'trak'
  const traks = []
  const trakBoxes = findBoxes(buffer, moov.dataStart, moov.dataEnd).filter(
    (b) => b.type === "trak",
  )
  console.log(`Número de faixas (trak): ${trakBoxes.length}`)

  const trackSummaries = []

  for (let i = 0; i < trakBoxes.length; i++) {
    const trak = trakBoxes[i]
    // Dentro de trak, procurar mdia -> hdlr
    const mdiaList = findBoxes(buffer, trak.dataStart, trak.dataEnd).filter(
      (b) => b.type === "mdia",
    )
    let handlerType = "desconhecido"
    let handlerName = ""
    let codec = ""

    if (mdiaList.length > 0) {
      const mdia = mdiaList[0]
      const mdiaChildren = findBoxes(buffer, mdia.dataStart, mdia.dataEnd)
      const hdlr = mdiaChildren.find((b) => b.type === "hdlr")
      if (hdlr) {
        // hdlr layout: 4 bytes version/flags, 4 bytes pre_defined, 4 bytes handler_type
        if (hdlr.dataStart + 12 <= hdlr.dataEnd) {
          handlerType = buffer.toString(
            "ascii",
            hdlr.dataStart + 8,
            hdlr.dataStart + 12,
          )
        }
      }

      // Procurar minf -> stbl -> stsd para obter codec
      const minf = mdiaChildren.find((b) => b.type === "minf")
      if (minf) {
        const minfChildren = findBoxes(buffer, minf.dataStart, minf.dataEnd)
        const stbl = minfChildren.find((b) => b.type === "stbl")
        if (stbl) {
          const stblChildren = findBoxes(buffer, stbl.dataStart, stbl.dataEnd)
          const stsd = stblChildren.find((b) => b.type === "stsd")
          if (stsd && stsd.dataStart + 8 <= stsd.dataEnd) {
            // stsd: 4 bytes version/flags, 4 bytes entry_count, then sample entry box
            const entryCount = buffer.readUInt32BE(stsd.dataStart + 4)
            if (entryCount > 0 && stsd.dataStart + 16 <= stsd.dataEnd) {
              codec = buffer.toString(
                "ascii",
                stsd.dataStart + 12,
                stsd.dataStart + 16,
              )
            }
          }
        }
      }
    }

    const isAudio = handlerType === "soun"
    const isVideo = handlerType === "vide"
    const summary = {
      index: i + 1,
      handlerType,
      isAudio,
      isVideo,
      codec,
    }
    trackSummaries.push(summary)
    console.log(
      `- Trilha #${i + 1}: tipo='${handlerType}' (${
        isAudio ? "ÁUDIO" : isVideo ? "VÍDEO" : "OUTRO"
      }), codec='${codec}'`,
    )
  }

  const hasAudio = trackSummaries.some((t) => t.isAudio)
  console.log(
    `=> RESULTADO: ${
      hasAudio
        ? "TEM ÁUDIO REAL (trilha 'soun')"
        : "NÃO TEM ÁUDIO (sem trilha 'soun')"
    }!`,
  )

  return {
    hasAudio,
    tracks: trackSummaries,
    httpStatus: headRes.status,
    contentType: headRes.contentType,
    cors: headRes.accessControlAllowOrigin,
  }
}

async function run() {
  console.log("=== INICIANDO INSPEÇÃO DE ÁUDIO MP4 GOPLAY ===")
  const results = {}
  for (const [key, url] of Object.entries(URLS)) {
    results[key] = await inspectMp4(url, key)
  }

  console.log("\n==================================================")
  console.log("=== RESUMO FINAL ===")
  for (const [key, res] of Object.entries(results)) {
    console.log(
      `${key}: ${
        res.hasAudio ? "COM ÁUDIO" : "SEM ÁUDIO"
      } (Status: ${res.httpStatus})`,
    )
  }

  console.log("\nTestando URL do MP3 mixkit-sports-highlights-720.mp3:")
  const mp3Test = await testHttpUrl(
    "https://assets.mixkit.co/music/preview/mixkit-sports-highlights-720.mp3",
  )
  console.log("Mixkit MP3:", mp3Test)
}

// Executa se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch(console.error)
}
