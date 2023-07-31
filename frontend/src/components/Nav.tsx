import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useState } from 'react';

export default function Nav() {
  const { isLoggedIn, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handlerClick = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="mx-auto w-auto">
      <nav className="flex justify-between bg-white text-center p-[1rem] border-b drop-shadow-md w-full">
        <Link to="/" className="logo text-[24px] font-bold  max-sm:hidden">
          Craftcon
        </Link>
        <div className="right flex items-center">
          <div className="menu flex items-center mx-[2rem] max-md:hidden">
            <Link to="/" className="font-bold">
              Home
            </Link>
            <Link to="/company">Company</Link>
            <Link to="/contact">Contact</Link>
            {isLoggedIn ? (
              <>
                <button onClick={logout} className="bg-blue py-[5px] px-[1rem] rounded text-white">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup">SignUp</Link>
                <Link
                  to="/signin"
                  className="bg-blue py-[5px] px-[1rem] rounded text-white hover:bg-white hover:text-blue border hover:border-blue"
                >
                  SignIn
                </Link>
              </>
            )}
          </div>

          <div className="set flex">
            <div onClick={handlerClick} className="hidden max-md:block">
              {showMenu && <div className="hidden" style={{ display: 'block' }}></div>}
              <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1000 1000">
                <path d="M603 192q0-43-30-73t-73-30-73 30.5-30 73 30 72.5 72.5 30 73-30.5T603 192zm0 616q0-43-30-73t-73-30-73 30-30 73 30 73 72.5 30 73-30.5T603 808zm0-308q0-43-30-73t-73-30-73 30-30 73 30 73 72.5 30 73-30.5T603 500z" />
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
