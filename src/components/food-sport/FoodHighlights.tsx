import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { foodHighlights } from '@/pages/food-sport/mockData'

export function FoodHighlights() {
  return (
    <div className="py-4">
      <div className="px-4 mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          Highlights
          <div className="h-px flex-1 bg-border/50 ml-2" />
        </h2>
      </div>

      <ScrollArea className="w-full whitespace-nowrap px-4">
        <div className="flex w-max space-x-3 pb-4">
          {foodHighlights.map((item) => (
            <Card
              key={item.id}
              className="w-[140px] md:w-[160px] flex-shrink-0 overflow-hidden border-none shadow-sm cursor-pointer group hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-28 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-[10px] font-bold leading-tight break-words whitespace-normal line-clamp-2 drop-shadow-md">
                    {item.label}
                  </p>
                </div>
              </div>
              <CardContent className="p-2 bg-secondary/20">
                <p className="text-[10px] font-semibold text-primary truncate">
                  {item.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}
