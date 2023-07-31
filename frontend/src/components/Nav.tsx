import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { BottomNavigation, BottomNavigationAction, Box, Button, Stack } from '@mui/material';

export default function Nav() {
  const { isLoggedIn, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const [value, setValue] = useState(0);

  const handlerClick = () => {
    setShowMenu(!showMenu);
  };

  styled(BottomNavigationAction)({
    '& .MuiBottomNavigationAction-label': {
      fontsize: 24,
      borderRedius: 2,
    },
  });
  return (
    <div className="mx-auto w-auto">
      <nav className="flex justify-between bg-white text-center p-[1rem] border-b drop-shadow-md w-full">
        <Link to="/" className="logo text-[24px] font-bold  max-sm:hidden">
          Craftcon
        </Link>
        <Box>
          <div className="right flex items-center">
            <div className="menu flex items-center mx-[2rem] max-md:hidden">
              <Box sx={{ width: 400 }}>
                <BottomNavigation
                  showLabels
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                >
                  <BottomNavigationAction label="Home" component={Link} to="/" sx={{ borderRadius: 3 }} />
                  <BottomNavigationAction label="Company" component={Link} to="/companys" sx={{ borderRadius: 3 }} />
                  <BottomNavigationAction label="Contact" component={Link} to="/" sx={{ borderRadius: 3 }} />
                </BottomNavigation>
              </Box>
              {isLoggedIn ? (
                <Button variant="outlined" component={Link} onClick={logout} to="/">
                  Sign Out
                </Button>
              ) : (
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" component={Link} to="/signup">
                    SIGN UP
                  </Button>
                  <Button variant="contained" component={Link} to="/signin">
                    SIGN IN
                  </Button>
                </Stack>
              )}
            </div>

            <div className="set flex">
              <div onClick={handlerClick} className="hidden max-md:block">
                {showMenu && (
                  <div className="hidden" style={{ display: 'block' }}>
                    {/* <DisplayNav /> */}
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
