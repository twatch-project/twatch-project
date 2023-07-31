import Nav from '../components/Nav';
import Company from '../components/companys/Company';
import Footer from '../components/Footer';
import PortfolioSection from '../components/portfolios/PortfolioSection';
import PortListByCompany from '../components/portfolios/PortListByCompany';

export default function Portfolio() {
  return (
    <>
      <Nav />
      <PortfolioSection />
      <PortListByCompany />
      <Company />
      <Footer />
    </>
  );
}
