import { host } from '../constant';

import { useState, useEffect } from 'react';
import { PortfolioHook } from '../types/portfolio.hook';
import { PortfolioDto } from '../types/dto';

const usePortfolio = (portId: string | undefined): PortfolioHook => {
  const [data, setData] = useState<PortfolioDto | null>(null);
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${host}/portfolio/${portId}`);
        const data = await res.json();

        setRating(data.portRating);
        setData(data.port);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    rating,
    data,
    status: {
      error,
      loading,
      ready: error == null && !loading && data != null,
    },
  };
};

export default usePortfolio;
