import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
export default function nav() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <div className="">
      <nav className="flex justify-between bg-white text-center p-[1rem] shadow-box">
        <Link to="/" className="logo text-[24px] font-bold mx-[2rem]">
          Twatch
        </Link>
        <div className="menu flex items-center mx-[2rem]">
          <Link to="/" className="font-bold">
            Home
          </Link>
          <Link to="/Customer">Customer</Link>
          <Link to="/Company">Company</Link>
          <Link to="/Contact">Contact</Link>
          {isLoggedIn ? (
            <>
              <div>
                <p>Welcome</p>
              </div>
              <button onClick={logout} className="bg-blue py-[5px] px-[1rem] rounded text-white">
                logout
              </button>
            </>
          ) : (
            <>
              <Link to="/Register">SignUp</Link>
              <Link to="/Login" className="bg-blue py-[5px] px-[1rem] rounded text-white">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
