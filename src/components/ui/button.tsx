import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { Spinner } from '../Spinner'

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm',
    'font-medium ring-offset-background transition-colors focus-visible:outline-none',
    ' focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'gap-2 duration-300',
    'data-[loading=true]:cursor-wait data-[loading=true]:opacity-50',
  ),

  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary disabled:hover:bg-primary data-[loading=true]:hover:bg-primary',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive disabled:hover:bg-destructive data-[loading=true]:hover:bg-destructive',
        success:
          'bg-emerald-500 text-black hover:bg-emerald-400 dark:bg-emerald-600 dark:hover:bg-emerald-500 active:bg-emerald-500 dark:active:bg-emerald-600 disabled:hover:bg-emerald-500 dark:disabled:hover:bg-emerald-600 data-[loading=true]:hover:bg-emerald-500 dark:data-[loading=true]:hover:bg-emerald-600',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:hover:bg-background active:bg-background disabled:hover:text-foreground disabled:hover:bg-background data-[loading=true]:hover:bg-background data-[loading=true]:hover:text-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary disabled:hover:bg-secondary data-[loading=true]:hover:bg-secondary',
        ghost:
          'hover:bg-accent hover:text-accent-foreground active:bg-transparent disabled:hover:bg-transparent data-[loading=true]:hover:bg-transparent disabled:active:bg-transparent',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-8 px-2.5',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const content = isLoading ? (
      <>
        <Spinner color={variant} /> Carregando...
      </>
    ) : (
      children
    )

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading) {
        e.preventDefault()
        return
      }

      onClick?.(e)
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        data-loading={isLoading}
        {...props}
      >
        {content}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
