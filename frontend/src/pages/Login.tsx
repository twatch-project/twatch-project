import React, { FormEvent, useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useNavigate } from 'react-router-dom'
import classes from './Login.module.css'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const Login = () => {
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  const [isSubmitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return setSubmitting(true)
    }

    try {
      await login(usernameInput, passwordInput)

      toast.success('Successful Login')
      navigate('/')
    } catch (err) {
      console.error(err)
      toast.error('Unsuccessful Login')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={classes.form}>
      <form onSubmit={handleSubmit} className={classes.login}>
        <div className="text-2xl text-white">LOGIN</div>
        <div className="text-left m-auto">
          <label className="text-l flex flex-col text-white my-1">Username</label>
          <input
            type="text"
            value={usernameInput}
            className="px-2 py-0.5 rounded"
            onChange={(e) => setUsernameInput(e.target.value)}
            required
          />
        </div>
        <div className="text-left m-auto mb-2">
          <label className="text-l flex flex-col text-white my-1 ">Password</label>
          <input
            type="password"
            value={passwordInput}
            className="px-2 py-0.5 rounded"
            onChange={(e) => setPasswordInput(e.target.value)}
            required
          />
        </div>

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Login
        </Button>

        <Link to="/register" className="text-white">
          Dont have an accout? Register
        </Link>
      </form>
    </div>
  )
}

export default Login
