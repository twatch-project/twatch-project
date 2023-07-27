import { Outlet } from 'react-router-dom';

import { useLocation, useNavigate } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  console.log(location.pathname);

  const navigate = useNavigate();

  const actions = {
    onHome: () => {
      navigate('/');
    },
    onNewPost: () => {
      navigate('/newPost');
    },
  };

  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
