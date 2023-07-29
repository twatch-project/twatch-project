import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Company from './pages/Company';
import CreatePortfolio from './pages/CreatePortfolio';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import EditCompanyProfile from './pages/EditCompany';
import Companys from './pages/Companys';
// import EditPortfolioSection from './components/EditPortSection';
// import CreateCompanyProfile from './pages/CreateCompanyProfile';
// import CreateProfile from './pages/CreateProfile';
// import EditPortfolioSection from './components/EditPortSection';
// import ShowMore from './components/ShowMore';

function App() {
  // const { isLoggedIn } = useAuth();
  return (
    <>
      {/* <ShowMore /> */}
      {/* <PortfolioSection /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* <Route path="/testimage" element={<ImageGallery />} /> */}
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/companys" element={<Companys />} />
          <Route path="/company/:id" element={<Company />} />
          <Route path="/company/edit/:id" element={<EditCompanyProfile />} />
          <Route path="/portfolio/:portId" element={<Portfolio />} />
          <Route path="/portfolio/create" element={<CreatePortfolio />} />
          {/* <Route path="/editPortfolioSection/" element={<EditPortfolioSection />} /> */}
          <Route path="/company" element={<Company />} />
        </Route>
      </Routes>
      {/* <Route element={<GuardedRoute isRouteAccessible={isLoggedIn} redirectRoute="/" />}> */}
      {/* <Route path="/company/create" element={<CreateCompanyProfile />} /> */}
      {/* <Route path="/createprofile" element={<CreateProfile />} /> */}
      {/* <Route path="/portfolio/:portId/edit" element={<EditPortfolio />} /> */}
      {/* <Route path="*" element={<Error message="Page Not Found" />} /> */}
      {/* </Layout> */}
    </>
  );
}

export default App;

// url: http://api.relay.cleverse.academy/test
// body: {"status": "ok"}
