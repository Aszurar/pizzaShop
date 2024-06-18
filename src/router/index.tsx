import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/pages/_layout/app'
import { AuthLayout } from '@/pages/_layout/auth'
import { Dashboard } from '@/pages/app/Dashboard'
import { Orders } from '@/pages/app/Orders'
import { SignIn } from '@/pages/auth/SignIn'
import { SignUp } from '@/pages/auth/SignUp'

import { ROUTES } from './routes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: ROUTES.SIGN_IN, element: <SignIn /> },
      { path: ROUTES.SIGN_UP, element: <SignUp /> },
    ],
  },

  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/orders', element: <Orders /> },
    ],
  },
])
