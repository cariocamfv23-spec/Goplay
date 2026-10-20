import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PostItem } from '@/services/feed'

interface FeedState {
  posts: PostItem[]
  lastFetchedAt: number | null
  isSyncing: boolean
  setPosts: (posts: PostItem[]) => void
  setSyncing: (isSyncing: boolean) => void
  addPost: (post: PostItem) => void
  removePost: (postId: string) => void
  updatePostLike: (postId: string, liked: boolean, countDelta: number) => void
  updatePostCommentsCount: (postId: string, delta: number) => void
  updatePostData: (postId: string, partial: Partial<PostItem>) => void
  clearFeed: () => void
}

export const useFeedStore = create<FeedState>()(
  persist(
    (set) => ({
      posts: [],
      lastFetchedAt: null,
      isSyncing: false,

      setPosts: (posts) =>
        set({
          posts,
          lastFetchedAt: Date.now(),
          isSyncing: false,
        }),

      setSyncing: (isSyncing) => set({ isSyncing }),

      addPost: (post) =>
        set((state) => {
          if (state.posts.some((p) => p.id === post.id)) {
            return state
          }
          return { posts: [post, ...state.posts] }
        }),

      removePost: (postId) =>
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== postId),
        })),

      updatePostLike: (postId, liked, countDelta) =>
        set((state) => ({
          posts: state.posts.map((p) => {
            if (p.id !== postId) return p
            const newCount = Math.max(0, p.likesCount + countDelta)
            return { ...p, isLiked: liked, likesCount: newCount }
          }),
        })),

      updatePostCommentsCount: (postId, delta) =>
        set((state) => ({
          posts: state.posts.map((p) => {
            if (p.id !== postId) return p
            const newCount = Math.max(0, p.commentsCount + delta)
            return { ...p, commentsCount: newCount }
          }),
        })),

      updatePostData: (postId, partial) =>
        set((state) => ({
          posts: state.posts.map((p) => {
            if (p.id !== postId) return p
            return { ...p, ...partial }
          }),
        })),

      clearFeed: () =>
        set({
          posts: [],
          lastFetchedAt: null,
          isSyncing: false,
        }),
    }),
    {
      name: 'goplay-feed-cache',
      partialize: (state) => ({
        posts: state.posts.slice(0, 30), // persist only latest posts for fast instant startup
        lastFetchedAt: state.lastFetchedAt,
      }),
    },
  ),
)
