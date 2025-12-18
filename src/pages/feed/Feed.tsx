import { PostCard } from '@/components/PostCard'
import { mockPosts } from '@/lib/data'

export default function Feed() {
  return (
    <div className="pb-20 pt-4 px-4 max-w-lg mx-auto min-h-screen bg-background">
      <div className="space-y-6">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
