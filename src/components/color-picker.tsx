'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

const PRESET_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#22c55e',
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
  '#14b8a6', '#84cc16', '#6366f1', '#f43f5e',
]

type ColorPickerProps = {
  value?: string | null
  onChange: (color: string | null) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className='space-y-3'>
      <div className='grid grid-cols-6 gap-2'>
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            type='button'
            aria-label={`Select color ${color}`}
            className={cn(
              'flex size-7 items-center justify-center rounded-full border-2 transition-transform hover:scale-110',
              value === color ? 'border-foreground' : 'border-transparent'
            )}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
          >
            {value === color && <Check className='size-3.5 text-white' />}
          </button>
        ))}
      </div>
      <div className='flex items-center gap-2'>
        <div
          className='size-7 shrink-0 rounded-full border'
          style={{ backgroundColor: value ?? '#888888' }}
        />
        <Input
          placeholder='#000000'
          value={value ?? ''}
          onChange={(e) => {
            const v = e.target.value
            if (v === '' || v === '#') {
              onChange(null)
              return
            }
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) {
              onChange(v)
            }
          }}
          className='h-8 font-mono text-sm'
        />
      </div>
    </div>
  )
}
