import { Avatar } from '@mui/material';
import { PortfolioDto } from '../../types/dto';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
// import { styled } from '@mui/material';
// import Rating from '@mui/material/Rating';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// const StyledRating = styled(Rating)({
//   '& .MuiRating-iconFilled': {
//     color: '#ff6d75',
//   },
//   '& .MuiRating-iconHover': {
//     color: '#ff3d47',
//   },
// });

const PortfolioCard = ({ portId, title, body, imageContentUrls, companyId }: PortfolioDto) => {
  return (
    <>
      {/* <Link to={`/portfolio/${portId}`}>
        <div>{imageContentUrls}</div>
        <div>{title}</div>
        <div>{body}</div>
        <div>{companyId}</div> */}
      {/* <div>
          <StyledRating
            name="Heart Rate"
            defaultValue={5}
            value={rating}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            readOnly
          />
        </div> */}
      {/* </Link> */}
      <section className="Portfolio  flex flex-col w-[300px] justify-center bg-white rounded overflow-hidden border-[0.5px]">
        <Link to={`/portfolio/${portId}`} className="head overflow-hidden">
          <img className="hover:scale-105 ease-in duration-200" src={imageContentUrls[0]} alt="" />
          <div className="center text-center my-2">
            <h1 className="font-bold  p-[10px]">{title}</h1>
            <p className="text-sm p-[10px]">{body}</p>
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
    </>
  );
};

export default PortfolioCard;
