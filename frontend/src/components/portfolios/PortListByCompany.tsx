import { useParams } from 'react-router-dom';
import usePortByCompany from '../../hooks/usePortByCompany';
import Loading from '../Loading';
import PortfolioCard from './PortfolioCard';

const PortListByCompany = () => {
  const { companyId } = useParams();
  const {
    status: { loading, ready },
    data,
  } = usePortByCompany(companyId);

  if (loading || !ready) return <Loading />;
  return <div>{data && data.map((portfolio) => <PortfolioCard key={portfolio.portId} {...portfolio} />)}</div>;
};

export default PortListByCompany;
