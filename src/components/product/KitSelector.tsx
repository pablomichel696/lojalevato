import type { KitOption } from '../../types/product'
import { formatPrice } from '../../lib/format'

type Props = {
  options: KitOption[]
  selected: KitOption
  onSelect: (option: KitOption) => void
  /** substantivo da unidade (default "pote"), ex.: "pacote" para chá */
  unitNoun?: string
}

export default function KitSelector({ options, selected, onSelect, unitNoun = 'pote' }: Props) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-primary-800">Escolha a duração do seu kit:</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const isActive = opt.days === selected.days
          return (
            <button
              key={opt.days}
              onClick={() => onSelect(opt)}
              className={`relative flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                isActive ? 'border-primary-700 bg-primary-50' : 'border-primary-200 hover:border-primary-400'
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-primary-800">{opt.days} dias</p>
                <p className="text-xs text-primary-500">{opt.units} {unitNoun}{opt.units > 1 ? 's' : ''}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-primary-800">{formatPrice(opt.totalPrice)}</p>
                {opt.discountPct > 0 && (
                  <p className="text-xs font-medium text-leaf-600">-{opt.discountPct}% OFF</p>
                )}
              </div>
              {isActive && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-700 text-[10px] text-cream-50">
                  ✓
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
