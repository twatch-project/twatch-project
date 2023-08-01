import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Button, Stack } from '@mui/material';
import iconlogo from '../svg/icon.svg';

export default function Nav() {
  const { isLoggedIn, logout } = useAuth();
  const [value, setValue] = useState<number>(0);

  return (
    <>
      <section className="border-b border-slate-200">
        <div className="flex items-center justify-between  mx-[10%]">
          <Link to="/" className="logo text-[24px]  font-bold w-12">
            <img src={iconlogo} alt="logo" />
          </Link>
          <div className="menu flex items-center justify-center">
            <Box sx={{ width: 400 }}>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(_event, newValue) => {
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
      </section>
    </>
  );
}
