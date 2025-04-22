import { ComponentProps } from 'react'

type ErrorMessageProps = ComponentProps<'div'> & {
  message?: string
}

export function ErrorMessage({ message, ...props }: ErrorMessageProps) {
  if (!message) return null

  return (
    <div className="mt-1" {...props}>
      <span className="text-sm text-destructive">{message}</span>
    </div>
  )
}
