import { PortfolioDto } from '../../types/dto';
import { Link } from 'react-router-dom';

const PortfolioCard = ({ portId, title, body, imageContentUrls, tag }: PortfolioDto) => {
  return (
    <>
      <Link to={`/portfolio/${portId}`}>
        <div className="card m-2 w-[300px] flex gap-y-1 flex-col justify-between h-auto min-w-[300px]     border-[0.5px] p-5 rounded-md">
          <div>
            <div className="imgBx">
              <img className="w-full h-[150px] object-cover" src={imageContentUrls[0]} alt="" />
              {/* <img
                className="w-full h-[150px] object-cover"
                src="https://images.unsplash.com/photo-1690498705124-ae0877338ea0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                alt=""
              /> */}
            </div>
            <div className="body flex flex-col justify-start pb-8">
              <div className="font-bold text-[18px] py-2">{title}</div>
              <div>{body.length < 70 ? body : body.slice(0, 70) + '...'}</div>
            </div>
          </div>
          <div className="footer ">
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
                {/* {tag.length > 2 && <span>...</span>} */}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PortfolioCard;
