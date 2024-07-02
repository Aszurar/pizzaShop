import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
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
