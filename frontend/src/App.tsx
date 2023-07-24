import { Toaster } from 'react-hot-toast'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Comment from './pages/Comment'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import CompanyDetail from './pages/CompanyDetail'
import CompanyProfile from './pages/CompanyProfile'
import CreateProfile from './pages/CreateProfile'
import AllCompany from './pages/AllCompany'

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {/* <Layout> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/CompanyDetail" element={<CompanyDetail />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Comment" element={<Comment />} />
          <Route path="/CompanyProfile" element={<CompanyProfile />} />
          <Route path="/CreateProfile" element={<CreateProfile />} />
          <Route path="/AllCompany" element={<AllCompany />} />
        </Route>
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/new" element={<Create />} /> */}
        {/* <Route path="/content/:id" element={<Content />} /> */}
        {/* <Route path="/content/:id/edit" element={<Edit />} /> */}
        {/* <Route path="*" element={<Error message="Page Not Found" />} /> */}
      </Routes>
      {/* </Layout> */}
    </>
  )
}

export default App

// url: http://api.relay.cleverse.academy/test
// body: {"status": "ok"}
