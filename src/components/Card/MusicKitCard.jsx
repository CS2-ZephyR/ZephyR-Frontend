import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { updateMusic } from '../../redux/slices/skinSlice.js';

import musics from '../../constant/music.json';
import axios from '../../utils/axios.js';

MusicKitCard.propTypes = {
  music: PropTypes.number,
};

export default function MusicKitCard({ music }) {
  const dispatch = useDispatch();

  const onMusicChange = (e) => {
    const music = Number(e.target.value);

    dispatch(updateMusic({ music }));

    (async () => {
      await axios.put('/api/skin/music', { music });
    })();
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg p-6">
      <img
        className="w-auto h-36 object-cover object-center mx-auto"
        src={`/img/music_${music}.png`}
        alt={music}
        draggable={false}
        onError={(event) => {
          event.currentTarget.src = '/img/none.png';
        }}
      />

      <div className="mt-2">
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={music}
          onChange={onMusicChange}
        >
          {musics.map((detail) => (
            <option key={detail.id} value={detail.id}>
              {detail.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
