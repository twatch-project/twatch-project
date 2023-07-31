import { Button } from '@mui/material';
import Footer from '../components/Footer';
// import Nav from '../components/Nav';
import FilterListIcon from '@mui/icons-material/FilterList';
import CompanyList from '../components/companys/CompanyList';

export default function Companys() {
  return (
    <>
      <section className="flex justify-center my-16 w-4/5 mx-auto item-center">
        <div className="flex flex-wrap justify-center gap-1 w-full items-center">
          <Button variant="outlined" startIcon={<FilterListIcon />}>
            All
          </Button>
          <Button variant="outlined">MINIMALMODERN</Button>
          <Button variant="outlined">CONTEMPORARYMODERN</Button>
          <Button variant="outlined">MODERNLUXURY</Button>
          <Button variant="outlined">MODERNSTYLE</Button>
          <Button variant="outlined">MIDCENTURYMODERN</Button>
          <Button variant="outlined">VINTAGESTYLE</Button>
          <Button variant="outlined">LOFTINDUSTRALSTYLE</Button>
          <Button variant="outlined">SCANDINAVIANSTYLE</Button>
          <Button variant="outlined">ARTDECO</Button>
          <Button variant="outlined">MIXANDMATCH</Button>
        </div>
      </section>
      <CompanyList />
      <Footer />
    </>
  );
}
