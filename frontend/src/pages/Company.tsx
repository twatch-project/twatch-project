// import img from '../img/3.jpg'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
// import { styled } from '@mui/material'
// import Rating from '@mui/material/Rating'
import ReactStars from 'react-stars';

// const StyledRating = styled(Rating)({
//   '& .MuiRating-iconFilled': {
//     color: '#ff6d75',
//   },
//   '& .MuiRating-iconHover': {
//     color: '#ff3d47',
//   },
// })
export default function Company() {
  const img =
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  return (
    <>
      <Nav />
      <section className="flex items-center justify-center min-h-[100vh]">
        <div className="HeroSection w-[1280px] h-[600px] flex justify-between items-center">
          <div className="imgBx w-[530px] h-[480px] m-[10px]">
            <img className="w-full h-full" src={img} alt="" />
          </div>
          <div className="companyName w-[530px] h-[480px] flex justify-center flex-col">
            <h1 className=" font-bold text-[18px] py-[15px]">Company Name</h1>
            <div className="detail flex flex-col gap-1">
              <span>Address : </span>
              <span>District : </span>
              <span>Province : </span>
              <span>Contact : </span>
            </div>
            <div className="text py-[15px]">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quae cumque aspernatur, facere sit
                accusantium natus nam temporibus dolorum non impedit repellat eum tenetur dolore commodi. Aliquid veniam
                recusandae repudiandae quaerat, iusto ex dolorem, ratione beatae inventore iure corporis, officiis
                numquam magni architecto! Amet officiis eum aliquid fugiat assumenda quaerat.
              </p>
            </div>
            <div className="footer flex justify-between w-[300px] my-[20px]">
              <div className="icon-left">Twatch0000@gmail.com</div>
              <div className="icon-right">
                <div className="icon"></div>
                <p>02-1234567</p>
              </div>
            </div>

            <Link to="/company/create">
              {/* <Link to="/CreateCompanyProfile"> */}
              <div className="edit-info flex justify-end p-[15px]">
                <button className="bg-blue rounded p-[10px] text-white">Create company</button>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* {'Section Two'} */}
      <section className="flex justify-center items-center min-h-[100vh]">
        <div className="profile flex flex-col items-center">
          <div className="head flex justify-between w-[1280px]">
            <div className="box-left flex gap-x-3 items-center">
              <h1 className="font-bold text-[18px] py-[5px] m-5">PORTFOLIO</h1>
              <button className="icon  text-center bg-blue rounded p-[10px] text-white">Filter</button>
            </div>
            <Link to="/CreateProfile">
              <div className="box-right flex justify-end p-[15px]">
                <button className="bg-blue rounded p-[10px] text-white">Create Portfolio</button>
              </div>
            </Link>
          </div>
          <div className="center flex justify-center gap-5 m-5">
            <section className="Portfolio  flex flex-col flex-wrap w-[300px]  bg-white rounded overflow-hidden border-[0.5px]">
              <Link to="/Comment" className="head">
                <img src={img} alt="" />
              </Link>
              <div className="center text-center my-2">
                <h1 className="font-bold  p-[10px]">CLEVERSE ACADEMY</h1>
                <p className="text-sm p-[10px]">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque beatae temporibus magnam unde maiores
                  tempore accusamus qui at? Aliquid, quo!
                </p>
              </div>
              <div className="footer flex justify-between p-[15px] ">
                <div className="imgBx w-[38px] h-[38px] rounded-full overflow-hidden">
                  <img className="w-full h-full rounded-full truncate" src={img} alt="" />
                </div>
                <div className="start flex items-center mx-[10px]">
                  <ReactStars
                    count={5}
                    // value={}
                    // onChange={(rating) => setRating(rating)}
                    size={24}
                    color2={'#ffd700'}
                    half={false}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
