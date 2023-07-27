// import img3 from '../img/2.webp'
import { Link } from 'react-router-dom';
import Slide from '../components/Slide';
const images = [
  'https://images.unsplash.com/photo-1689852044062-8860ab627625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'https://plus.unsplash.com/premium_photo-1689596510033-37ba82784d7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1689969960265-230ed01d010e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1628808592686-345743b5aa9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=60',
  'https://images.unsplash.com/photo-1690275176891-4718337fd788?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=60',
];
export default function Hero() {
  // const img3 =
  //   'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  return (
    <section className="flex justify-center items-start min-h-[100vh]">
      <div className="flex justify-center item-center gradient-sky h-[640px] ">
        <section className="flex justify-center items-center mx-40 gap-x-5">
          <div className="box-left w-auto h-60">
            <h1 className="text-5xl font-bold py-5">
              Welcome to <span className="text-blue">Twatch.</span>
            </h1>
            <p>
              Welcome to a transformation journey where your dream home becomes a reality. At [Construction Company
              Name], we believe that building your dream home is more than just constructing a structure; about creating
              a space that reflects your vision, aspirations, and lifestyle
            </p>
            <div className="group-btn flex gap-x-5 my-3">
              <Link to="/company">
                <button className="company">Company</button>
              </Link>
              <button className="customer">Customer Blog</button>
            </div>
          </div>

          <div className="flex justify-center items-center box-right w-[50%] ">
            <div className="flex justify-center items-center ">
              {/* <img className="w-full h-full" src={img3} alt="" /> */}
              <Slide images={images} slideInterval={3000} />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
