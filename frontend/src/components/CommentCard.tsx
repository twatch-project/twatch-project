import ReactStars from 'react-stars';
import { CommentDto } from '../types/dto';

interface ICommentCardProps {
  comment: CommentDto;
}

const CommentCard = ({ comment }: ICommentCardProps) => {
  return (
    <div className="card-comment flex items-center justify-between w-[835px] h-[100px] p-5 border">
      <div className="flex items-center gap-x-[10px]">
        <div className="imgBx w-[50px] h-[50px] rounded-[100%] bg-black overflow-hidden">
          <img className="w-full h-full" alt="" />
        </div>
        <div className="flex flex-col">
          <p className="font-bold">
            {comment.commentBy.company[0].companyName || comment.commentBy.customer[0].firstname}
          </p>
          <p>{comment.message}</p>
        </div>
      </div>
      <div className="gap-x-[10px]">
        <ReactStars count={5} size={24} edit={false} value={comment.rating} color2={'#ffd700'} half={false} />
      </div>
    </div>
  );
};

export default CommentCard;
