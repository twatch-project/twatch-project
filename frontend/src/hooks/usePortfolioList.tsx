import { host } from '../constant';
import { useState, useEffect } from 'react';
import { PortfolioListHook } from '../types/portfolioList.hook';
import { PortfolioDto } from '../types/dto';

const usePortfolioList = (): PortfolioListHook => {
  const [data, setData] = useState<PortfolioDto[] | null>(null);
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${host}/portfolio`);
        const data = await res.json();

        setData(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    data,
    status: {
      error,
      loading,
      ready: error == null && !loading && data != null,
    },
  };
};

export default usePortfolioList;
