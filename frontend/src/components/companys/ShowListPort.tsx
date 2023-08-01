import { useParams } from 'react-router-dom';
import usePortByCompany from '../../hooks/usePortByCompany';
import Loading from '../Loading';
import { useEffect, useState } from 'react';
import { PortfolioDto } from '../../types/dto';
import ReactPaginate from 'react-paginate';
import PortfolioCard from '../portfolios/PortfolioCard';

export default function PaginationPortList() {
  const { companyId } = useParams();

  const {
    status: { loading, ready },
    data,
  } = usePortByCompany(companyId);

  if (loading || !data || ready) return <Loading />;
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<PortfolioDto[] | null>([]);
  const itemsPerPage = 4;
  const pageCount: number = Math.ceil(data && data.length / itemsPerPage);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data && data.slice(itemOffset, endOffset));
  }, [itemOffset, itemsPerPage, data && data]);
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % (data && data.length);

    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex flex-col gap-5 items-center">
        <div className="flex flex-wrap justify-between gap-5">
          {currentItems && currentItems.map((portfolio) => <PortfolioCard key={portfolio.portId} {...portfolio} />)}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="flex w-1/2 m-auto my-20 justify-between items-center"
          pageClassName="border p-1 rounded-sm"
          activeClassName="bg-blue"
        />
      </div>
    </>
  );
}
