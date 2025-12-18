import { useState } from 'react'
import useSoundStore from '@/stores/useSoundStore'

export interface LikeablePost {
  content?: string
  hashtags?: string[]
}

export function useLikeInteraction(
  post: LikeablePost,
  initialLikes: number = 0,
  initialLiked: boolean = false,
) {
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(initialLikes)
  const { playSound } = useSoundStore()

  const handleLike = () => {
    const newIsLiked = !isLiked
    setIsLiked(newIsLiked)
    setLikeCount(newIsLiked ? likeCount + 1 : likeCount - 1)

    if (newIsLiked) {
      let soundCategory = 'like_generic'
      const content = (post.content || '').toLowerCase()
      const hashtags = (post.hashtags || []).map((h: string) => h.toLowerCase())
      const fullText = content + ' ' + hashtags.join(' ')

      if (
        fullText.includes('futebol') ||
        fullText.includes('soccer') ||
        fullText.includes('gol') ||
        fullText.includes('chute')
      ) {
        soundCategory = 'like_football'
      } else if (
        fullText.includes('futsal') ||
        fullText.includes('quadra') ||
        fullText.includes('salao')
      ) {
        soundCategory = 'like_futsal'
      } else if (
        fullText.includes('basquete') ||
        fullText.includes('basketball') ||
        fullText.includes('basket') ||
        fullText.includes('dunk') ||
        fullText.includes('cesta')
      ) {
        soundCategory = 'like_basketball'
      } else if (
        fullText.includes('volei') ||
        fullText.includes('volleyball') ||
        fullText.includes('manchete') ||
        fullText.includes('saque')
      ) {
        soundCategory = 'like_volleyball'
      } else if (
        fullText.includes('tennis') ||
        fullText.includes('tenis') ||
        fullText.includes('raquete')
      ) {
        soundCategory = 'like_tennis'
      } else if (
        fullText.includes('treino') ||
        fullText.includes('gym') ||
        fullText.includes('academia') ||
        fullText.includes('workout') ||
        fullText.includes('crossfit')
      ) {
        soundCategory = 'like_workout'
      } else if (
        fullText.includes('parceiro') ||
        fullText.includes('partner') ||
        fullText.includes('nutri') ||
        fullText.includes('fisioterapeuta')
      ) {
        soundCategory = 'like_partner'
      }

      // @ts-expect-error - Dynamic sound category
      playSound(soundCategory)
    }
  }

  return { isLiked, likeCount, handleLike, setIsLiked, setLikeCount }
}
