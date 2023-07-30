import { FormEvent, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React from 'react';
const LoginSection = () => {
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

      const checkCompany = await localStorage.getItem('companyId');

      if (checkCompany) {
        navigate('/');
        return;
      }
      navigate('/company/create');
    } catch (err) {
      console.error(err);
      toast.error('Unsuccessful Login');
    } finally {
      setSubmitting(false);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <section className="flex items-center justify-center min-h-[100vh]">
        <div className="flex justify-center item-center ">
          <form
            onSubmit={handleSubmit}
            className="flex w-3/4 sm:w-auto bg-white justify-center item-center flex-col m-auto rounded-md p-10 shadow-md hover:shadow-lg gap-y-[30px] border-[0.5px]"
          >
            <h1 className="text-3xl font-bold py-5">
              Welcome to <span className="text-blue">Twatch.</span>
            </h1>
            <div className="text-center font-bold text-2xl">LOGIN</div>
            <div className="w-full">
              <TextField
                id="outlined-basic"
                type="text"
                label="Username"
                value={usernameInput}
                variant="outlined"
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full  border-blue border-2 rounded-md px-[5px] "
              />
            </div>
            <div className="w-full">
              <FormControl variant="outlined" className="w-full">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
            <div className="flex justify-center py-5">
              <button
                className="btn border hover:text-blue hover:bg-white hover:border-blue transition ease-in-out delay-100 hover:scale-110"
                disabled={isSubmitting}
              >
                Login
              </button>
            </div>
            <Link to="/register" className="text-blue text-center">
              Dont have an accout? Register
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginSection;
