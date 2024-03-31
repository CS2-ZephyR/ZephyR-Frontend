import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

UserGuard.propTypes = {
  element: PropTypes.element,
};

export default function UserGuard(element) {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const goLogin = () => {
    navigate('/login');
  };

  if (user.loading || user.error) return <></>;

  if (user.steamId === 0) {
    return (
      <div className="flex items-center justify-center mt-64">
        <div className="text-center">
          <button
            onClick={goLogin}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  return element.element;
}
