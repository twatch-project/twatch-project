import { Link } from 'react-router-dom';
import Slide from '../components/Slide';
import { Button } from '@mui/material';
const images = [
  'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=60',
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVpbGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  'https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1267&q=60',
  'https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2028&q=60',
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
              <Slide images={images} slideInterval={5000} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
