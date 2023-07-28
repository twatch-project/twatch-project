import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Company from './pages/Company';
// import CreateCompanyProfile from './pages/CreateCompanyProfile';
import Companys from './pages/Companys';
import CreatePortfolio from './pages/CreatePortfolio';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import CreateProfile from './pages/CreateProfile';
import EditPortfolioSection from './components/EditPortSection';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* <Route path="/testimage" element={<ImageGallery />} /> */}
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/companys" element={<Companys />} />
          <Route path="/company/:id" element={<Company />} />
          {/* <Route path="/company/create" element={<CreateCompanyProfile />} /> */}
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route path="/portfolio/:portId" element={<Portfolio />} />
          <Route path="/portfolio/create" element={<CreatePortfolio />} />
          {/* <Route path="/portfolio/:portId/edit" element={<EditPortfolio />} /> */}
          <Route path="/editPortSection" element={<EditPortfolioSection />} />
          <Route path="/company" element={<Company />} />
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
