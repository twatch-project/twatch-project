import { Toaster } from 'react-hot-toast';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Comment from './pages/Comment';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CompanyDetail from './pages/CompanyDetail';
import CreateCompanyProfile from './pages/CreateCompanyProfile';
import CreateProfile from './pages/CreateProfile';
import AllCompany from './pages/AllCompany';
import Layout from './s3pages/Layout';
import Homes3 from './s3pages/Home';
import NewPost from './s3pages/NewPost';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Homes3 />} />
        <Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/CompanyDetail" element={<CompanyDetail />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Comment" element={<Comment />} />
          <Route path="/CompanyProfile" element={<CreateCompanyProfile />} />
          <Route path="/CreateProfile" element={<CreateProfile />} />
          <Route path="/AllCompany" element={<AllCompany />} />
        </Route>
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* /// S3 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/newPost" element={<NewPost />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/new" element={<Create />} /> */}
        {/* <Route path="/content/:id" element={<Content />} /> */}
        {/* <Route path="/content/:id/edit" element={<Edit />} /> */}
        {/* <Route path="*" element={<Error message="Page Not Found" />} /> */}
      </Routes>
      {/* </Layout> */}
    </>
  );
}

export default App;

// url: http://api.relay.cleverse.academy/test
// body: {"status": "ok"}
