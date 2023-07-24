// import img from '../img/3.jpg'
import Nav from '../components/Nav';
import Company from '../components/Company';
import Footer from '../components/Footer';
// import { styled } from '@mui/material'
// import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';

// const StyledRating = styled(Rating)({
//   '& .MuiRating-iconFilled': {
//     color: '#ff6d75',
//   },
//   '& .MuiRating-iconHover': {
//     color: '#ff3d47',
//   },
// })
export default function Comment() {
  const img =
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  // const navigate = useNavigate()
  // const [rating, setRating] = useState<number>(0)
  // const [comment, setComment] = useState<string>('')

  return (
    <>
      <Nav />
      <section className="flex justify-center items-center min-h-[100vh]">
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
            <Link to="/CreateProfile">
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
      </section>

      <form action="">
        \
        <div className="comment flex justify-center items-center min-h-[100vh]">
          <section className="flex flex-col items-center">
            <div className="head p-[15px] text-left font-bold">COMMENT</div>
            <div className="center flex flex-col gap-[25px]">
              <div className="card-comment flex items-center justify-between w-[835px] h-[100px] border-[0.5px]">
                <div className="left flex gap-x-[10px] m-[10px]">
                  <div className="imgBx w-[50px] h-[50px] rounded-[100%] overflow-hidden">
                    <img className="w-full h-full" src={img} alt="" />
                  </div>
                  <div className="name">
                    <h1>TaiChi</h1>
                    <input type="text" placeholder="Add comment" />
                  </div>
                </div>
                <div className="right  gap-x-[10px] m-[10px]">
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
            </div>
            <div className="footer p-[1rem]">
              <button className="bg-blue p-[1rem] text-white rounded">Show more</button>
            </div>
          </section>
        </div>
      </form>
      <Company />
      <Footer />
    </>
  );
}
