import { Link } from 'react-router-dom'
// import { CompanyDto } from '../types/dto'
import img from '../img/3.jpg'
import { styled } from '@mui/material'
import Rating from '@mui/material/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
})
export default function Company({ rating }) {
  return (
    <>
      <Link to="/CompanyDetail" className="flex justify-center m-[50px] items-center flex-col">
        <div>
          <div className="head flex justify-between items-center my-[15px]">
            <div className="title font-bold text-[24px]">Blog Company</div>
            <div className="search">Search</div>
          </div>
          <section className="flex justify-center gap-[50px] w-[1040px] ">
            <div className="card flex flex-col flex-wrap w-[300px]  bg-white rounded overflow-hidden border-[0.5px]">
              <div className="head">
                <img src={img} alt="" />
              </div>
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
                  <StyledRating
                    name="Heart Rate"
                    defaultValue={5}
                    value={rating}
                    getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="card  flex flex-col flex-wrap w-[300px]  bg-white rounded overflow-hidden border-[0.5px]">
              <div className="head">
                <img src={img} alt="" />
              </div>
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
                  <StyledRating
                    name="Heart Rate"
                    defaultValue={5}
                    value={rating}
                    getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="card  flex flex-col flex-wrap w-[300px]  bg-white rounded overflow-hidden border-[0.5px]">
              <div className="head">
                <img src={img} alt="" />
              </div>
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
                  <StyledRating
                    name="Heart Rate"
                    defaultValue={5}
                    value={rating}
                    getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="card  flex flex-col flex-wrap w-[300px]  bg-white rounded overflow-hidden border-[0.5px]">
              <div className="head">
                <img src={img} alt="" />
              </div>
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
                  <StyledRating
                    name="Heart Rate"
                    defaultValue={5}
                    value={rating}
                    getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </Link>
    </>
  )
}
