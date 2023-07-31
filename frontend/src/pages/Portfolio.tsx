import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PortfolioSection from '../components/portfolios/PortfolioSection';
import Comment from '../components/comments/Comment';

export default function Portfolio() {
  return (
    <>
      <Nav />
      <PortfolioSection />
      <Comment />
      <Footer />
    </>
  );
}
