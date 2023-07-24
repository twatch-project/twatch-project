import img from '../img/3.jpg'
export default function Blog() {
  return (
    <section className="flex justify-center items-center min-h-[50vh]">
      <div className="flex justify-center items-center flex-col">
        <div>
          <div className="head flex justify-between items-center m-[15px]">
            <div className="title font-bold text-[24px]">Blog User</div>
            <div className="search">Search</div>
          </div>
          <section className="flex justify-center gap-[50px] w-[1040px] flex-wrap ">
            <div className="blog flex flex-col items-center w-[300px] bg-white  rounded  border-[0.5px] ">
              <div className="head flex p-[5px] my-[10px]">
                <div className="flex justify-center head-left w-[38px] h-[38px] rounded-[100%] overflow-hidden">
                  <img className=" w-full h-full" src={img} alt="" />
                </div>
                <div className="head-right overflow-hidden left-[10px] px-[5px]">
                  <h1 className="font-bold px-[5px]">TaiChi</h1>
                  <p className="text-sm overflow-hidden mx-[5px]">anothai.0978452316@gmail.com</p>
                </div>
              </div>

              <div className="center p-[5px] my-[10px]">
                <h1 className="title p-3 font-bold">Project Manger</h1>
                <p className="body p-3 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam expedita voluptate unde sapiente placeat
                  tenetur temporibus, sequi sint cum veniam harum tempora laborum repellat iure corporis, porro
                  consequuntur quae similique error autem odio! Voluptatum, fugit cum, architecto deleniti, delectus
                  quos tempore quia excepturi pariatur accusantium vel cupiditate odit asperiores dolores.
                </p>
              </div>
            </div>
            <div className="blog flex flex-col items-center w-[300px] bg-white  rounded  border-[0.5px]">
              <div className="head flex p-[5px] my-[10px]">
                <div className="flex justify-center head-left w-[38px] h-[38px] rounded-[100%] overflow-hidden">
                  <img className=" w-full h-full" src={img} alt="" />
                </div>
                <div className="head-right overflow-hidden left-[10px] px-[5px]">
                  <h1 className="font-bold px-[5px]">TaiChi</h1>
                  <p className="text-sm overflow-hidden mx-[5px]">anothai.0978452316@gmail.com</p>
                </div>
              </div>

              <div className="center p-[5px] my-[10px]">
                <h1 className="title p-3 font-bold">Project Manger</h1>
                <p className="body p-3 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam expedita voluptate unde sapiente placeat
                  tenetur temporibus, sequi sint cum veniam harum tempora laborum repellat iure corporis, porro
                  consequuntur quae similique error autem odio! Voluptatum, fugit cum, architecto deleniti, delectus
                  quos tempore quia excepturi pariatur accusantium vel cupiditate odit asperiores dolores.
                </p>
              </div>
            </div>
            <div className="blog flex flex-col items-center w-[300px] bg-white  rounded  border-[0.5px]">
              <div className="head flex p-[5px] my-[10px]">
                <div className="flex justify-center head-left w-[38px] h-[38px] rounded-[100%] overflow-hidden">
                  <img className=" w-full h-full" src={img} alt="" />
                </div>
                <div className="head-right overflow-hidden left-[10px] px-[5px]">
                  <h1 className="font-bold px-[5px]">TaiChi</h1>
                  <p className="text-sm overflow-hidden mx-[5px]">anothai.0978452316@gmail.com</p>
                </div>
              </div>

              <div className="center p-[5px] my-[10px]">
                <h1 className="title p-3 font-bold">Project Manger</h1>
                <p className="body p-3 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam expedita voluptate unde sapiente placeat
                  tenetur temporibus, sequi sint cum veniam harum tempora laborum repellat iure corporis, porro
                  consequuntur quae similique error autem odio! Voluptatum, fugit cum, architecto deleniti, delectus
                  quos tempore quia excepturi pariatur accusantium vel cupiditate odit asperiores dolores.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
