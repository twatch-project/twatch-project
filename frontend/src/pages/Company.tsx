import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhotoOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
// import { Avatar } from '@mui/material';
import ImageGallery from '../components/Showsileimg';
import useCompany from '../hooks/useCompany';
import PortListByCompany from '../components/portfolios/PortListByCompany';
import Loading from '../components/Loading';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

export default function Company() {
  const { companyId } = useParams();

  const {
    data,
    status: { loading },
  } = useCompany(companyId);

  const imgsfile =
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';

  if (!data || loading) return <Loading />;

  return (
    <>
      <Nav />
      <section className="flex items-center justify-center min-h-[80vh]  mx-auto mt-20">
        <div className="HeroSection h-full flex w-3/5 p-2 gap-5">
          <ImageGallery images={data.imageContentUrls} />
          <div className="companyName w-1/2 h-full flex justify-between flex-col m-5 px-5 border rounded-xl">
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
            <div className="flex gap-3 ">
              <InfoOutlinedIcon />
              <span>{data.body}</span>
            </div>
            <div className="flex items-center">
              <LocalOfferOutlinedIcon />
              <div className="flex flex-wrap items-center">
                {data.tag.map((tag, index) => (
                  <span className=" m-1 bg-[#eee] rounded-md text-[10px] p-1" key={index}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="footer flex justify-between w-[300px] my-[20px]">
              <div className="icon-right"></div>
            </div>
            <div className="edit-info flex justify-end p-[15px]">
              <Link to={`/company/${companyId}/edit`}>
                <button
                  type="button"
                  className="text-blue bg-transparent border border-solid border-blue hover:bg-blue hover:text-white active:bg-blue font-bold uppercase text-sm px-6 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Edit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center  min-h-[60vh]">
        <div className="profile flex content-between min-w-[1000px] flex-col">
          <div className="head flex flex-col  justify-between  ">
            <div className="flex justify-between">
              <div className="box-left flex gap-x-3 items-center">
                <h1 className="font-bold text-[28px] py-[5px] m-5">PORTFOLIO</h1>
              </div>
              <Link to="/portfolio/create">
                <div className="box-right flex justify-end p-[15px]">
                  <button
                    type="button"
                    className="text-blue bg-transparent border border-solid border-blue hover:bg-blue hover:text-white active:bg-blue font-bold uppercase text-sm px-6 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Create Portfolio
                  </button>
                </div>
              </Link>
            </div>
            <PortListByCompany />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
