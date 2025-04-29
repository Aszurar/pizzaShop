import { Link, useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError() as Error
  const errorMessage = error?.message || JSON.stringify(error)
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Whoops, algo aconteceu...</h1>
      <p>Um erro aconteceu na aplicação, abaixo você encontra mais detalhes:</p>
      <pre>{errorMessage}</pre>
      <p className="text-accent-foreground">
        Voltar para a{' '}
        <Link
          to="/"
          className="text-sky-600 underline-offset-4 hover:underline dark:text-sky-400"
        >
          Dashboard
        </Link>
      </p>
    </div>
  )
}
