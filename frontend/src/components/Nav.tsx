import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useState } from 'react';
import DisplayNav from '../components/DisplayNav';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';

export default function Nav() {
  const { isLoggedIn, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [value, setValue] = useState(0);

  const handlerClick = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="mx-auto w-auto">
      <nav className="flex justify-between bg-white text-center p-[1rem] border-b drop-shadow-md w-full">
        <Link to="/" className="logo text-[24px] font-bold  max-sm:hidden">
          Craftcon
        </Link>
        <Box>
          <div className="right flex items-center">
            <div className="menu flex items-center mx-[2rem] max-md:hidden">
              <Link
                to="/"
                onClick={() => setIsActive(!isActive)}
                // className={({ isActive }) =>
                className={
                  isActive ? 'bg-blue text-white px-2 py-1 rounded-md' : 'border border-blue  px-2 py-1 rounded-md'
                }
                // }
              >
                Home
              </Link>
              <Link
                to="/Company"
                onClick={() => setIsActive(!isActive)}
                // className={({ isActive }) =>
                className={
                  isActive ? 'bg-blue text-white px-2 py-1 rounded-md' : 'border border-blue  px-2 py-1 rounded-md'
                }
              ></Link>
              <Link to="/Contact">CONTACT</Link>
              <Box sx={{ width: 500 }}>
                <BottomNavigation
                  showLabels
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                >
                  <BottomNavigationAction label="Recents" href="/" />
                  <BottomNavigationAction label="Favorites" href="/companys" />
                  <BottomNavigationAction label="Nearby" href="/" />
                </BottomNavigation>
              </Box>

              {isLoggedIn ? (
                <>
                  <button onClick={logout} className="bg-blue px-5 py-1 rounded text-white">
                    logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/Register">SIGNUP</Link>
                  <Link
                    to="/Login"
                    className="bg-blue px-5 py-1 rounded text-white hover:bg-white hover:text-blue border hover:border-blue"
                  >
                    LOGIN
                  </Link>
                </>
              )}
            </div>

            <div className="set flex">
              <div onClick={handlerClick} className="hidden max-md:block">
                {showMenu && (
                  <div className="hidden" style={{ display: 'block' }}>
                    <DisplayNav />
                  </div>
                )}
                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1000 1000">
                  <path d="M603 192q0-43-30-73t-73-30-73 30.5-30 73 30 72.5 72.5 30 73-30.5T603 192zm0 616q0-43-30-73t-73-30-73 30-30 73 30 73 72.5 30 73-30.5T603 808zm0-308q0-43-30-73t-73-30-73 30-30 73 30 73 72.5 30 73-30.5T603 500z" />
                </svg>
              </div>
            </div>
          </div>
        </Box>
      </nav>
    </div>
  );
}
