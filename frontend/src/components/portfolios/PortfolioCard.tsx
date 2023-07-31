import { PortfolioDto } from '../../types/dto';
import { Link } from 'react-router-dom';
// import { styled } from '@mui/material';
// import Rating from '@mui/material/Rating';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const PortfolioCard = ({ portId, title, body, imageContentUrls, companyId, tag }: PortfolioDto) => {
  return (
    <>
      <Link to={`/portfolio/${portId}`}>
        <div className="card m-2 w-[300px] overflow-hidden flex gap-y-1 flex-col justify-between min-h-[450px] min-w-[320px] max-h-[500px] overflow-y-auto border-[0.5px] p-5 rounded-md">
          <div>
            <div className="imgBx h-[150px]">
              <img className="w-full h-full object-cover" src={imageContentUrls} alt="" />
            </div>
            <div className="body  flex flex-col justify-start text-center">
              <div className="font-bold text-[18px] py-2">{title}</div>
              <div>{body.length < 90 ? body : body.slice(0, 90) + '...'}</div>
            </div>
          </div>
          <div className="footer">
            <div>
              <div className="flex flex-wrap items-center">
                {tag.map((tag) => (
                  <span className=" m-1 bg-[#eee] rounded-md text-[10px] p-1" key={portId}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PortfolioCard;
