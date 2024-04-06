import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { updateSmoke } from '../../redux/slices/skinSlice.js';

import axios from '../../utils/axios.js';

SmokeColorCard.propTypes = {
  r: PropTypes.number,
  g: PropTypes.number,
  b: PropTypes.number,
};

const COLORES = {
  "기본": {
    "r": 255, "g": 255, "b": 255
  },
  "빨간색": {
    "r": 255, "g": 0, "b": 0
  },
  "핑크색": {
    "r": 185, "g": 0, "b": 255
  },
  "주황색": {
    "r": 140, "g": 255, "b": 0
  },
  "노랑색": {
    "r": 255, "g": 255, "b": 0
  },
  "초록색": {
    "r": 0, "g": 140, "b": 0
  },
  "청록색": {
    "r": 0, "g": 255, "b": 150
  },
  "파랑색": {
    "r": 0, "g": 255, "b": 255
  },
  "남색": {
    "r": 0, "g": 85, "b": 255
  },
  "보라색": {
    "r": 255, "g": 70, "b": 160
  }
}

export default function SmokeColorCard({ r, g, b }) {
  const dispatch = useDispatch();

  const onSmokeChange = (e) => {
    const r = Number(e.target.value.split(',')[0]);
    const g = Number(e.target.value.split(',')[1]);
    const b = Number(e.target.value.split(',')[2]);

    dispatch(updateSmoke({ r, g, b }));

    (async () => {
      await axios.put('/api/skin/smoke', { r, g, b });
    })();
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg p-6">
      <div className="mt-2">
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={`${r},${g},${b}`}
          onChange={onSmokeChange}
        >
          {Object.entries(COLORES).map(([name, {r, g, b}]) => (
            <option key={name} value={`${r},${g},${b}`}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
