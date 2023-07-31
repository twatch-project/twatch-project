import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import useCompany from '../hooks/useCompany';
import Loading from '../components/Loading';
import CompanySetion from '../components/companys/CompanySection';
import PortListByCompany from '../components/portfolios/PortListByCompany';

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
