import { useState } from 'react'
import { foodCategories, mockFoodPosts } from './mockData'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Utensils } from 'lucide-react'
import { FoodHighlights } from '@/components/food-sport/FoodHighlights'
import { FoodPostCard } from '@/components/food-sport/FoodPostCard'
import { CreateFoodPostFab } from '@/components/food-sport/CreateFoodPostFab'

export default function FoodSport() {
  const [activeCategory, setActiveCategory] = useState('Todos')

  return (
    <div className="min-h-screen bg-background relative pb-24">
      {/* Sticky Header */}
      <div className="sticky top-16 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500/10 rounded-xl">
              <Utensils className="w-5 h-5 text-orange-500" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Food <span className="text-orange-500">Sport</span>
            </h1>
          </div>
        </div>

        {/* Categories Scroll */}
        <ScrollArea className="w-full whitespace-nowrap pb-3">
          <div className="flex w-max space-x-2 px-4">
            {foodCategories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'secondary'}
                size="sm"
                className={cn(
                  'rounded-full text-xs font-semibold h-8 border shadow-sm transition-all',
                  activeCategory === cat
                    ? 'bg-orange-600 hover:bg-orange-700 text-white border-transparent'
                    : 'bg-secondary/50 border-border/50 text-muted-foreground hover:text-foreground',
                )}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* Main Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Highlights Section */}
        {activeCategory === 'Todos' && <FoodHighlights />}

        {/* Feed Feed */}
        <div className="px-4 mt-2 max-w-2xl mx-auto space-y-6">
          {mockFoodPosts.map((post) => (
            <FoodPostCard key={post.id} post={post} />
          ))}
          <div className="text-center py-8 text-muted-foreground text-sm flex flex-col items-center">
            <Utensils className="w-8 h-8 opacity-20 mb-2" />
            <p>Você chegou ao fim do feed.</p>
            <p className="text-xs">
              Compartilhe sua refeição com a comunidade!
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <CreateFoodPostFab />
    </div>
  )
}
