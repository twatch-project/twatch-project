import { useCompanyList } from '../../hooks/useCompanyList';
import Loading from '../Loading';
import CompanyCard from './CompanyCard';

const CompanyList = () => {
  const {
    status: { loading, ready },
    data,
  } = useCompanyList();

  if (loading || !ready) return <Loading />;
  return (
    <>
      <section className="flex justify-center m-[50px] items-center flex-col">
        <div className="control">
          <div className="head flex justify-between items-center my-[15px]">
            <div className="title font-bold text-[24px]">Company</div>
          </div>
          <div className="flex justify-center gap-[50px]">
            {data && data.map((company) => <CompanyCard key={company.companyId} {...company} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyList;
