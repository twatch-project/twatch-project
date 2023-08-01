import { useParams } from 'react-router-dom';
import usePortfolio from '../../hooks/usePortfolio';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import ImageGallery from '../Showsileimg';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhotoOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAuth } from '../../providers/AuthProvider';

const PortfolioSection = () => {
  const { portId: portId } = useParams();
  const {
    status: { loading, ready },
    data,
    rating,
  } = usePortfolio(portId || '');

  const pageCompanyId = data?.companyId;
  const { companyId } = useAuth();

  if (loading || !ready || !data) return <Loading />;
  const { title, body, imageContentUrls, tag, address, sub_district, district, province, postCode } = data;

  return (
    <>
      <section className="flex flex-col min-h-[100vh]">
        <section className="flex justify-center items-center my-10">
          <div className="HeroSection flex justify-between items-center border-[0.5px]  min-w-[1200px] min-h-[500px]  gap-x-[50px]">
            <div className="left w-[570px]">
              <div className="head m-10 ">
                <h1 className="font-bold text-[24px] mx-[15px] py-5">{title}</h1>
                <div className="detail flex mx-[15px] flex-col gap-y-[15px]">
                  <div>
                    <MapsHomeWorkOutlinedIcon />
                    <span> Address : {address}</span>
                  </div>

                  <div>
                    <AddLocationAltOutlinedIcon />
                    <span> Sub_district : {sub_district}</span>
                  </div>

                  <div>
                    <AssistantPhotoIcon />
                    <span> District : {district}</span>
                  </div>

                  <div>
                    <MapOutlinedIcon />
                    <span> Province : {province}</span>
                  </div>

                  <div>
                    <LocalShippingOutlinedIcon />
                    <span> PostCode : {postCode}</span>
                  </div>
                  <div>
                    <ContactPhoneOutlinedIcon />
                    <span> Contact : anothai.0978452316@gmail.com </span>
                  </div>

                  <div>
                    <InfoOutlinedIcon />
                    <span>{body}</span>
                  </div>
                  <div>
                    <TurnedInNotOutlinedIcon />
                    <div className="flex flex-wrap items-center">
                      Tag :
                      {tag.map((tag) => (
                        <span className=" m-1 bg-[#eee] rounded-md text-[10px] p-1" key={portId}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="right w-[570px] flex justify-center items-center overflow-hidden">
              <div className="m-10">
                <div className="imgBx flex justify-center w-[550px] ">
                  <ImageGallery images={imageContentUrls} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {Number(companyId) === Number(pageCompanyId) ? (
          <Link to={`/portfolio/${portId}/edit`}>
            <div className="footer flex justify-center">
              <button className="bg-blue p-[15px] text-white rounded hover:border-blue border-[0.5px] hover:bg-white hover:text-blue duration-500 ease-in-out">
                EDIT PORTFOLIO
              </button>
            </div>
          </Link>
        ) : undefined}
      </section>
    </>
  );
};

export default PortfolioSection;
