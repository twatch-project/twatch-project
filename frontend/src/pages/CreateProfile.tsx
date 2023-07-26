import Nav from '../components/Nav';

export default function CreateProfile() {
  return (
    <>
      <Nav />
      <section className="flex justify-center items-center min-h-[150vh]">
        <form
          action=""
          className="w-[600px] border-[0.5px] flex flex-col items-center justify-center  rounded-md p-10 gap-y-[10px] m-[15px]"
        >
          <div className="title relative left-[0]">
            <h1 className=" font-bold text-[24px]">PORTFOLIO</h1>
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              TITLE
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              BODY
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              IMAGE
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              PROVINCE
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              DISTRICT
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              SUB-DISTRICT
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              ADDRESS
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              CONTRACT
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>
          <div className="input">
            <label htmlFor="" className="flex flex-col text-black my-1 font-bold">
              TAG
            </label>
            <input type="text" className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]" />
          </div>

          <button className="my-[10px] p-[10px] bg-blue rounded text-white">Confirm</button>
        </form>
      </section>
    </>
  );
}
