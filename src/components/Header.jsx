import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  setError,
  setLoading,
  setUserData,
} from '../redux/slices/userSlice.js';
import { setSkinData } from '../redux/slices/skinSlice.js';

import { ErrorPage, LoadingPage } from '../pages';

import { AxiosError } from 'axios';
import axios from '../utils/axios.js';
import Cookies from '../utils/Cookies.js';

export default function Header() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      if (!Cookies.hasCookie('steamId')) {
        dispatch(setLoading({ loading: false }));
        return;
      }

      axios.defaults.headers.common['Authorization'] = atob(
        Cookies.getCookie('steamId'),
      );

      try {
        const { data: _user } = await axios.post('/api/user');
        dispatch(setUserData(_user));

        dispatch(setSkinData((await axios.post('/api/skin')).data));
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 401) {
          dispatch(setLoading({ loading: false }));
          dispatch(setError({ error: '디스코드에서 연동을 해주세요.' }));
        } else {
          console.error(e);
        }
      }
    })();
  }, []);

  if (user.loading) return <LoadingPage />;

  return (
    <>
      <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div>
          <Link to="/" className="text-xl font-bold">
            Team ZephyR
          </Link>
        </div>

        <div className="mr-5 flex items-center space-x-4">
          {user.steamId !== 0 && (
            <>
              <div className="flex items-center space-x-2 mr-4">
                <img
                  className="rounded-full h-8 w-8"
                  src={user.avatar}
                  alt="avatar"
                />
                <span>{user.name}</span>
              </div>

              <button
                onClick={() => {
                  Cookies.removeCookie('steamId');
                  dispatch(logout());
                }}
                className="text-white"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </header>

      {user.error && <ErrorPage error={user.error} />}
    </>
  );
}
