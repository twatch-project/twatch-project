import { useEffect, useState } from 'react';
import { CompanyListHook } from '../types/companyList.hook';
import { host } from '../constant';
import { CompanyDto } from '../types/dto';

export const useCommentList = (portId: string): CompanyListHook => {
  const [data, setData] = useState<CompanyDto[] | null>(null);
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${host}/comment/${portId}`);
        const data = await res.json();

        setData(data);
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