import { useState } from 'react';
import { useCompanyList } from '../../hooks/useCompanyList';
import Loading from '../Loading';
import CompanyCard from './CompanyCard';
import ReactPaginate from 'react-paginate';

const CompanyList = () => {
  const {
    status: { loading, ready },
    data,
  } = useCompanyList();

  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil((data?.length || 0) / itemsPerPage);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  if (loading || !ready) return <Loading />;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data?.slice(startIndex, endIndex);

  return (
    <>
      <section className="flex justify-center m-[50px] items-center flex-col">
        <div className="control">
          <div className="head flex justify-between items-center my-[15px]">
            <div className="title font-bold text-[24px]">Company</div>
          </div>
          <div className="flex flex-wrap justify-center w-full gap-5">
            {currentItems && currentItems.map((company) => <CompanyCard key={company.companyId} {...company} />)}
          </div>
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={({ selected }) => handlePageChange(selected)}
            containerClassName="flex w-1/2 m-auto my-20 justify-between items-center"
            pageClassName="border p-2 rounded-md"
            activeClassName="bg-blue text-white"
          />
        </div>
      </section>
    </>
  );
};

export default CompanyList;
