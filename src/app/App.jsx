import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import { Provider } from 'react-redux';
import store from '../redux/store.js';

import { Header } from '../components';
import { LoginPage, NotFound, SkinPage } from '../pages';
import { UserGuard } from '../guard';

export default function App() {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<UserGuard element={<SkinPage />} />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  );
}
