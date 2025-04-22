import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const spinnerColorVariants = cva(
  'animate-spinner absolute -left-[10%] -top-[3.9%] h-[8%] w-[24%] rounded-md',
  {
    variants: {
      color: {
        default: 'bg-primary-foreground',
        secondary: 'bg-secondary-foreground',
        success: 'bg-black',
        outline: 'bg-foreground',
        ghost: 'bg-foreground',
        destructive: 'bg-destructive-foreground',
        link: 'bg-primary',
      },
    },
    defaultVariants: {
      color: 'default',
    },
  },
)

type SpinnerProps = VariantProps<typeof spinnerColorVariants>

export function Spinner({ color }: Readonly<SpinnerProps>) {
  const bars = Array(12).fill(0)

  const spinnerBarClass = spinnerColorVariants({ color })

  return (
    <div className="h-[18px] w-[18px]">
      <div className="relative left-1/2 top-1/2 h-[inherit] w-[inherit]">
        {bars.map((_, i) => (
          <div
            key={`spinner-bar-${i}`}
            className={cn(spinnerBarClass, `bar:nth-child(${i + 1}`)}
            style={{
              animationDelay: `-${1.3 - i * 0.1}s`,
              transform: `rotate(${30 * i}deg) translate(146%)`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
