import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Button, Stack } from '@mui/material';

export default function Nav() {
  const { isLoggedIn, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const [value, setValue] = useState(0);

  const handlerClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="flex items-center justify-between mx-[10%]">
        <Link to="/" className="logo text-[24px] font-bold  max-sm:hidden">
          Craftcon
        </Link>
        <div className="menu flex items-center justify-center">
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
      </div>
    </>
  );
}
