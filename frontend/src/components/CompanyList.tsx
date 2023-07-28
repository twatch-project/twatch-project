import { useCompanyList } from '../hooks/useCompanyList';
import Loading from './Loading';
import CompanyCard from './CompanyCard';

const CompanyList = () => {
  const {
    status: { loading, ready },
    data,
  } = useCompanyList();

  if (loading || !ready) return <Loading />;
  return <div>{data && data.map((company) => <CompanyCard key={company.companyId} {...company} />)}</div>;
};

export default CompanyList;
