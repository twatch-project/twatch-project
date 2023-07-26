import { useEffect, useState } from 'react';
import { AmphureDTO, ProviceDTO, TambonDTO } from '../types/ProviceList.hook';
import { Apitambons, thaiAmphure, thaiProvinceData } from '../constant';

const AddressThai = () => {
  const [tambons, setTambons] = useState<TambonDTO[]>([]);
  const [amphures, setAmphure] = useState<AmphureDTO[]>([]);
  const [provinces, setProvinces] = useState<ProviceDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${Apitambons}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: TambonDTO[] = await response.json();
        setTambons(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${thaiProvinceData}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: ProviceDTO[] = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${thaiAmphure}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: AmphureDTO[] = await response.json();
        setAmphure(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return { tambons, amphures, provinces };
};

export default AddressThai;
