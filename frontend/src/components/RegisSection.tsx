import { FormEvent, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Role } from '../types/auth.context';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const Register = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [roleInput, setRoleInput] = useState<Role>(Role.COMPANY);
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  console.log(usernameInput);
  console.log(passwordInput);
  console.log(passwordConfirm);
  console.log(roleInput);
  console.log(emailInput);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return setSubmitting(true);
    }

    try {
      if (passwordInput !== passwordConfirm) {
        setPasswordConfirm('');
        setPasswordInput('');
        return toast.error('Password not match !!!');
      }

      await register(usernameInput, passwordInput, roleInput, emailInput);

      toast.success('Successful Registration.');

      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error('Unsuccessful Registration');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="flex justify-center items-center my-10">
        <div className="flex justify-center item-center">
          <form
            onSubmit={handleSubmit}
            className="flex w-3/4 sm:w-auto bg-white justify-center item-center flex-col m-auto rounded-md px-10 py-5 shadow-md hover:shadow-lg gap-y-[40px] border-[0.5px]"
          >
            <h1 className="text-3xl font-bold py-5">
              Welcome to <span className="text-blue">Twatch.</span>
            </h1>
            <div className="text-center font-bold text-2xl">REGISTER</div>
            <div>
              <TextField
                id="outlined-basic"
                type="text"
                label="Username"
                value={usernameInput}
                variant="outlined"
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full h-[38px] border-solid border-blue border-2 rounded-md px-[5px] "
                required
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                type="password"
                label="Password"
                value={passwordInput}
                variant="outlined"
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full h-[38px] border-solid border-blue border-2 rounded-md px-[5px] "
                required
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                type="password"
                label="Password"
                value={passwordConfirm}
                variant="outlined"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full h-[38px] border-solid border-blue border-2 rounded-md px-[5px] "
                required
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                type="text"
                label="email"
                value={emailInput}
                variant="outlined"
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full h-[38px] border-solid border-blue border-2 rounded-md "
                required
              />
            </div>
            <div className="w-full justify-items-center">
              <FormControl>
                <InputLabel
                  id="demo-simple-select-autowidth-label"
                  className="w-full justify-items-center text-l flex flex-col text-black font-bold"
                >
                  Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value as Role)}
                  autoWidth
                  label="Role"
                >
                  <MenuItem value={'COMPANY'}>COMPANY</MenuItem>
                  <MenuItem value={'CUSTOMER'}>CUSTOMER</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex justify-center py-5">
              <button
                className="btn border hover:text-blue hover:bg-white hover:border-blue transition ease-in-out delay-100 hover:scale-110"
                disabled={isSubmitting}
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
