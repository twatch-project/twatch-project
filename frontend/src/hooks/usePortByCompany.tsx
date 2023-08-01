import { useEffect, useState } from 'react';
import { PortfolioDto } from '../types/dto';
import { host } from '../constant';
import { PortfolioListHook } from '../types/portfolioList.hook';

const usePortByCompany = (companyId: string | undefined): PortfolioListHook => {
  const [data, setData] = useState<PortfolioDto[] | null>(null);
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${host}/portfolio/company/${companyId}`);
        const data = await res.json();

        setRating(data.ratingPorts);
        // setRating(data.ratingPorts[1][0]._avg.rating);
        setData(data.ports);
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
export default usePortByCompany;
