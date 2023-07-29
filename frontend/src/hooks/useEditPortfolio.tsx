import { host } from '../constant';

import { useState, useEffect } from 'react';
import { PortfolioHook } from '../types/portfolio.hook';
import { PortfolioDto } from '../types/dto';

const useEditPortfolio = (portId: string): PortfolioHook => {
  const [data, setData] = useState<PortfolioDto | null>(null);
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${host}/portfolio/${portId}`);
        const data = await res.json();

        setData(data.port);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [data]);

  return {
    data,
    status: {
      error,
      loading,
      ready: error == null && !loading && data != null,
    },
  };
};

export default useEditPortfolio;
