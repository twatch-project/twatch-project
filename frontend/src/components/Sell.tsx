export default function Sell() {
  return (
    <>
      <section className="flex justify-center  items-center flex-col  ">
        <div className="flex flex-col item-center ">
          <h1 className="text-blue text-[33px] font-bold text-center mt-[60px] mb-[15px]">CraftCon</h1>
          <div className="flex footer justify-center   gap-[15px]">
            <div className="flex flex-col  w-[380px] text-center justify-between">
              <div className="icon flex-col flex items-center h-[200px] shadow-lg shadow-500/20  justify-center   my-[10px] gap-[8px]  ">
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="font-bold"> Search for Constructors easily</h3>
                <p className="p-2">
                  search for Constructors easily. Consider based on their portfolios, abilities, and reviews.
                </p>
              </div>
            </div>
            <div className="flex flex-col  w-[380px] text-center box1">
              <div className="  flex-col flex items-center h-[200px] shadow-lg shadow-500/20  justify-center   my-[10px] gap-[8px] ">
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 19V18.99M12 16C12 11.5 16 12.5 16 9C16 6.79086 14.2091 5 12 5C10.1361 5 8.57002 6.27477 8.12598 8"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="font-bold">Reviews</h3>
                <p className="p-2">reviews. Check the approved and reviewed tasks</p>
              </div>
            </div>
            <div className="flex flex-col  w-[380px]  text-center box1">
              <div className="icon flex-col flex items-center h-[200px] shadow-lg shadow-500/20  justify-center   my-[10px] gap-[8px]">
                <svg
                  fill="#000000"
                  width="30px"
                  height="30px"
                  viewBox="0 -0.08 20 20"
                  data-name="Capa 1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.93,5.92l-7.79,0h0A1.25,1.25,0,0,0,4.91,7.09l0,8.5a.38.38,0,0,0,.23.35.4.4,0,0,0,.15,0,.35.35,0,0,0,.26-.12c.7-.71,1.93-1.72,2.46-1.72H8l5.92,0h0A1.23,1.23,0,0,0,15.1,13l0-5.8A1.23,1.23,0,0,0,13.93,5.92Zm.42,7a.47.47,0,0,1-.14.33.59.59,0,0,1-.33.14L8,13.38c-.71,0-1.69.75-2.34,1.33l0-7.62a.47.47,0,0,1,.47-.47h0l7.78,0a.44.44,0,0,1,.33.14.48.48,0,0,1,.14.34Z" />
                </svg>
                <h3 className="font-bold">Discuss the details</h3>
                <p className="p-2">Discuss the details. Explain to the Constructors to create a quotation</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
