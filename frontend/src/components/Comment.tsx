import { useState } from 'react';
import { CommentDto } from '../types/dto';
import CommentCard from './CommentCard';
import { mockComments } from './const/comments';
import ReactStars from 'react-stars';

export default function Comment() {
  const [comments, setComments] = useState<CommentDto[]>(mockComments);
  const [newComment, setNewComment] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(0);
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setComments((prev) => [
        ...prev,
        {
          message: newComment,
          rating: newRating,
          userId: String(Math.floor(Math.random() * 100000)),

          // * these properties should be filled in backend
          commentId: String(Math.floor(Math.random() * 100000)),
          commentBy: {
            company: [{ companyName: 'GeGe' }],
            customer: [],
          },
        },
      ]);

      setNewComment('');
      setNewRating(0);
    }
  };

  return (
    <section className="flex m-10 flex-col justify-center items-center">
      <div className="head p-[15px] text-left font-bold">COMMENT</div>
      <div className="flex flex-col justify-center items-center gap-y-3">
        <div className="flex items-center justify-between w-[835px] h-[100px] p-5 border">
          <div className="flex items-center w-4/5 gap-x-[10px]">
            <div className="imgBx w-[50px] h-[50px] rounded-[100%] bg-black overflow-hidden">
              <img className="w-full h-full" alt="" />
            </div>
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
        {comments && (isShowMore || comments.length <= 3)
          ? [...comments]
              .reverse()
              .map((comment: CommentDto) => <CommentCard key={comment.commentId} comment={comment} />)
          : [...comments]
              .reverse()
              .slice(0, 3)
              .map((comment: CommentDto) => <CommentCard key={comment.commentId} comment={comment} />)}

        {comments.length > 3 && (
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
