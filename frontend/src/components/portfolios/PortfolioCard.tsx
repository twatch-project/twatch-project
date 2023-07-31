import { PortfolioDto } from '../../types/dto';
import { Link } from 'react-router-dom';

const PortfolioCard = ({ portId, title, body, imageContentUrls, tag }: PortfolioDto) => {
  return (
    <>
      <Link to={`/portfolio/${portId}`}>
        <div className="card m-2 w-[300px] flex gap-y-1 flex-col justify-between min-h-[450px] min-w-[300px] max-h-[500px] overflow-y-auto border-[0.5px] p-5 rounded-md">
          <div>
            <div className="imgBx h-[150px]">
              <img className="w-full h-full object-cover" src={imageContentUrls[0]} alt="" />
            </div>
            <div className="body min-h-[180px] flex flex-col justify-start text-center">
              <div className="font-bold text-[18px] py-2">{title}</div>
              <div>{body.length < 100 ? body : body.slice(0, 200) + '...'}</div>
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
