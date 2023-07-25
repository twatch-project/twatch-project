import Loading from './Loading';
import PortfolioCard from './PortfolioCard';
import usePortfolioList from '../hooks/usePortfolioList';

const PortfolioList = () => {
  const {
    status: { loading, error, ready },
    data,
  } = usePortfolioList();

  if (loading || !ready) return <Loading />;
  return <div>{data && data.map((portfolio) => <PortfolioCard key={portfolio.portId} {...portfolio} />)}</div>;
};

export default PortfolioList;
