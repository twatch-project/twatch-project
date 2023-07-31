// import img from '../img/3.jpg'
import { useParams } from 'react-router-dom';
// import ReactStars from 'react-stars';
// import { Avatar } from '@mui/material';
import useCompany from '../hooks/useCompany';
import Loading from '../components/Loading';
import CompanySetion from '../components/companys/CompanySection';
export default function Company() {
  const { companyId } = useParams();

  const {
    data,
    status: { loading },
  } = useCompany(companyId);

  const imgsfile =
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';

  if (!data || loading) return <Loading />;

  return (
    <>
      <CompanySetion />
      {/* <PortListByCompany /> */}
    </>
  );
}
