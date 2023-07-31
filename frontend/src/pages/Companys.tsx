import Nav from '../components/Nav';
import CompanyList from '../components/companys/CompanyList';

export default function Companys() {
  const img =
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  return (
    <>
      <Nav />
      <section className="flex justify-center my-[20px]">
        <div className="filter flex justify-center gap-1 ">
          <button className="text-center text-blue bg-white border-blue border-[1px] p-[5px]">All</button>
          <button className="text-center text-blue bg-white border-blue border-[1px] p-[5px]">MINIMALMODERN</button>
          <button className="text-center text-blue bg-white border-blue border-[1px] p-[5px]">
            CONTEMPORARYMODERN
          </button>
          <button className="text-center text-blue bg-white border-blue border-[1px] p-[5px]">MODERNLUXURY</button>
          <button className="text-center text-blue bg-white border-blue border-[1px] p-[5px]">MODERNSTYLE</button>
          <button className="text-center text-blue bg-white border-blue border-[1px] p-[5px]">MIDCENTURYMODERN</button>
          <button className="text-center text-blue bg-white border-blue border-[1px] p-[5px]">VINTAGESTYLE</button>
          <button className="text-center text-blue bg-white border-blue border-[1px] p-[5px]">
            LOFTINDUSTRALSTYLE
          </button>
          <button className="text-center text-blue bg-white border-blue border-[1px] p-[5px]">SCANDINAVIANSTYLE</button>
          <button className="text-center text-blue bg-white border-blue border-[1px] p-[5px]">ARTDECO</button>
          <button className="text-center text-blue bg-white border-blue border-[1px] p-[5px]">MIXANDMATCH</button>
        </div>
      </section>
      <CompanyList />
      <section className="flex justify-center gap-[50px] flex-wrap ">
        <div className="card flex flex-col flex-wrap w-[300px]  bg-white rounded overflow-hidden border-[0.5px]">
          <div className="head">
            <img src={img} alt="" />
          </div>
          <div className="center text-center my-2">
            <h1 className="font-bold  p-[10px]">CLEVERSE ACADEMY</h1>
            <p className="text-sm p-[10px]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque beatae temporibus magnam unde maiores
              tempore accusamus qui at? Aliquid, quo!
            </p>
          </div>
          <div className="footer flex justify-between p-[15px] ">
            <div className="imgBx w-[38px] h-[38px] rounded-full overflow-hidden">
              <img className="w-full h-full rounded-full truncate" src={img} alt="" />
            </div>
            <div className="start flex items-center mx-[10px]"></div>
          </div>
        </div>
      </section>
    </>
  );
}
