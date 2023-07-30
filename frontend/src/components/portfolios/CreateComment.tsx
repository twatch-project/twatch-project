// import { FormEvent, useState } from 'react';
// import { host } from '../../constant';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useAuth } from '../../providers/AuthProvider';
// import { toast } from 'react-hot-toast';

// const CreateComment = () => {
//   const [isSubmitting, setSubmitting] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>('');
//   const [rating, setRating] = useState<number>(0);
//   const { token } = useAuth();
//   const { portId } = useParams();
//   const navigate = useNavigate();

//   const handlerSubmit = async (event: FormEvent<HTMLUnknownElement>) => {
//     event.preventDefault();

//     if (isSubmitting) {
//       return setSubmitting(true);
//     }
//     try {
//       const formData = new FormData();

//       formData.append('message', message);
//       formData.append('rating', rating);
//       await axios.patch(`${host}/comment/${portId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success(`Successful Create Comment.`);
//       //   navigate(`/portfolio/${portId}`);
//     } catch (err) {
//       console.error(err);
//       toast.error(`Unsuccessful Create Comment`);
//     } finally {
//       setSubmitting(false);
//     }
//   };
//   return <div>CreateComment</div>;
// };

// export default CreateComment;
