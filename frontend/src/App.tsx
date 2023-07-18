import { Toaster } from 'react-hot-toast'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      {/* <Layout> */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <>Hello world</>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/new" element={<Create />} /> */}
        {/* <Route path="/content/:id" element={<Content />} /> */}
        {/* <Route path="/content/:id/edit" element={<Edit />} /> */}
        {/* <Route path="*" element={<Error message="Page Not Found" />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
      {/* </Layout> */}
    </div>
  )
}

export default App

// url: http://api.relay.cleverse.academy/test
// body: {"status": "ok"}
