// import img from '../img/3.jpg'
import Nav from '../components/Nav';
import Company from '../components/companys/Company';
import Footer from '../components/Footer';

// import { styled } from '@mui/material'
// import Rating from '@mui/material/Rating'
import PortfolioSection from '../components/portfolios/PortfolioSection';
// import ShowMore from '../components/ShowMore';
import DisplayBlock from '../components/DisplayBlock';
import PortfolioList from '../components/portfolios/PortfolioList';
// import { useState } from 'react';
// import TextField from '@mui/material/TextField';

// const StyledRating = styled(Rating)({
//   '& .MuiRating-iconFilled': {
//     color: '#ff6d75',
//   },
//   '& .MuiRating-iconHover': {
//     color: '#ff3d47',
//   },
// })
export default function Portfolio() {
  // const [rating, setRating] = useState();
  // const [showMore, setShowMore] = useState(false);

  // const handleToggleShowMore = () => {
  //   setShowMore(!showMore);
  // };
  const img =
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  // const navigate = useNavigate()
  // const [rating, setRating] = useState<number>(0)
  // const [comment, setComment] = useState<string>('')

  return (
    <>
      <Nav />
      <PortfolioSection />
      <DisplayBlock />
      <PortfolioList />
      {/* <section className="flex justify-center items-center min-h-[100vh]">
        <div className="HeroSection flex  w-[1200px] h-[520px] gap-x-[50px] ">
          <div className="left w-[570px]">
            <div className="head">
              <h1 className="font-bold text-[24px] py-[15px]">Summit Tower</h1>
              <div className="detail flex flex-col gap-y-[15px]">
                <span>Location : Bangkok.Thailand</span>
                <span>Customer : CLeverseAcademy</span>
                <span>Services : Full Stack JavaScript Impressive Developer</span>
              </div>
            </div>
            <div className="center py-[25px]">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis non voluptatibus quod. Nobis,
                recusandae exercitationem. Ducimus, nemo asperiores unde maxime natus autem perferendis maiores nesciunt
                blanditiis nihil, ut vel excepturi culpa nostrum sapiente rerum. Tempore ipsa, maiores magni accusantium
                omnis at beatae fugiat commodi nulla sed quaerat dolores perspiciatis ipsam!
              </p>
            </div>
            <Link to="/create/portfolio">
              <div className="footer py-[15px]">
                <button className="bg-blue p-[15px] text-white rounded">Edit Portfolio</button>
              </div>
            </Link>
          </div>
          <div className="right overflow-hidden">
            <div className="imgBx w-[550px] h-[550px] ">
              <img className="w-full h-full" src={img} alt="" />
            </div>
          </div>
        </div>
      </section> */}

      <Company />
      <Footer />
    </>
  );
}

{
  /* <input type="text" className="outline-none" placeholder="Add comment" /> */
}
{
  /* <TextField id="outlined-basic" label="TaiChi" variant="outlined" /> */
}
