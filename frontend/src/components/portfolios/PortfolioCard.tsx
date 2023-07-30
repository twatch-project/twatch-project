import { PortfolioDto } from '../../types/dto';
import { Link } from 'react-router-dom';
// import { styled } from '@mui/material';
// import Rating from '@mui/material/Rating';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const PortfolioCard = ({ portId, title, body, imageContentUrls, companyId }: PortfolioDto) => {
  return (
    <>
      <Link to={`/portfolio/${portId}`}>
        <div className="card w-[300px] border-[0.5px] p-5 rounded-md">
          <div className="head">
            <div>{/* <img src={imageContentUrls} alt="" /> */}</div>
          </div>
          <div className="body p-3 text-center">
            <div>{title}</div>
            <div>{body}</div>
          </div>
          <div className="footer">
            <div>{companyId}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PortfolioCard;
