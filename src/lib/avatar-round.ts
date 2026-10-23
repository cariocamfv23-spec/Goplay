/**
 * Utilitário no cliente para gerar variante circular de imagem com fundo transparente (alpha).
 * Usado nas notificações push Android / Samsung One UI para que o ícone do autor
 * apareça redondo sem cantos quadrados.
 */

export interface CropCircleOptions {
  size?: number
  mimeType?: "image/png"
}

/**
 * Recorta uma imagem (File ou Blob) em formato circular centralizado em canvas
 * com fundo transparente (PNG com canal alpha) no tamanho especificado (padrão 192x192).
 */
export async function createCircularAvatarBlob(
  file: Blob | File,
  options?: CropCircleOptions,
): Promise<Blob> {
  const targetSize = options?.size ?? 192

  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      try {
        URL.revokeObjectURL(objectUrl)

        const canvas = document.createElement("canvas")
        canvas.width = targetSize
        canvas.height = targetSize

        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(
            new Error("Não foi possível inicializar o contexto 2D do canvas."),
          )
          return
        }

        // Garante limpeza transparente
        ctx.clearRect(0, 0, targetSize, targetSize)

        // Traçar recorte circular perfeito
        const radius = targetSize / 2
        ctx.beginPath()
        ctx.arc(radius, radius, radius, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.clip()

        // Calcular enquadramento centralizado proporcional (object-fit: cover)
        const srcWidth = img.naturalWidth || img.width
        const srcHeight = img.naturalHeight || img.height

        let sx = 0
        let sy = 0
        let sWidth = srcWidth
        let sHeight = srcHeight

        if (srcWidth > srcHeight) {
          sWidth = srcHeight
          sx = (srcWidth - srcHeight) / 2
        } else if (srcHeight > srcWidth) {
          sHeight = srcWidth
          sy = (srcHeight - srcWidth) / 2
        }

        // Desenhar a imagem cortada dentro do clipping circular
        ctx.drawImage(
          img,
          sx,
          sy,
          sWidth,
          sHeight,
          0,
          0,
          targetSize,
          targetSize,
        )

        // Exportar como PNG com alpha
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error("Falha ao exportar canvas como PNG."))
          }
        }, "image/png")
      } catch (err) {
        reject(err)
      }
    }

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl)
      reject(
        new Error(
          "Falha ao carregar arquivo de imagem para recorte: " + String(err),
        ),
      )
    }

    img.src = objectUrl
  })
}
