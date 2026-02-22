import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockPosts } from '@/lib/data'

interface FeedStore {
  posts: any[]
  addPost: (post: any) => void
}

export const useFeedStore = create<FeedStore>()(
  persist(
    (set) => ({
      posts: mockPosts,
      addPost: (post) =>
        set((state) => ({
          posts: [
            {
              ...post,
              id: Date.now(),
              time: 'Agora',
              likes: 0,
              comments: 0,
              shares: 0,
              applauds: 0,
              supports: 0,
            },
            ...state.posts,
          ],
        })),
    }),
    {
      name: 'goplay-feed-storage',
    },
  ),
)
