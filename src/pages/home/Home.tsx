import { mockPosts, mockStories } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus, Video, MapPin, Box, Eye, Sparkles } from 'lucide-react'
import { PostCard } from '@/components/PostCard'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { CreatePostFab } from '@/components/CreatePostFab'
import { useNavigate } from 'react-router-dom'
import { CheckInModal } from '@/components/CheckInModal'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { WeatherAlertBanner } from '@/components/WeatherAlertBanner'
import { AppIcon } from '@/components/AppIcon'

const Home = () => {
  const navigate = useNavigate()
  const [showCheckIn, setShowCheckIn] = useState(false)

  return (
    <div className="pb-20 relative bg-background min-h-screen animate-fade-in transition-colors duration-300">
      {/* Weather Alerts */}
      <WeatherAlertBanner />

      {/* Stories Section */}
      <div className="pt-2 pb-2 bg-background border-b border-border/40 sticky top-16 z-30 shadow-sm backdrop-blur-md bg-background/90 transition-all duration-300">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 p-2 px-4">
            {/* My Story */}
            <div className="flex flex-col items-center space-y-1 cursor-pointer group">
              <div className="relative transform transition-transform duration-200 group-hover:scale-105">
                <div className="p-[2px] rounded-full bg-transparent">
                  <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                    <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99" />
                    <AvatarFallback>EU</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 border-2 border-background shadow-sm group-hover:bg-primary/90 transition-colors">
                  <Plus className="h-3 w-3" />
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Seu Story
              </span>
            </div>

            {/* Other Stories */}
            {mockStories.map((story) => (
              <div
                key={story.id}
                className="flex flex-col items-center space-y-1 cursor-pointer group"
              >
                <div
                  className={cn(
                    'p-[2px] rounded-full transform transition-transform duration-200 group-hover:scale-105',
                    story.hasStory
                      ? 'bg-gradient-to-tr from-primary via-purple-500 to-gold'
                      : 'bg-muted',
                  )}
                >
                  <Avatar className="h-16 w-16 border-2 border-background">
                    <AvatarImage
                      src={story.avatar || story.user?.avatar}
                      loading="lazy"
                      alt={story.name || story.user?.name}
                    />
                    <AvatarFallback>
                      {(story.name || story.user?.name)?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xs text-muted-foreground max-w-[64px] truncate group-hover:text-foreground transition-colors">
                  {story.name || story.user?.name}
                </span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* Quick Actions / Highlights */}
      <div className="p-4 pb-0 grid grid-cols-2 gap-3 animate-slide-up">
        {/* MOVE Highlight */}
        <div
          className="col-span-1 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 p-4 text-foreground dark:text-white relative overflow-hidden shadow-sm dark:shadow-lg cursor-pointer group hover:shadow-md dark:hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
          onClick={() => navigate('/move')}
        >
          <div className="relative z-10">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Video className="h-5 w-5 text-primary animate-pulse" /> MOVE
            </h2>
            <p className="text-xs text-muted-foreground dark:text-zinc-400 group-hover:text-foreground dark:group-hover:text-zinc-300 transition-colors mt-1">
              Destaques
            </p>
          </div>
          <div className="absolute -right-6 -bottom-6 h-20 w-20 bg-primary/10 dark:bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-500" />
        </div>

        {/* Oracle Highlight - NEW */}
        <div
          className="col-span-1 rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-900 p-4 text-white relative overflow-hidden shadow-sm dark:shadow-lg cursor-pointer group hover:shadow-md dark:hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border border-white/10"
          onClick={() => navigate('/ai/oracle')}
        >
          <div className="relative z-10">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold animate-pulse" /> Oráculo
            </h2>
            <p className="text-xs text-indigo-200 group-hover:text-white transition-colors mt-1">
              Previsão AI
            </p>
          </div>
          <div className="absolute -right-6 -bottom-6 h-20 w-20 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-colors duration-500" />
        </div>

        {/* Arena Mode Highlight */}
        <div
          className="col-span-1 rounded-2xl bg-black p-4 text-white relative overflow-hidden shadow-sm dark:shadow-lg cursor-pointer group hover:shadow-md dark:hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border border-white/10"
          onClick={() => navigate('/ai/arena-mode')}
        >
          <div className="relative z-10">
            <h2 className="font-bold text-lg flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gold">
              <AppIcon className="h-5 w-5" /> ARENA
            </h2>
            <p className="text-xs text-zinc-400 group-hover:text-white transition-colors mt-1 flex items-center gap-1">
              <Eye className="h-3 w-3" /> Realidade Aumentada
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-gold/10 opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/30 blur-2xl rounded-full" />
        </div>

        {/* Ghost Play Highlight */}
        <div
          className="col-span-1 rounded-2xl bg-gradient-to-br from-purple-900 to-black p-4 text-white relative overflow-hidden shadow-sm dark:shadow-lg cursor-pointer group hover:shadow-md dark:hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border border-white/10"
          onClick={() => navigate('/ai/ghost-play')}
        >
          <div className="relative z-10">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Box className="h-5 w-5 text-gold animate-pulse" /> Ghost Play
            </h2>
            <p className="text-xs text-zinc-400 group-hover:text-white transition-colors mt-1">
              Replay 3D
            </p>
          </div>
          <div className="absolute -right-6 -bottom-6 h-24 w-24 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-colors duration-500" />
        </div>

        {/* Check-in Highlight */}
        <div
          className="col-span-2 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 p-4 text-foreground dark:text-white relative overflow-hidden shadow-sm dark:shadow-lg cursor-pointer group hover:shadow-md dark:hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
          onClick={() => setShowCheckIn(true)}
        >
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600 dark:text-green-400 animate-bounce" />{' '}
                Check-in
              </h2>
              <p className="text-xs text-green-800/80 dark:text-green-300 group-hover:text-green-900 dark:group-hover:text-green-200 transition-colors mt-1">
                Marcar presença
              </p>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 h-20 w-20 bg-green-500/10 dark:bg-green-500/20 rounded-full blur-2xl group-hover:bg-green-500/20 dark:group-hover:bg-green-500/30 transition-colors duration-500" />
        </div>
      </div>

      {/* Feed Section */}
      <div className="max-w-xl mx-auto p-4 space-y-5">
        <h3 className="font-bold text-lg px-2">Feed Principal</h3>
        {mockPosts.map((post, index) => (
          <div
            key={post.id}
            className="animate-slide-up"
            style={{ animationDelay: `${(index + 2) * 100}ms` }}
          >
            <PostCard post={post} />
          </div>
        ))}

        <div className="text-center py-8">
          <div className="inline-block h-1 w-1 bg-muted-foreground rounded-full mx-1 animate-bounce [animation-delay:-0.3s]" />
          <div className="inline-block h-1 w-1 bg-muted-foreground rounded-full mx-1 animate-bounce [animation-delay:-0.15s]" />
          <div className="inline-block h-1 w-1 bg-muted-foreground rounded-full mx-1 animate-bounce" />
        </div>
      </div>

      {/* Create Post FAB */}
      <CreatePostFab />

      {/* Check-in Modal */}
      <CheckInModal
        open={showCheckIn}
        onOpenChange={setShowCheckIn}
        venueName="Arena Central"
        points={50}
      />
    </div>
  )
}

export default Home
