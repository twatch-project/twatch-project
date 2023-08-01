import { Link } from 'react-router-dom';
import Slide from '../components/Slide';
import { Button } from '@mui/material';
const images = [
  'https://images.unsplash.com/photo-1621983209359-456e234c892a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'https://img.freepik.com/free-photo/modern-residential-district-with-green-roof-balcony-generated-by-ai_188544-10276.jpg?w=1060&t=st=1690910567~exp=1690911167~hmac=6653927835566f5c5673578efefe44582c6dfc24f8957fb1895d26dd8e0e706c',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1175&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80&q=beautiful+house&tbm=isch&source=lnms&sa=X&ved=2ahUKEwj8_rTb_LuAAxU_umMGHd_WAMcQ0pQJegQIDhAB&biw=1470&bih=809&dpr=2#imgrc=sS3toaW5uWlBXM&imgdii=xi89JNFW51PMDM',
  'https://images.unsplash.com/photo-1559767949-0faa5c7e9992?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
];
export default function Hero() {
  return (
    <section>
      <div className="flex justify-center item-center gradient-sky h-[80vh] w-full">
        <div className="flex justify-center mx-40 gap-5 mt-[60px] w-4/5">
          <div className="flex flex-col gap-8 box-left  w-[40%] h-[60%]">
            <h1 className="text-5xl font-bold py-5">
              <span className="text-blue">CRAFTCON</span>
            </h1>
            <p>
              Welcome to a transformation journey where your dream home becomes a reality. At1
              <span className="text-blue"> CraftCon </span>, we believe that building your dream home is more than just
              constructing a structure; about creating a space that reflects your vision, aspirations, and lifestyle
            </p>
            <div>
              <Link to="/companys">
                <Button variant="contained">Company</Button>
              </Link>
            </div>
          </div>

          <div className="box-right  w-[45%] overflow-hidden flex justify-center">
            <div className="flex">
              <Slide images={images} slideInterval={3000} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
