import { CompanyCardDto } from '../../types/dto';
import { Link } from 'react-router-dom';
// import { styled } from '@mui/material';
// import Rating from '@mui/material/Rating';

// const StyledRating = styled(Rating)({
//   '& .MuiRating-iconFilled': {
//     color: '#ff6d75',
//   },
//   '& .MuiRating-iconHover': {
//     color: '#ff3d47',
//   },
// });

const CompanyCard = ({
  companyId,
  imageCompanyUrl,
  imageContentUrls,
  companyName,
  body,
  province,
  contact,
  tag,
}: CompanyCardDto) => {
  return (
    <>
      <Link to={`/company/${companyId}`}>
        <div>{imageCompanyUrl}</div>
        <div>{imageContentUrls}</div>
        <div>{companyName}</div>
        <div>{body}</div>
        <div>{province}</div>
        <div>{contact}</div>
        <div>{tag.map((tag) => tag)}</div>
        {/* <div>
          <StyledRating
            name="Heart Rate"
            defaultValue={5}
            value={rating}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            readOnly
          />
        </div> */}
      </Link>
    </>
  );
};

export default CompanyCard;
