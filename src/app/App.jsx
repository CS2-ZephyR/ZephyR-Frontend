import {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import store from "../redux/store.js";

import {Header} from "../components";
import {MatchPage, NotFound, SkinPage} from "../pages";

import axios from "../utils/axios.js";

export default function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    (async () => {
      const {data: skin} = await axios.post('/api/skin');

      dispatch({type: 'SET_DETAILS_ALL', payload: skin})

      setLoaded(false);
    })();
  }, []);

  if (loaded) return <></>

  return (
      <Provider store={store}>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/match" element={<Navigate to="/match" />} />

            <Route path="/match" element={<MatchPage />} />

            <Route path="/skin/pistol" element={<SkinPage type={"pistol"} />} />
            <Route path="/skin/smg" element={<SkinPage type={"smg"} />} />
            <Route path="/skin/rifle" element={<SkinPage type={"rifle"} />} />
            <Route path="/skin/other" element={<SkinPage type={"other"} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
  )
}
