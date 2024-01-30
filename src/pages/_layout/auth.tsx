import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-red-300 antialiased">
      <h1>Autenticação</h1>
      <div className="flex flex-1 gap-4 bg-green-300 p-8 pt-4">
        <Outlet />
      </div>
    </div>
  )
}
