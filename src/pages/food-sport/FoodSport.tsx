import { useState, useRef } from 'react'
import { foodCategories, mockFoodPosts } from './mockData'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Utensils, Image as ImageIcon, Send, X } from 'lucide-react'
import { FoodHighlights } from '@/components/food-sport/FoodHighlights'
import { FoodPostCard } from '@/components/food-sport/FoodPostCard'
import { CreateFoodPostFab } from '@/components/food-sport/CreateFoodPostFab'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function FoodSport() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [posts, setPosts] = useState(mockFoodPosts)

  const [newPostContent, setNewPostContent] = useState('')
  const [newPostImage, setNewPostImage] = useState<string | null>(null)
  const [newPostCategory, setNewPostCategory] = useState<string>(
    'Alimentação saudável',
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      setNewPostImage(url)
    }
  }

  const handlePost = () => {
    if (!newPostContent.trim() && !newPostImage) {
      toast.error('Adicione texto ou uma foto para publicar.')
      return
    }

    const newPost = {
      id: Date.now(),
      type: newPostImage ? 'image' : 'text',
      user: {
        id: 'me',
        name: 'Você',
        type: 'Atleta',
        avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99',
      },
      template: newPostCategory,
      categories: ['Todos', newPostCategory],
      content: newPostContent,
      image: newPostImage || undefined,
      hashtags: [],
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      favorites: 0,
      time: 'Agora',
      liked: false,
      saved: false,
    }

    setPosts([newPost, ...posts])
    setNewPostContent('')
    setNewPostImage(null)
    toast.success('Refeição compartilhada com sucesso!')
  }

  const handleFabPost = (data: any) => {
    const newPost = {
      id: Date.now(),
      type: 'image',
      user: {
        id: 'me',
        name: 'Você',
        type: 'Atleta',
        avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99',
      },
      template: data.template || 'Alimentação saudável',
      categories: ['Todos', data.template || 'Alimentação saudável'],
      content: data.content,
      image: data.image,
      hashtags: [],
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      favorites: 0,
      time: 'Agora',
      liked: false,
      saved: false,
    }
    setPosts([newPost, ...posts])
    toast.success('Refeição compartilhada com sucesso!')
  }

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  const filteredPosts = posts.filter(
    (post) =>
      activeCategory === 'Todos' ||
      (post.categories && post.categories.includes(activeCategory)) ||
      post.template === activeCategory,
  )

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

        {/* Feed Area */}
        <div className="px-4 mt-2 max-w-2xl mx-auto space-y-6">
          {/* Create Post Inline */}
          <Card className="mb-6 border-none shadow-sm rounded-2xl bg-card overflow-hidden">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center">
                    <Select
                      value={newPostCategory}
                      onValueChange={setNewPostCategory}
                    >
                      <SelectTrigger className="w-fit h-7 text-xs border-none bg-secondary/30 rounded-full px-3 gap-2">
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {foodCategories
                          .filter((c) => c !== 'Todos')
                          .map((cat) => (
                            <SelectItem
                              key={cat}
                              value={cat}
                              className="text-xs"
                            >
                              {cat}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Textarea
                    placeholder="Compartilhe sua refeição..."
                    className="min-h-[80px] resize-none border-none bg-secondary/30 focus-visible:ring-1 focus-visible:ring-orange-500 rounded-xl"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />

                  {newPostImage && (
                    <div className="relative rounded-xl overflow-hidden bg-black/5 aspect-video">
                      <img
                        src={newPostImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-md hover:scale-105 transition-transform"
                        onClick={() => setNewPostImage(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-orange-500 hover:bg-orange-500/10 rounded-full"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="w-4 h-4 mr-2 text-orange-500" />
                      Foto / Vídeo
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*,video/*"
                      onChange={handleImageSelect}
                    />
                    <Button
                      onClick={handlePost}
                      size="sm"
                      className="rounded-full bg-orange-600 hover:bg-orange-700 text-white px-5 shadow-md"
                      disabled={!newPostContent.trim() && !newPostImage}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Publicar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {filteredPosts.map((post) => (
            <FoodPostCard
              key={post.id}
              post={post}
              onDelete={handleDeletePost}
            />
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm flex flex-col items-center bg-card rounded-2xl shadow-sm border border-border/40">
              <Utensils className="w-12 h-12 opacity-20 mb-3 text-orange-500" />
              <p className="font-medium text-foreground">
                Nenhuma publicação nesta categoria.
              </p>
              <p className="text-xs mt-1">
                Seja o primeiro a compartilhar algo aqui!
              </p>
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm flex flex-col items-center">
              <Utensils className="w-8 h-8 opacity-20 mb-2" />
              <p>Você chegou ao fim do feed.</p>
              <p className="text-xs">
                Compartilhe sua refeição com a comunidade!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <CreateFoodPostFab onPost={handleFabPost} />
    </div>
  )
}
