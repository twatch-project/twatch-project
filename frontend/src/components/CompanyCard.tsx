import React from 'react'
import { CompanyDto } from '../types/dto'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material'
import Rating from '@mui/material/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
})

const CompanyCard = ({ companyId, imageProfile, companyName, rating, body }: CompanyDto) => {
  return (
    <>
      <Link to={`/company/${companyId}`}>
        <div>{imageProfile}</div>
        <div>{companyName}</div>
        <div>{body}</div>
        <div>
          <StyledRating
            name="Heart Rate"
            defaultValue={5}
            value={rating}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            readOnly
          />
        </div>
      </Link>
    </>
  )
}

export default CompanyCard