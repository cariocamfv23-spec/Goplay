import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

export interface FilterState {
  activities: string[]
  ageGroup: string
  periods: string[]
}

interface KidsFilterSheetProps {
  children: React.ReactNode
  filters: FilterState
  setFilters: (filters: FilterState) => void
  availableActivities: string[]
  counts?: {
    total: number
    filtered: number
  }
}

export function KidsFilterSheet({
  children,
  filters,
  setFilters,
  availableActivities,
  counts,
}: KidsFilterSheetProps) {
  const handleActivityChange = (activity: string, checked: boolean) => {
    setFilters({
      ...filters,
      activities: checked
        ? [...filters.activities, activity]
        : filters.activities.filter((a) => a !== activity),
    })
  }

  const handlePeriodChange = (period: string, checked: boolean) => {
    setFilters({
      ...filters,
      periods: checked
        ? [...filters.periods, period]
        : filters.periods.filter((p) => p !== period),
    })
  }

  const clearFilters = () => {
    setFilters({
      activities: [],
      ageGroup: 'all',
      periods: [],
    })
  }

  const activeFiltersCount =
    filters.activities.length +
    filters.periods.length +
    (filters.ageGroup !== 'all' ? 1 : 0)

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[85vh] sm:h-auto sm:max-w-md rounded-t-3xl sm:rounded-none"
      >
        <SheetHeader className="mb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Filtros Avançados</SheetTitle>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 px-2 text-destructive hover:text-destructive"
              >
                Limpar ({activeFiltersCount})
              </Button>
            )}
          </div>
          <SheetDescription>
            Encontre o local perfeito para a diversão das crianças.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(85vh-180px)] sm:h-[60vh] pr-4 -mr-4 pl-1">
          <div className="space-y-6 pb-6">
            {/* Age Group Section */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                Faixa Etária
                {filters.ageGroup !== 'all' && (
                  <Badge variant="secondary" className="text-[10px] h-5">
                    Ativo
                  </Badge>
                )}
              </Label>
              <RadioGroup
                value={filters.ageGroup}
                onValueChange={(value) =>
                  setFilters({ ...filters, ageGroup: value })
                }
                className="grid grid-cols-2 gap-2"
              >
                {[
                  { value: 'all', label: 'Todas as idades' },
                  { value: '0-3', label: '0 a 3 anos' },
                  { value: '3-6', label: '3 a 6 anos' },
                  { value: '6-10', label: '6 a 10 anos' },
                  { value: '10-14', label: '10 a 14 anos' },
                ].map((option) => (
                  <div key={option.value}>
                    <RadioGroupItem
                      value={option.value}
                      id={`age-${option.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`age-${option.value}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator />

            {/* Time Section */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                Horários Específicos
                {filters.periods.length > 0 && (
                  <Badge variant="secondary" className="text-[10px] h-5">
                    {filters.periods.length}
                  </Badge>
                )}
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'morning', label: 'Manhã', sub: '06h - 12h' },
                  { id: 'afternoon', label: 'Tarde', sub: '12h - 18h' },
                  { id: 'night', label: 'Noite', sub: '18h - 22h' },
                ].map((period) => (
                  <div key={period.id}>
                    <Checkbox
                      id={`period-${period.id}`}
                      checked={filters.periods.includes(period.id)}
                      onCheckedChange={(checked) =>
                        handlePeriodChange(period.id, checked as boolean)
                      }
                      className="sr-only peer"
                    />
                    <Label
                      htmlFor={`period-${period.id}`}
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all h-20 text-center"
                    >
                      <span className="font-medium">{period.label}</span>
                      <span className="text-[10px] text-muted-foreground mt-1">
                        {period.sub}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Activities Section */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                Tipo de Atividade
                {filters.activities.length > 0 && (
                  <Badge variant="secondary" className="text-[10px] h-5">
                    {filters.activities.length}
                  </Badge>
                )}
              </Label>
              <div className="grid grid-cols-1 gap-2">
                {availableActivities.map((activity) => (
                  <div
                    key={activity}
                    className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 transition-colors"
                  >
                    <Checkbox
                      id={`activity-${activity}`}
                      checked={filters.activities.includes(activity)}
                      onCheckedChange={(checked) =>
                        handleActivityChange(activity, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`activity-${activity}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer py-1"
                    >
                      {activity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="mt-4 sm:mt-0">
          <SheetClose asChild>
            <Button className="w-full h-12 text-base rounded-xl shadow-lg">
              Ver {counts?.filtered ?? 0} locais
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
