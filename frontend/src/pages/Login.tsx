import Login from '../components/LoginSection';
import Nav from '../components/Nav';

const Login = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [isSubmitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return setSubmitting(true);
    }

    try {
      await login(usernameInput, passwordInput);

      toast.success('Successful Login');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Unsuccessful Login');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      <Login />
    </>
  );
};

export default login;
