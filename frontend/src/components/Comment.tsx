import ReactStars from 'react-stars';
// import img from '../'
export default function Comment() {
  return (
    <div className="">
      <form action="">
        <div className="comment flex justify-center items-start m-10 min-h-[100vh]">
          <section className="flex flex-col items-center">
            <div className="center flex flex-col gap-[25px]">
              <div className="card-comment flex items-center justify-between w-[835px] h-[100px] border-[0.5px]">
                <div className="left flex gap-x-[10px] m-[10px]">
                  <div className="imgBx w-[50px] h-[50px] rounded-[100%] bg-black overflow-hidden">
                    <img className="w-full h-full" alt="" />
                  </div>
                  <div className="name font-bold">
                    <h1>TaiChi</h1>
                    <input type="text" className="outline-none" placeholder="Add comment" />
                    {/* <TextField id="outlined-basic" label="TaiChi" variant="outlined" /> */}
                  </div>
                </div>
                <div className="right  gap-x-[10px] m-[10px]">
                  <ReactStars
                    count={5}
                    // value={rating}
                    // onChange={(rating) => setRating(rating)}
                    size={24}
                    color2={'#ffd700'}
                    half={false}
                  />
                </div>
              </div>
            </div>
            <div className="footer p-[1rem]">
              {/* <button className="bg-blue p-[1rem] text-white rounded">Show more</button> */}
              {/* <button onClick={handleToggleShowMore}>{showMore ? 'ShowLess' : 'ShowMore'}</button>
        {showMore && (
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, sed exercitationem. Ipsa atque
              libero est nisi ex, eum laudantium exercitationem?
            </p>
          </div>
        )} */}
            </div>
          </section>
        </div>
      </form>
    </div>
  );
}
