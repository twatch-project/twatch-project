import React, { useState } from 'react';
// import ReactStars from 'react-stars';
// import './DisplayBlock.css';
// import ShowMore from '../components/ShowMore';

interface Block {
  id: number;
  text: string;
}

const DisplayBlock: React.FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const [displayData, setDisplayData] = useState<Block[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const trimmedInput = inputData.trim();

      if (trimmedInput !== '') {
        const newBlock: Block = {
          id: Date.now(), // Generate a unique ID for the new block
          text: trimmedInput,
        };

        setDisplayData((prevData) => [...prevData, newBlock]);
        setInputData('');
      }
    }
  };

  return (
    <>
      {' '}
      <div className="comment flex justify-center">
        <div className="display-block-container flex justify-center items-center border-[0.5px] p-5">
          <div className="flex flex-col justify-center items-center m-2">
            {/* <div className="imgBx w-[50px] h-[50px] rounded-[100%] bg-black overflow-hidden">
              <img className="w-full h-full" alt="" />
            </div>
            <div className="name font-bold">
              <h1>TaiChi</h1>
            </div> */}
          </div>
          <div>
            <input
              type="text"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
              onKeyDown={handleKeyDown}
              className="input-field flex flex-col w-[300px] p-2 outline-none h-[50px] border-[0.5px]"
              placeholder="Add comment"
            />
          </div>
        </div>
      </div>
      <div className="blocks-container">
        {displayData.map((block) => (
          <div key={block.id} className="block w-[300px] my-2 p-3 border-[0.5px]">
            {block.text}
            <div className="flex flex-col justify-center items-center m-2">
              <div className="imgBx w-[50px] h-[50px] rounded-[100%] bg-black overflow-hidden">
                <img className="w-full h-full" alt="" />
              </div>
              <div className="name font-bold">
                <h1>TaiChi</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <section className="flex m-10 flex-col justify-center items-center">
        <div className="head p-[15px] text-left font-bold">COMMENT</div>

        <div className="center flex flex-col gap-[25px]">
          <div className="card-comment flex items-center justify-between w-[835px] h-[100px] border-[0.5px]">
            <div className="left flex gap-x-[10px] m-[10px]">
              <div className="imgBx w-[50px] h-[50px] rounded-[100%] bg-black overflow-hidden">
                <img className="w-full h-full" alt="" />
              </div>

              <div className="name font-bold">
                <h1>TaiChi</h1>
                <input type="text" />
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
        <ShowMore />
      </section> */}
    </>
  );
};

export default DisplayBlock;

// import React, { useState } from 'react';
// export default function DisplayBlock() {
//   const [inputData, setInputData] = useState<string>('');
//   const [displayData, setDisplayData] = useState<string[]>([]);

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       const trimmedInput = inputData.trim();

//       if (trimmedInput !== '') {
//         setDisplayData((prevData) => [...prevData, trimmedInput]);
//         setInputData('');
//       }
//     }
//   };
//   return (
//     <div>
//       <input
//         type="text"
//         value={inputData}
//         onChange={(event) => setInputData(event.target.value)}
//         onKeyDown={handleKeyDown}
//         className="outline-none"
//         placeholder="Add comment"
//       />
//       <div>
//         {displayData.map((data, index) => (
//           <div key={index}>{data}</div>
//           // <Comment key={index} />
//         ))}
//       </div>
//     </div>
//   );
// }
