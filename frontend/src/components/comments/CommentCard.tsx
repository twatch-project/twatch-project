import ReactStars from 'react-stars';
import { CommentDto } from '../../types/dto';
import { Avatar, IconButton } from '@mui/material';
import { useAuth } from '../../providers/AuthProvider';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { red } from '@mui/material/colors';

interface ICommentCardProps {
  comment: CommentDto;
  deletePostClicked: (commentId: string) => Promise<void>;
}

const CommentCard = ({ comment, deletePostClicked }: ICommentCardProps) => {
  const { userId } = useAuth();
  return (
    <div className="card-comment flex items-center justify-between w-[835px] h-[100px] p-5 border rounded-md">
      <div className="flex items-center gap-x-[10px]">
        <Avatar>{comment.commentBy.company[0].companyName[0] || comment.commentBy.customer[0].firstname[0]}</Avatar>
        <div className="flex flex-col">
          <p className="font-bold">
            {comment.commentBy.company[0].companyName || comment.commentBy.customer[0].firstname}
          </p>
          <p>{comment.message}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="gap-x-[10px] self-center">
          <ReactStars count={5} size={24} edit={false} value={comment.rating} color2={'#ffd700'} half={false} />
        </div>
        {comment.userId === userId ? (
          <IconButton onClick={() => deletePostClicked(comment.commentId)} type="button">
            <DeleteForeverRoundedIcon sx={{ color: red[500] }} />
          </IconButton>
        ) : undefined}
      </div>
    </div>
  );
};

export default CommentCard;
