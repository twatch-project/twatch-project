// import img3 from '../img/2.webp'
import { Link } from 'react-router-dom'
export default function Hero() {
  const img3 =
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
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
              <img className="w-full h-full" src={img3} alt="" />
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
