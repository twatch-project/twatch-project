import { useParams } from 'react-router-dom';
import usePortfolio from '../hooks/usePortfolio';
import Loading from './Loading';
import { useAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ImageGallery from './Showsileimg';

const PortfolioSection = () => {
  const { portId: portId } = useParams();
  const {
    status: { loading, error, ready },
    data,
  } = usePortfolio(portId || '');

  const auth = useAuth();

  const pageCompanyId = data?.companyId;

  if (loading || !ready) return <Loading />;

  const {
    title,
    body,
    imageContentUrls,
    tag,
    address,
    sub_district,
    district,
    province,
    postCode,
    createAt,
    updateAt,
    companyId,
  } = data!;

  return (
    <section className="flex justify-center items-center min-h-[100vh]">
      <div className="HeroSection flex  w-[1200px] h-[520px] gap-x-[50px] ">
        <div className="left w-[570px]">
          <div className="head">
            <h1 className="font-bold text-[24px] py-[15px]">{title}</h1>
            <div className="detail flex flex-col gap-y-[15px]">
              <span>{address}</span>
              <span>{sub_district}</span>
              <span>{district}</span>
              <span>{province}</span>
              <span>{postCode}</span>
              {/* <span>{createAt}</span>
              <span>{updateAt}</span> */}
              <span>{companyId}</span>
              <span>{tag}</span>
            </div>
          </div>
          <div className="center py-[25px]">
            <p>{body}</p>
          </div>
          <Link to="/create/portfolio">
            <div className="footer py-[15px]">
              <button className="bg-blue p-[15px] text-white rounded">Edit Portfolio</button>
            </div>
          </Link>
        </div>
        <div className="right overflow-hidden">
          <div className="imgBx w-[550px] h-[550px] ">
            <ImageGallery images={imageContentUrls} />
          </div>
        </div>
        <div className="pb-10 content-end">
          {Number(auth.companyId) === pageCompanyId ? (
            <Link to={`/portfolio/${portId}/edit`}>
              <Button type="submit" variant="contained">
                EDIT PORFOLIO
              </Button>
            </Link>
          ) : undefined}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
