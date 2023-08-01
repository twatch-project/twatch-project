import { useParams } from 'react-router-dom';
import usePortByCompany from '../../hooks/usePortByCompany';
import Loading from '../Loading';
import PortfolioCard from './PortfolioCard';

const PortListByCompany = () => {
  const { companyId } = useParams();
  const {
    status: { loading, ready },
    data,
    rating,
  } = usePortByCompany(companyId);

  if (loading || !ready || !rating || !data) return <Loading />;

  return (
    <div className="flex flex-wrap justify-center gap-[50px]">
      {data && data.map((portfolio) => <PortfolioCard key={portfolio.portId} {...portfolio} />)}
    </div>
  );
};

export default PortListByCompany;
