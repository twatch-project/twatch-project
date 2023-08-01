/* eslint-disable prettier/prettier */
import usePortfolio from '../../hooks/usePortfolio';
import { PortfolioDto } from '../../types/dto';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';

const PortfolioCard = ({ portId, title, body, imageContentUrls, tag }: PortfolioDto) => {
  const { rating } = usePortfolio(portId || '');
  return (
    <>
      <Link to={`/portfolio/${portId}`}>
        <div className="card  w-[300px] flex gap-y-1 flex-col justify-between h-auto min-w-[300px]  border-[0.5px] rounded-md overflow-hidden">
          <div>
            <div className="imgBx">
              <img
                className="w-full h-[150px] object-cover transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300 "
                src={imageContentUrls[0]}
                alt=""
              />
            </div>
            <div className="body flex flex-col justify-start p-4">
              <div className="font-medium text-[18px] py-2">{title}</div>
              <div>{body.length < 70 ? body : body.slice(0, 70) + '...'}</div>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-4">
            <div className="flex justify-start  gap-3">
              <StarIcon sx={{ color: yellow[500] }} />
              <div className="flex items-center">
                <p className="text-xs">{rating}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                {tag.length <= 2
                  ? tag.map((tag) => (
                    <span className=" m-1 bg-[#eee] rounded-md text-[10px] p-1" key={portId}>
                      {tag}
                    </span>
                  ))
                  : tag.slice(0, 2).map((tag) => (
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
