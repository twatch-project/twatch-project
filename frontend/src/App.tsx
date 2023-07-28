import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Company from './pages/Company';
import Login from './pages/Login';
import CreatePortfolio from './pages/CreatePortfolio';
import CreateCompanyProfile from './pages/CreateCompanyProfile';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import EditPortfolio from './pages/EditPortfolio';
import EditCompanyProfile from './pages/EditCompany';
import { useAuth } from './providers/AuthProvider';

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
<!--           <Route path="/CreateCompanyProfile" element={<CreateCompanyProfile />} /> -->
          <Route path="/companys" element={<Companys />} />
          <Route path="/company/:id" element={<Company />} />
          {/* <Route element={<GuardedRoute isRouteAccessible={isLoggedIn} redirectRoute="/" />}> */}

          <Route path="/company/create" element={<CreateCompanyProfile />} />
          <Route path="/company/edit/:id" element={<EditCompanyProfile />} />
          {/* </Route> */}
          {/* <Route path="/createprofile" element={<CreateProfile />} /> */}

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
