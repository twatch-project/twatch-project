// import { CompanyDto } from '../types/dto'
import { Link } from 'react-router-dom';
// import img from '../img/3.jpg'
import ReactStars from 'react-stars';
// import { styled } from '@mui/material'
// import Rating from '@mui/material/Rating'
// import FavoriteIcon from '@mui/icons-material/Favorite'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

// const StyledRating = styled(Rating)({
//   '& .MuiRating-iconFilled': {
//     color: '#ff6d75',
//   },
//   '& .MuiRating-iconHover': {
//     color: '#ff3d47',
//   },
// })
export default function Company() {
  const img =
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  return (
    <>
      <section className="flex justify-center m-[50px] items-center flex-col">
        <div>
          <div className="head flex justify-between items-center m-[15px]">
            <div className="title font-bold text-[24px]">Blog Company</div>
            <div className="search">Search</div>
          </div>
          <section className="flex justify-center gap-[50px] w-[1040px] flex-wrap">
            <div className="card  flex flex-col flex-wrap w-[300px] bg-white rounded border-[0.5px] overflow-hidden">
              <Link to="/company/:companyId" className="head hover:scale-150 duration-500">
                <img src={img} alt="" />
              </Link>
              <div className="center text-center my-2">
                <h1 className="font-bold  p-[10px]">CLEVERSE ACADEMY</h1>
                <p className="text-sm p-[10px]">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque beatae temporibus magnam unde maiores
                  tempore accusamus qui at? Aliquid, quo!
                </p>
              </div>
              <div className="footer flex justify-between p-[15px] ">
                <div className="imgBx w-[38px] h-[38px] rounded-full overflow-hidden">
                  <img className="w-full h-full rounded-full truncate" src={img} alt="" />
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
            </div>
            {/* <div className="card  flex flex-col flex-wrap w-[300px]  bg-white rounded overflow-hidden border-[0.5px]">
              <Link to="/company/:companyId" className="head">
                <img src={img} alt="" />
              </Link>
              <div className="center text-center my-2">
                <h1 className="font-bold  p-[10px]">CLEVERSE ACADEMY</h1>
                <p className="text-sm p-[10px]">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque beatae temporibus magnam unde maiores
                  tempore accusamus qui at? Aliquid, quo!
                </p>
              </div>
              <div className="footer flex justify-between p-[15px] ">
                <div className="imgBx w-[38px] h-[38px] rounded-full overflow-hidden">
                  <img className="w-full h-full rounded-full truncate" src={img} alt="" />
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
            </div>
            <div className="card  flex flex-col flex-wrap w-[300px]  bg-white rounded overflow-hidden border-[0.5px]">
              <Link to="/company/:companyId" className="head">
                <img src={img} alt="" />
              </Link>
              <div className="center text-center my-2">
                <h1 className="font-bold  p-[10px]">CLEVERSE ACADEMY</h1>
                <p className="text-sm p-[10px]">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque beatae temporibus magnam unde maiores
                  tempore accusamus qui at? Aliquid, quo!
                </p>
              </div>
              <div className="footer flex justify-between p-[15px] ">
                <div className="imgBx w-[38px] h-[38px] rounded-full overflow-hidden">
                  <img className="w-full h-full rounded-full truncate" src={img} alt="" />
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
            </div> */}
          </section>
        </div>
      </section>
    </>
  );
}
