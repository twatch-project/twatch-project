import { useParams } from 'react-router-dom';
import usePortfolio from '../hooks/usePortfolio';
import Loading from './Loading';
import { useAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const PortfolioSection = () => {
  const { portId: portId } = useParams();
  const {
    status: { loading, error, ready },
    data,
  } = usePortfolio(portId || '');

  const { companyId } = useAuth();

  const pageCompanyId = data?.companyId;

  if (loading || !ready) return <Loading />;

  const {
    title,
    body,
    imageContentUrls,
    tag,
    address,
    sub_district,
    district,
    province,
    postCode,
    createAt,
    updateAt,
  } = data!;

  return (
    <div>
      <>{title}</>
      <>{body}</>
      <>{imageContentUrls}</>
      <>{tag}</>
      <>{address}</>
      <>{sub_district}</>
      <>{district}</>
      <>{province}</>
      <>{postCode}</>
      <>{createAt}</>
      <>{updateAt}</>
      <div className="pb-10 content-end">
        {Number(companyId) === pageCompanyId ? (
          <Link to={`/portfolio/${portId}/edit`}>
            <Button type="submit" variant="contained">
              Edit
            </Button>
          </Link>
        ) : undefined}
      </div>
    </div>
  );
};

export default PortfolioSection;
