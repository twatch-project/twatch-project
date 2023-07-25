import { Toaster } from 'react-hot-toast';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Company from './pages/Company';
import CreateCompanyProfile from './pages/CreateCompanyProfile';
import CreateProfile from './pages/CreateProfile';
import AllCompany from './pages/AllCompany';
import Layout from './s3pages/Layout';
import Homes3 from './s3pages/Home';
import NewPost from './s3pages/NewPost';
import FileUploadMultiple from './components/UploadMultifile';
import Companys from './pages/Companys';
import CreatePortfolio from './pages/CreatePortfolio';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
// import Homes3 from './s3pages/Home';


function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* <Route path="/" element={<Homes3 />} /> */}
        <Route>

          <Route path="/uploadfile" element={<FileUploadMultiple />} />
          <Route path="/CompanyDetail" element={<CompanyDetail />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Comment" element={<Comment />} />
          <Route path="/CompanyProfile" element={<CreateCompanyProfile />} />
          <Route path="/CreateProfile" element={<CreateProfile />} />
          <Route path="/AllCompany" element={<AllCompany />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/companys" element={<Companys />} />
          <Route path="/company/:companyId" element={<Company />} />
          <Route path="/company/create" element={<CreateCompanyProfile />} />
          {/* <Route path="/createprofile" element={<CreateProfile />} /> */}
          <Route path="/portfolio/:portId" element={<Portfolio />} />
          <Route path="/portfolio/create" element={<CreatePortfolio />} />

        </Route>
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* /// S3 */}
        {/* <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/newPost" element={<NewPost />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}

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
