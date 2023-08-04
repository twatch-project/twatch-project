import HeroSection from '../components/HeroSection';
import Sell from '../components/Sell';
// import Blog from '../components/Blog';
import Article from '../components/Article';
import Footer from '../components/Footer';
import CompanyListHome from '../components/companys/CompanyListHome';

const Home = () => {
  return (
    <>
      <HeroSection />
      <Sell />
      {/* <Blog /> */}
      <CompanyListHome />
      <Article />
      <Footer />
    </>
  );
};

export default Home;
