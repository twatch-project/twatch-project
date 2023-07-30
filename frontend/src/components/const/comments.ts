import { CommentDto } from '../../types/dto';

export const mockComments: CommentDto[] = [
  {
    userId: String(Math.floor(Math.random() * 100000)),
    message: 'yo',
    rating: 4,
    commentId: String(Math.floor(Math.random() * 100000)),
    commentBy: {
      company: [
        {
          companyName: 'mock company 1',
        },
      ],
      customer: [],
    },
  },
  {
    userId: String(Math.floor(Math.random() * 100000)),
    message: 'yo 2',
    rating: 5,
    commentId: String(Math.floor(Math.random() * 100000)),
    commentBy: {
      company: [
        {
          companyName: 'mock customer 2',
        },
      ],
      customer: [],
    },
  },
];
