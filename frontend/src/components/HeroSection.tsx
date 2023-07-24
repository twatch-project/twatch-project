import img3 from '../img/3.jpg'
import { Link } from 'react-router-dom'
export default function Hero() {
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
              <Link to="/AllCompany">
                <button className="company">Company</button>
              </Link>
              <button className="customer">Customer Blog</button>
            </div>
          </div>

          <div className="flex justify-center items-center box-right ">
            <div className="flex justify-center items-center  w-[510px] h-[300px]">
              <img src={img3} alt="" />
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
