import { useEffect, useState } from 'react';
import { CommentDto } from '../../types/dto';
import ReactStars from 'react-stars';
import { useAuth } from '../../providers/AuthProvider';
import { host } from '../../constant';
import { useCommentList } from '../../hooks/useCommentList';
import { useParams } from 'react-router-dom';
import CommentCard from './CommentCard';
import axios from 'axios';
import { Avatar } from '@mui/material';

export default function Comment() {
  const [comments, setComments] = useState<CommentDto[] | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(0);
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const { userId, token } = useAuth();
  const { portId } = useParams();

  const { data } = useCommentList(portId);

  useEffect(() => {
    if (data) {
      setComments(data);
    }
  }, [data]);
  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (userId)
      if (event.key === 'Enter') {
        try {
          await fetch(`${host}/comment/${portId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ message: newComment, rating: newRating }),
          });
        } catch (err: any) {
          console.error(err.message);
        }

        setNewComment('');
        setNewRating(0);
      }
  };

  const deletePostClicked = async (commentId: string) => {
    await axios.delete(`${host}/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (comments) {
      setComments(comments.filter((comments) => comments.commentId !== commentId));
    }
  };

  return (
    <section className="flex m-10 flex-col justify-center items-center">
      <div className="head p-[15px] text-left font-bold">COMMENT</div>
      <div className="flex flex-col justify-center items-center gap-y-3">
        <div className="flex items-center justify-between w-[835px] h-[100px] p-5 border rounded-md">
          <div className="flex items-center w-4/5 gap-x-[10px] ">
            <Avatar></Avatar>
            <input
              onKeyDown={handleKeyDown}
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
              className="focus:outline-none grow"
              type="text"
              placeholder="Add new comment..."
              required
            />
          </div>
          <div className="gap-x-[10px]">
            <ReactStars
              count={5}
              size={24}
              onChange={(newRating: number) => setNewRating(newRating)}
              value={newRating}
              color2={'#ffd700'}
              half={false}
            />
          </div>
        </div>
        {comments &&
          comments.length <= 3 &&
          [...comments]
            .reverse()
            .map((comment: CommentDto) => (
              <CommentCard key={comment.commentId} comment={comment} deletePostClicked={deletePostClicked} />
            ))}

        {comments &&
          comments.length > 3 &&
          !isShowMore &&
          [...comments]
            .reverse()
            .slice(0, 3)
            .map((comment: CommentDto) => (
              <CommentCard key={comment.commentId} comment={comment} deletePostClicked={deletePostClicked} />
            ))}

        {comments &&
          comments.length > 3 &&
          isShowMore &&
          [...comments]
            .reverse()
            .map((comment: CommentDto) => (
              <CommentCard key={comment.commentId} comment={comment} deletePostClicked={deletePostClicked} />
            ))}

        {comments && comments.length > 3 && (
          <button
            className="w-32 h-9 text-white text-center rounded-md bg-[#007FFF]"
            onClick={() => setIsShowMore(!isShowMore)}
          >
            {!isShowMore ? 'Show More' : 'Show Less'}
          </button>
        )}
      </div>
    </section>
  );
}
