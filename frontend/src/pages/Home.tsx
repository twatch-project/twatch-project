import React from 'react'
import { useAuth } from '../providers/AuthProvider'

const Home = () => {
  const { isLoggedIn } = useAuth()
  return <div>Home</div>
}

export default Home
