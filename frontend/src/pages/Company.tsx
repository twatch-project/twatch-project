import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhotoOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import ImageGallery from '../components/Showsileimg';
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
