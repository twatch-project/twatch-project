import React, { FormEvent, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
const Login = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [isSubmitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return setSubmitting(true);
    }

    try {
      if (!usernameInput || !passwordInput) {
        return toast.error('no such username and password');
      }
      await login(usernameInput, passwordInput);

      toast.success('Successful Login');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Unsuccessful Login');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <section className="flex items-center justify-center min-h-[100vh]">
        <div className="flex justify-center item-center ">
          <form
            onSubmit={handleSubmit}
            className="flex   bg-white justify-center item-center flex-col m-3 rounded-md p-10 shadow-box gap-y-[20px] border-[0.5px]"
          >
            <h1 className="text-3xl font-bold py-5">
              Welcome to <span className="text-blue">Twatch.</span>
            </h1>
            <div className="text-center font-bold text-2xl">LOGIN</div>
            <div>
              <TextField
                id="outlined-basic"
                type="text"
                label="Username"
                value={usernameInput}
                variant="outlined"
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px] "
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                type="password"
                label="password"
                value={passwordInput}
                variant="outlined"
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px] "
              />
            </div>
            <div className="flex justify-center py-5">
              <button className="btn " disabled={isSubmitting}>
                Login
              </button>
            </div>
            <Link to="/register" className="text-blue text-center">
              have an account? Register
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
