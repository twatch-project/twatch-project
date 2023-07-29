import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Company from './pages/Company';
import CreatePortfolio from './pages/CreatePortfolio';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import EditCompanyProfile from './pages/EditCompany';
import CreateCompanyProfile from './components/companys/CreateCompany';
import EditPortfolio from './pages/EditPortfolio';
import Companys from './pages/Companys';

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
          {/* <Route element={<GuardedRoute isRouteAccessible={isLoggedIn} redirectRoute="/" />}> */}
          <Route path="/company/create" element={<CreateCompanyProfile />} />
          <Route path="/company/edit/:id" element={<EditCompanyProfile />} />
          {/* <Route path="/createprofile" element={<CreateProfile />} /> */}
          <Route path="/portfolio/:portId" element={<Portfolio />} />
          <Route path="/portfolio/create" element={<CreatePortfolio />} />
          <Route path="/portfolio/:portId/edit" element={<EditPortfolio />} />
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
