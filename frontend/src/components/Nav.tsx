export default function nav() {
  return (
    <nav className="flex fixed justify-between items-center bg-white shadow-2xl h-16 w-full ">
      <h1 className="text-2xl font-bold mx-5">Twatch</h1>
      <ul className="flex justify-center items-center gap-x-3 mx-5">
        <li className="font-bold p-2">Home</li>
        <li className="p-2">Customer</li>
        <li className="p-2">Company</li>
        <li className="p-2">Contact</li>
        <li className="p-2">
          <a href="/src/components/login.tsx">Sign Up</a>
        </li>
        <li className="p-2">
          <button className="btn">Login</button>
        </li>
      </ul>
    </nav>
  )
}
