import { useSponsorshipStore, CriteriaType } from '@/stores/useSponsorshipStore'
import { Check, Megaphone, Shirt, Store, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CriteriaSelector() {
  const { selectedCriteria, toggleCriteria } = useSponsorshipStore()

  const options: {
    id: CriteriaType
    label: string
    icon: any
    color: string
  }[] = [
    {
      id: 'brand',
      label: 'Uso de Marca',
      icon: Tag,
      color: 'text-blue-500 bg-blue-500/10 border-blue-200',
    },
    {
      id: 'posts',
      label: 'Postagens',
      icon: Megaphone,
      color: 'text-purple-500 bg-purple-500/10 border-purple-200',
    },
    {
      id: 'uniform',
      label: 'Uniforme',
      icon: Shirt,
      color: 'text-orange-500 bg-orange-500/10 border-orange-200',
    },
    {
      id: 'promo',
      label: 'Ações Promo',
      icon: Store,
      color: 'text-green-500 bg-green-500/10 border-green-200',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => {
        const isSelected = selectedCriteria.includes(option.id)
        return (
          <button
            key={option.id}
            onClick={() => toggleCriteria(option.id)}
            className={cn(
              'relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left group',
              isSelected
                ? 'bg-secondary/80 border-primary/50 shadow-sm'
                : 'bg-background/50 border-border/50 hover:bg-secondary/40',
            )}
          >
            <div
              className={cn(
                'p-2 rounded-lg transition-transform group-hover:scale-110',
                option.color,
                isSelected && 'ring-1 ring-inset ring-current',
              )}
            >
              <option.icon className="w-4 h-4" />
            </div>
            <span
              className={cn(
                'text-xs font-semibold',
                isSelected ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {option.label}
            </span>
            {isSelected && (
              <div className="absolute top-2 right-2">
                <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center animate-in zoom-in">
                  <Check className="w-2.5 h-2.5 text-primary-foreground" />
                </div>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
