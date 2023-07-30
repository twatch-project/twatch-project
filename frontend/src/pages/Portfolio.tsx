import Nav from '../components/Nav';
import Company from '../components/companys/Company';
import Footer from '../components/Footer';

import PortfolioSection from '../components/portfolios/PortfolioSection';
import PortfolioList from '../components/portfolios/PortfolioList';
import Comment from '../components/Comment';

export default function Portfolio() {
  return (
    <>
      <Nav />
      <PortfolioSection />
      <PortfolioList />
      <Comment />
      <Company />
      <Footer />
    </>
  );
}
