import Footer from '../components/Footer';
import Nav from '../components/Nav';
import CompanyList from '../components/companys/CompanyList';

export default function Companys() {
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
      <Footer />
    </>
  );
}
