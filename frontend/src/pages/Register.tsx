// import { FormEvent, useState } from 'react';
// import { useAuth } from '../providers/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { Role } from '../types/auth.context';
import Nav from '../components/Nav';
import Register from '../components/RegisSection';
// import { Link } from 'react-router-dom';
// import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

// const Register = () => {
//   const [usernameInput, setUsernameInput] = useState('');
//   const [passwordInput, setPasswordInput] = useState('');
//   const [passwordConfirm, setPasswordConfirm] = useState('');
//   const [roleInput, setRoleInput] = useState<Role>(Role.COMPANY);
//   const [emailInput, setEmailInput] = useState('');
//   const [isSubmitting, setSubmitting] = useState(false);
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (isSubmitting) {
//       return setSubmitting(true);
//     }

//     try {
//       if (passwordInput !== passwordConfirm) {
//         setPasswordConfirm('');
//         setPasswordInput('');
//         return toast.error('Password not macth !!!');
//       }

//       console.log('Register');
//       console.log(roleInput);

//       await register(usernameInput, passwordInput, roleInput, emailInput);

//       toast.success('Successful Registration.');

//       navigate('/login');
//     } catch (err) {
//       console.error(err);
//       toast.error('Unsuccessful Registration');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <Nav />
//       <section className="flex justify-center items-center min-h-[150vh]">
//         <div className="flex justify-center item-center">
//           <form
//             onSubmit={handleSubmit}
//             className="flex   bg-white justify-center item-center flex-col m-3 rounded-md p-10 shadow-box gap-y-[20px] border-[0.5px]"
//           >
//             <h1 className="text-3xl font-bold py-5">
//               Welcome to <span className="text-blue">Twatch.</span>
//             </h1>
//             <div className="text-center font-bold text-2xl">LOGIN</div>
//             <div>
//               <TextField
//                 id="outlined-basic"
//                 type="text"
//                 label="Username"
//                 value={usernameInput}
//                 variant="outlined"
//                 onChange={(e) => setUsernameInput(e.target.value)}
//                 className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px] "
//                 required
//               />
//             </div>
//             <div>
//               <TextField
//                 id="outlined-basic"
//                 type="password"
//                 label="Password"
//                 value={passwordInput}
//                 variant="outlined"
//                 onChange={(e) => setPasswordInput(e.target.value)}
//                 className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px] "
//                 required
//               />
//             </div>
//             <div>
//               <TextField
//                 id="outlined-basic"
//                 type="password"
//                 label="Password"
//                 value={passwordConfirm}
//                 variant="outlined"
//                 onChange={(e) => setPasswordConfirm(e.target.value)}
//                 className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px] "
//                 required
//               />
//             </div>
//             <div>
//               <FormControl sx={{ m: 1, minWidth: 305 }}>
//                 <InputLabel
//                   id="demo-simple-select-autowidth-label"
//                   className="text-l flex flex-col text-black my-1 font-bold"
//                 >
//                   Role
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-autowidth-label"
//                   id="demo-simple-select-autowidth"
//                   value={roleInput}
//                   onChange={(e) => setRoleInput(e.target.value as Role)}
//                   autoWidth
//                   label="Role"
//                 >
//                   <MenuItem value={'COMPANY'}>COMPANY</MenuItem>
//                   <MenuItem value={'CUSTOMER'}>CUSTOMER</MenuItem>
//                 </Select>
//               </FormControl>
//             </div>
//             <div>
//               <TextField
//                 id="outlined-basic"
//                 type="text"
//                 label="email"
//                 value={emailInput}
//                 variant="outlined"
//                 onChange={(e) => setEmailInput(e.target.value)}
//                 className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px] "
//                 required
//               />
//             </div>
//             <div className="flex justify-center py-5">
//               <button className="btn " disabled={isSubmitting}>
//                 SignUp
//               </button>
//             </div>
//             <Link to="/register" className="text-blue text-center">
//               have an account? Register
//             </Link>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Register;
const register = () => {
  return (
    <>
      <Nav />
      <Register />
    </>
  );
};

export default register;
