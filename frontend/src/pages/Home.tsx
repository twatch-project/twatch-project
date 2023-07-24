// import { useAuth } from '../providers/AuthProvider'
// import CompanyList from '../components/CompanyList'
import Nav from '../components/Nav'
import HeroSection from '../components/HeroSection'
import Sell from '../components/Sell'
import Blog from '../components/Blog'
import Company from '../components/Company'
import Article from '../components/Article'
import Footer from '../components/Footer'
const Home = () => {
  //   const { isLoggedIn } = useAuth()
  return (
    <>
      <Nav />
      <HeroSection />
      <Sell />
      <Blog />
      <Company />
      <Article />
      <Footer />
    </>
  )
}

export default Home
