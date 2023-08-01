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
import { Button } from '@mui/material';

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

  const { title, body, imageContentUrls, tag, address, sub_district, district, province, postCode, contact } = data!;

  return (
    <>
      <section className="flex flex-col min-h-[100vh]">
        <section className="flex justify-center items-center my-10">
          <div className="flex justify-between border rounded-md mx-auto w-4/5 h-full p-5 gap-x-5">
            <div className="left w-1/2">
              <div className="head mx-10 ">
                <h1 className="font-ligth text-[24px] mx-[15px] py-5">{title}</h1>
                <div className="detail flex mx-[15px] flex-col gap-y-[15px]">
                  <div className="flex gap-2">
                    <MapsHomeWorkOutlinedIcon />
                    <span> Address : {address}</span>
                  </div>

                  <div className="flex gap-2">
                    <AddLocationAltOutlinedIcon />
                    <span> Sub_district : {sub_district}</span>
                  </div>

                  <div className="flex gap-2">
                    <AssistantPhotoIcon />
                    <span> District : {district}</span>
                  </div>

                  <div className="flex gap-2">
                    <MapOutlinedIcon />
                    <span> Province : {province}</span>
                  </div>

                  <div className="flex gap-2">
                    <LocalShippingOutlinedIcon />
                    <span> PostCode : {postCode}</span>
                  </div>
                  <div className="flex gap-2">
                    <ContactPhoneOutlinedIcon />
                    <span> Contact : {contact} </span>
                  </div>
                  <div className="flex gap-2">
                    <InfoOutlinedIcon />
                    <span>{body}</span>
                  </div>
                  <div className="flex items-center">
                    <TurnedInNotOutlinedIcon />
                    <div className="flex flex-wrap items-center">
                      {tag.map((tag) => (
                        <span className=" m-1 bg-[#eee] rounded-md text-xs p-2" key={portId}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right w-[570px] flex overflow-hidden">
              <div className="imgBx flex w-full mx-2">
                <ImageGallery images={imageContentUrls} />
              </div>
            </div>
          </div>
        </section>
        {Number(companyId) === Number(pageCompanyId) ? (
          <Link to={`/portfolio/${portId}/edit`}>
            <div className="footer flex justify-center">
              <Button variant="contained">EDIT PORTFOLIO</Button>
            </div>
          </Link>
        ) : undefined}
      </section>
    </>
  );
};

export default PortfolioSection;
