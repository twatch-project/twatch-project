import { Link } from 'react-router-dom';
import { CompanyCardDto } from '../../types/dto';
import { Avatar } from '@mui/material';

const CompanyCard = ({
  companyId,
  imageCompanyUrl,
  imageContentUrls,
  companyName,
  body,
  province,
  tag,
}: CompanyCardDto) => {
  return (
    <>
      <Link to={`/company/${companyId}`}>
        <div className="card hover:scale-[1.011]  duration-150 w-[260px] h-full border border-md rounded-md flex flex-col justify-between overflow-hidden">
          <div className="head overflow-hidden">
            <div className="imgBx bg-[#eee] h-56 w-full object-cover transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
              <img className="w-full h-full" src={imageContentUrls[0]} alt="image" />
            </div>
          </div>
          <div className="body text-start justify-items-start py-2 px-3">
            <div className="font-bold text-[24px]">{companyName}</div>
            <div className="py-2 ">{body}</div>
            <div className="flex flex-wrap items-center">
              {tag.map((tag, index) => (
                <span className="m-1 bg-[#eee] rounded-md text-[10px] p-1" key={index}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="footer flex items-center justify-between overflow-hidden p-3">
            <div className="imgBx w-[38px] h-[38px] rounded-full overflow-hidden">
              <Avatar alt="User" src={imageCompanyUrl} />
            </div>
            <div className="py-2">{province}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CompanyCard;
