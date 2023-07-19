import { ComponentType } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { Navigate } from 'react-router-dom'

function withGuard(Component: ComponentType): ComponentType {
  return function ComponentWithGuard(props) {
    const { isLoggedIn } = useAuth()

    if (!isLoggedIn) return <Navigate to="/login" />
    return <Component {...props} />
  }
}

export default withGuard
