import { Link } from 'react-router-dom'
export default function nav() {
  return (
    <div className="sticky top-0 ">
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
          <Link to="/Register">Sign Up</Link>
          <Link to="/Login" className="bg-blue py-[5px] px-[1rem] rounded text-white">
            Login
          </Link>
        </div>
      </nav>
    </div>
  )
}
