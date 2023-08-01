// import img from '../img/3.jpg'
import { Link, useParams } from 'react-router-dom';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhotoOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import ImageGallery from '../../components/Showsileimg';
import useCompany from '../../hooks/useCompany';
import Loading from '../Loading';
import { useAuth } from '../../providers/AuthProvider';
import { Button } from '@mui/material';

export default function CompanySetion() {
  const { companyId } = useParams();

  const {
    data,
    status: { loading, ready },
  } = useCompany(companyId);
  const userData = data?.userId;
  const { userEmail, userId } = useAuth();

  if (!data || loading || !ready) return <Loading />;

  return (
    <>
      <section className="flex items-center justify-center min-h-[50vh]  mx-auto my-24">
        <div className="HeroSection h-full lg:flex w-11/12 md:4/5 lg:w-3/5 p-2 gap-5">
          <ImageGallery images={data.imageContentUrls} />
          <div className="companyName w-11/12 md:w-4/5 lg:w-1/2 h-full flex justify-between flex-col m-5 px-5 border rounded-xl">
            <h1 className=" font-bold text-[18px] py-[15px]">{data.companyName}</h1>
            <div className="detail flex flex-col gap-1">
              <div className="flex gap-3">
                <MapsHomeWorkOutlinedIcon />
                <span>Address : {data.address}</span>
              </div>
              <div className="flex gap-3">
                <MapOutlinedIcon />
                <span>Province : {data.province}</span>
              </div>
              <div className="flex gap-3">
                <AssistantPhotoIcon />
                <span>District : {data.district}</span>
              </div>
              <div className="flex gap-3">
                <ContactPhoneOutlinedIcon />
                <span>Contact : {data.contact}</span>
              </div>
            </div>
            <div className="text py-[15px]">
              <p>{data.body}</p>
            </div>
            <div className="footer flex justify-between w-[300px] my-[20px]">
              {userEmail && <div className="icon-left"></div>}
              <div className="flex flex-wrap gap-2">
                {data.tag &&
                  data.tag.map((tag) => {
                    return (
                      <>
                        <div className="m-1 bg-[#eee] rounded-md text-xs p-2">{tag}</div>
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="edit-info flex justify-end p-[15px]">
              {userData === userId ? (
                <Link to={`/company/${companyId}/edit`}>
                  <Button variant="contained" type="button">
                    Edit
                  </Button>
                </Link>
              ) : undefined}
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center h-full">
        <div className="profile flex-col justify-center w-4/5">
          <div className="head flex justify-between item-center w-full">
            <div className="box-left flex gap-x-3 items-center">
              <h1 className="font-bold text-[18px] p-1 m-5">PORTFOLIO</h1>
            </div>
            {userData === userId ? (
              <Link to="/portfolio/create">
                <div className="box-right flex justify-end p-[15px]">
                  <Button variant="contained" type="button">
                    Create Portfolio
                  </Button>
                </div>
              </Link>
            ) : undefined}
          </div>
        </div>
      </section>
    </>
  );
}
