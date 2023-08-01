import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected)}
      containerClassName={'pagination'}
      activeClassName={'active'}
    />
  );
};

export default Pagination;
