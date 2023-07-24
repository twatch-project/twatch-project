import { FormEvent, useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Role } from '../types/auth.context'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'

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
    <>
      <Nav />
      <section className="flex justify-center items-center min-h-[150vh]">
        <div className="flex justify-center item-center ">
          <form
            onSubmit={handleSubmit}
            className="flex   bg-white justify-center item-center flex-col m-3 rounded-md p-10 shadow-box gap-y-[20px] border-[0.5px]"
          >
            <h1 className="text-3xl font-bold py-5">
              Welcome to <span className="text-blue">Twatch.</span>
            </h1>
            <div className="text-center font-bold text-2xl">LOGIN</div>
            <div className="">
              <label className="text-l flex flex-col text-black my-1 font-bold">Username</label>
              <input
                type="text"
                value={usernameInput}
                className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px] "
                onChange={(e) => setUsernameInput(e.target.value)}
                required
              />
            </div>
            <div className="">
              <label className="text-l flex flex-col text-black my-1 font-bold">Password</label>
              <input
                type="password"
                value={passwordInput}
                className="flex items-center w-[305px] h-[38px]  border-solid border-blue border-2 rounded-md px-[5px]"
                onChange={(e) => setPasswordInput(e.target.value)}
                required
              />
            </div>
            <div className="">
              <label className="text-l flex flex-col text-black my-1 font-bold">PasswordConfirm</label>
              <input
                type="password"
                value={passwordConfirm}
                className="flex items-center w-[305px] h-[38px]  border-solid border-blue border-2 rounded-md px-[5px]"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
            <div className="">
              <label className="text-l flex flex-col text-black my-1 font-bold">Role</label>
              <input
                type="text"
                value={roleInput}
                className="flex items-center w-[305px] h-[38px]  border-solid border-blue border-2 rounded-md px-[5px]"
                onChange={(e) => setRoleInput(e.target.value as Role)}
                required
              />
            </div>
            <div className="">
              <label className="text-l flex flex-col text-black my-1 font-bold">Email</label>
              <input
                type="password"
                value={emailInput}
                className="flex items-center w-[305px] h-[38px]  border-solid border-blue border-2 rounded-md px-[5px]"
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center py-5">
              <button className="btn " disabled={isSubmitting}>
                SignUp
              </button>
            </div>

            {/* <Button type="submit" variant="contained" disabled={isSubmitting}>
       Login
     </Button> */}

            <Link to="/register" className="text-blue text-center">
              have an account? Register
            </Link>
          </form>
        </div>
        {/* <form
          action=""
          className="w-[600px] border-[0.5px] flex flex-col items-center justify-center  rounded-md p-10 gap-y-[10px] m-[15px]"
        >
          <div className="title relative left-[0]">
            <h1 className=" font-bold text-[24px] z-0">PORTFOLIO</h1>
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              TITLE
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              BODY
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              IMAGE
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              PROVINCE
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              DISTRICT
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              SUB-DISTRICT
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              ADDRESS
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              CONTRACT
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              TAG
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>

          <button className="my-[10px] p-[10px] bg-blue rounded text-white">Confirm</button>
        </form> */}
      </section>
    </>
  )
}

export default Register
