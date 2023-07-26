import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
export default function DisplayNav() {
  const { isLoggedIn, logout } = useAuth();
  // const [showMenu, setShowMenu] = useState(false);

  // const handlerClick = () => {
  //   setShowMenu(!showMenu);
  // };

  return (
    <nav className="">
      <div className="">
        <div className="">
          <Link to="/">Home</Link>
          <Link to="/EditBlog">Customer</Link>
          <Link to="/CompanyProfile">Company</Link>
          <Link to="/Contact">Contact</Link>
          <Link to="/Register">SignUp</Link>
          {isLoggedIn ? (
            <button onClick={logout} className=" ">
              Log out
            </button>
          ) : (
            <div className="flex justify-center items-center">
              <Stack direction="row">
                <Button variant="contained">
                  <Link to="/login">Log In</Link>
                </Button>
              </Stack>
            </div>
          )}
        </div>
        {/* <div className="set flex">
          <div onClick={handlerClick} className="hidden max-md:block ">
            {showMenu && (
              <div style={{ display: 'block' }}>
                <DisplayNav />
              </div>
            )}
            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1000 1000">
              <path d="M603 192q0-43-30-73t-73-30-73 30.5-30 73 30 72.5 72.5 30 73-30.5T603 192zm0 616q0-43-30-73t-73-30-73 30-30 73 30 73 72.5 30 73-30.5T603 808zm0-308q0-43-30-73t-73-30-73 30-30 73 30 73 72.5 30 73-30.5T603 500z" />
            </svg>
          </div>
        </div> */}
      </div>
    </nav>
  );
}
