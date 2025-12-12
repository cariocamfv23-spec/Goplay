import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DriverMetricsCardProps {
  title: string
  value: string
  icon: LucideIcon
  description?: string
  iconColor?: string
}

export function DriverMetricsCard({
  title,
  value,
  icon: Icon,
  description,
  iconColor = 'text-primary',
}: DriverMetricsCardProps) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className={cn('p-2 rounded-lg bg-secondary/50', iconColor)}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          {description && (
            <p className="text-[10px] text-muted-foreground/70 mt-1">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
