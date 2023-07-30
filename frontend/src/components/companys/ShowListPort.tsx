import { useParams } from 'react-router-dom';
import usePortByCompany from '../../hooks/usePortByCompany';
import Loading from '../Loading';
import { useEffect, useState } from 'react';
import { PortfolioDto } from '../../types/dto';
import ReactPaginate from 'react-paginate';

export default function PaginationPortList() {
  const { companyId } = useParams();
  const {
    status: { loading, ready },
    data,
  } = usePortByCompany(companyId);

  // const imgsfile =
  //   'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  if (loading || !data) return <Loading />;
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<PortfolioDto[] | null>([]);
  const itemsPerPage = 3;
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
          {/* {currentItems && currentItems.map((portfolio) => <PortfolioCard key={portfolio.portId} {...portfolio} />)} */}
          {/* <section className="Portfolio  flex flex-col w-[300px] justify-center bg-white rounded overflow-hidden border-[0.5px]">
            <Link to="/Comment" className="head overflow-hidden">
              <img className="hover:scale-105 ease-in duration-200" src={imgsfile} alt="" />
              <div className="center text-center my-2">
                <h1 className="font-bold  p-[10px]">CLEVERSE ACADEMY</h1>
                <p className="text-sm p-[10px]">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque beatae temporibus magnam unde maiores
                  tempore accusamus qui at? Aliquid, quo!
                </p>
              </div>
              <div className="footer flex justify-between p-[15px] ">
                <div className="imgBx w-[38px] h-[38px] rounded-full overflow-hidden">
                  <Avatar alt="User" src="" />
                </div>
                <div className="start flex items-center mx-[10px]">
                  <ReactStars
                    count={5}
                    // value={}
                    // onChange={(rating) => setRating(rating)}
                    size={24}
                    color2={'#ffd700'}
                    half={false}
                  />
                </div>
              </div>
            </Link>
          </section>
          <section className="Portfolio  flex flex-col w-[300px] justify-center bg-white rounded overflow-hidden border-[0.5px]">
            <Link to="/Comment" className="head overflow-hidden">
              <img className="hover:scale-105 ease-in duration-200" src={imgsfile} alt="" />
              <div className="center text-center my-2">
                <h1 className="font-bold  p-[10px]">CLEVERSE ACADEMY</h1>
                <p className="text-sm p-[10px]">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque beatae temporibus magnam unde maiores
                  tempore accusamus qui at? Aliquid, quo!
                </p>
              </div>
              <div className="footer flex justify-between p-[15px] ">
                <div className="imgBx w-[38px] h-[38px] rounded-full overflow-hidden">
                  <Avatar alt="User" src="" />
                </div>
                <div className="start flex items-center mx-[10px]">
                  <ReactStars
                    count={5}
                    // value={}
                    // onChange={(rating) => setRating(rating)}
                    size={24}
                    color2={'#ffd700'}
                    half={false}
                  />
                </div>
              </div>
            </Link>
          </section>
          <section className="Portfolio  flex flex-col w-[300px] justify-center bg-white rounded overflow-hidden border-[0.5px]">
            <Link to="/Comment" className="head overflow-hidden">
              <img className="hover:scale-105 ease-in duration-200" src={imgsfile} alt="" />
              <div className="center text-center my-2">
                <h1 className="font-bold  p-[10px]">CLEVERSE ACADEMY</h1>
                <p className="text-sm p-[10px]">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque beatae temporibus magnam unde maiores
                  tempore accusamus qui at? Aliquid, quo!
                </p>
              </div>
              <div className="footer flex justify-between p-[15px] ">
                <div className="imgBx w-[38px] h-[38px] rounded-full overflow-hidden">
                  <Avatar alt="User" src="" />
                </div>
                <div className="start flex items-center mx-[10px]">
                  <ReactStars
                    count={5}
                    // value={}
                    // onChange={(rating) => setRating(rating)}
                    size={24}
                    color2={'#ffd700'}
                    half={false}
                  />
                </div>
              </div>
            </Link>
          </section> */}
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
          pageClassName="border p-2 rounded-lg"
          activeClassName="bg-yellow-400"
        />
      </div>
    </>
  );
}
