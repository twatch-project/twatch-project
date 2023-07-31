// import img from '../img/3.jpg'
import { useParams } from 'react-router-dom';
// import ReactStars from 'react-stars';
// import { Avatar } from '@mui/material';
import useCompany from '../hooks/useCompany';
import Loading from '../components/Loading';
import CompanySetion from '../components/companys/CompanySection';
import PortListByCompany from '../components/portfolios/PortListByCompany';
import Footer from '../components/Footer';
export default function Company() {
  const { companyId } = useParams();

  const {
    data,
    status: { loading },
  } = useCompany(companyId);

  if (!data || loading) return <Loading />;

  return (
    <>
      <CompanySetion />
      <PortListByCompany />
      <Footer />
    </>
  );
}
