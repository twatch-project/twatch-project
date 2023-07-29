// import { useAuth } from '../providers/AuthProvider'
// import CompanyList from '../components/CompanyList'

import Nav from '../components/Nav';
import HeroSection from '../components/HeroSection';
import Sell from '../components/Sell';
import Blog from '../components/Blog';
import Article from '../components/Article';
import Footer from '../components/Footer';
// import CompanyList from '../components/companys/CompanyList';
const Home = () => {
  return (
    <>
      <Nav />
      <HeroSection />
      <Sell />
      <Blog />
      {/* <CompanyList /> */}
      <Article />
      <Footer />
    </>
  );
};

export default Home;
