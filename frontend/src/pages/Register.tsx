import { FormEvent, useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import classes from './Register.module.css'
import { Role } from '../types/auth.context'

const Register = () => {
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [roleInput, setRoleInput] = useState<Role>(Role.COMPANY)
  const [emailInput, setEmailInput] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  console.log('hello, world')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return setSubmitting(true)
    }

    try {
      if (passwordInput !== passwordConfirm) {
        setPasswordConfirm('')
        setPasswordInput('')
        return alert('Password Not Match!!')
      }

      console.log('Register')

      await register(usernameInput, passwordInput, roleInput, emailInput)

      toast.success('Successful Registration.')

      navigate('/login')
    } catch (err) {
      console.error(err)
      toast.error('Unsuccessful Registration')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.register}>
      <div className="text-2xl text-white">REGISTER</div>
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

      <div className="text-left m-auto">
        <label className="text-l flex flex-col text-white my-1">Password</label>
        <input
          type="password"
          value={passwordInput}
          className="px-2 py-0.5 rounded"
          onChange={(e) => setPasswordInput(e.target.value)}
          required
        />
      </div>
      <div className="text-left m-auto mb-2">
        <label className="text-l flex flex-col text-white my-1 ">Password Confirm</label>
        <input
          type="password"
          value={passwordConfirm}
          className="px-2 py-0.5 rounded"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
      </div>
      <div className="text-left m-auto">
        <label className="text-l flex flex-col text-white my-1">ROLE</label>
        <input
          type="text"
          value={roleInput}
          className="px-2 py-0.5 rounded"
          onChange={(e) => setRoleInput(e.target.value as Role)}
          required
        />
      </div>
      <div className="text-left m-auto">
        <label className="text-l flex flex-col text-white my-1">EMAIL</label>
        <input
          type="text"
          value={emailInput}
          className="px-2 py-0.5 rounded"
          onChange={(e) => setEmailInput(e.target.value)}
          required
        />
      </div>

      <Button type="submit" variant="contained" disabled={isSubmitting}>
        Register
      </Button>

      <Link to="/login" className="text-l text-white">
        Already have an account? Login
      </Link>
    </form>
  )
}

export default Register
