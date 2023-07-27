import { useEffect, useState } from 'react';
import { Apitambons, thaiAmphure, thaiProvinceData } from '../constant';
import { AmphureDto, ProviceDto, TambonDto } from '../types/dto';

const useAddressThai = () => {
  const [tambons, setTambons] = useState<TambonDto[]>([]);
  const [amphures, setAmphure] = useState<AmphureDto[]>([]);
  const [provinces, setProvinces] = useState<ProviceDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlTambon = `${Apitambons}`;
        const resTambon = await fetch(urlTambon);
        if (!resTambon.ok) {
          throw new Error('Failed to fetch dataTambon');
        }
        const dataTambon: TambonDto[] = await resTambon.json();
        setTambons(dataTambon);

        const urlProvince = `${thaiProvinceData}`;
        const resProvince = await fetch(urlProvince);
        if (!resProvince.ok) {
          throw new Error('Failed to fetch data');
        }
        const dataProvince: ProviceDto[] = await resProvince.json();
        setProvinces(dataProvince);

        const urlAmphure = `${thaiAmphure}`;
        const resAmphure = await fetch(urlAmphure);
        if (!resAmphure.ok) {
          throw new Error('Failed to fetch data');
        }
        const dataAmphure: AmphureDto[] = await resAmphure.json();
        setAmphure(dataAmphure);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return { tambons, amphures, provinces };
};

export default useAddressThai;
