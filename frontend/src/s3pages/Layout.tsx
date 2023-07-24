import { Outlet } from 'react-router-dom'

import { useLocation, useNavigate } from 'react-router-dom'
// import NavBar from './Navbar'

export default function Layout() {
  const location = useLocation()
  console.log(location.pathname)

  const navigate = useNavigate()

  const actions = {
    onHome: () => {
      navigate('/')
    },
    onNewPost: () => {
      navigate('/newPost')
    },
  }

  return (
    <div>
      {/* <NavBar {...actions}></NavBar> */}
      <div>
        <Outlet />
      </div>
    </div>
  )
}
