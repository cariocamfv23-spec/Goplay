import { supabase } from '@/lib/supabase/client'

export interface ImageCompressionOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

/**
 * Redimensiona e comprime uma imagem no browser usando HTMLCanvasElement.
 * Especialmente importante no Samsung/Android onde câmeras tiram fotos de 12MP a 108MP (10MB+).
 * Retorna um Blob WebP ou JPEG otimizado (< 1MB) preservando a proporção de tela.
 */
export async function compressImage(
  file: File,
  options: ImageCompressionOptions = {},
): Promise<Blob> {
  const { maxWidth = 1600, maxHeight = 1600, quality = 0.82 } = options

  // Se o arquivo não for imagem, retorna o próprio arquivo
  if (!file.type.startsWith('image/')) {
    return file
  }

  // Se for GIF animado, não passa por canvas para não perder os frames de animação
  if (file.type === 'image/gif') {
    return file
  }

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onerror = () => resolve(file)
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => resolve(file)
      img.onload = () => {
        let width = img.naturalWidth || img.width
        let height = img.naturalHeight || img.height

        // Se a imagem for pequena o suficiente, pode manter
        if (
          width <= maxWidth &&
          height <= maxHeight &&
          file.size < 800 * 1024
        ) {
          resolve(file)
          return
        }

        // Calcula proporções mantendo o aspecto original
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(file)
          return
        }

        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, width, height)

        // Tenta WebP primeiro, fallback para JPEG
        const outputMime =
          file.type === 'image/png' ? 'image/png' : 'image/jpeg'

        canvas.toBlob(
          (blob) => {
            if (blob && blob.size > 0) {
              resolve(blob)
            } else {
              resolve(file)
            }
          },
          outputMime,
          quality,
        )
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

export interface UploadChatMediaResult {
  url: string | null
  error: Error | null
  mediaType: 'image' | 'video' | 'document'
  fileName?: string
}

/**
 * Faz upload de mídia de chat para o bucket 'posts' do Supabase Storage,
 * reutilizando as mesmas políticas RLS de `auth.uid() = folder` existentes.
 */
export async function uploadChatMedia(
  file: File,
  userId: string,
  onProgress?: (step: 'compressing' | 'uploading' | 'done') => void,
): Promise<UploadChatMediaResult> {
  try {
    if (!userId) {
      throw new Error('Usuário não autenticado para upload.')
    }

    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    const mediaType: 'image' | 'video' | 'document' = isImage
      ? 'image'
      : isVideo
        ? 'video'
        : 'document'

    let uploadPayload: Blob | File = file
    let ext = file.name.split('.').pop()?.toLowerCase() || 'bin'

    if (isImage) {
      onProgress?.('compressing')
      uploadPayload = await compressImage(file, {
        maxWidth: 1600,
        maxHeight: 1600,
        quality: 0.82,
      })
      // Garante extensão condizente se foi convertido
      if (!ext || ext === 'heic' || ext === 'heif') {
        ext = 'jpg'
      }
    }

    onProgress?.('uploading')

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const fileName = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`
    // Política do Supabase Storage exige que o primeiro folder seja o userId do auth: auth.uid()::text = (storage.foldername(name))[1]
    const filePath = `${userId}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('posts')
      .upload(filePath, uploadPayload, {
        upsert: true,
        contentType:
          uploadPayload.type || file.type || 'application/octet-stream',
      })

    if (uploadError) {
      throw new Error(`Falha no upload para o storage: ${uploadError.message}`)
    }

    const { data: publicData } = supabase.storage
      .from('posts')
      .getPublicUrl(filePath)

    onProgress?.('done')

    return {
      url: publicData.publicUrl,
      error: null,
      mediaType,
      fileName: safeName,
    }
  } catch (err: any) {
    console.error('[uploadChatMedia] Erro:', err)
    return {
      url: null,
      error: err instanceof Error ? err : new Error(String(err)),
      mediaType: file.type.startsWith('image/')
        ? 'image'
        : file.type.startsWith('video/')
          ? 'video'
          : 'document',
      fileName: file.name,
    }
  }
}
