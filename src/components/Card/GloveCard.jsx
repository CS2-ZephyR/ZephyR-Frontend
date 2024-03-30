import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import {
  updateGlove,
  updateSkinPaint,
  updateSkinSeed,
  updateSkinWear,
} from '../../redux/slices/skinSlice.js';

import gloves from '../../constant/gloves.json';

import Weapon from '../../utils/Weapon.js';
import axios from '../../utils/axios.js';

GloveCard.propTypes = {
  glove: PropTypes.number,
  paint: PropTypes.number,
  seed: PropTypes.number,
  wear: PropTypes.number,
};

export default function GloveCard({ glove, paint, seed, wear }) {
  const dispatch = useDispatch();

  const onPaintChange = (e) => {
    const [_glove, paint] = e.target.value.split('_').map((x) => Number(x));

    dispatch(updateGlove({ glove: _glove }));
    dispatch(updateSkinPaint({ weapon: _glove, paint: paint }));
    dispatch(updateSkinSeed({ weapon: _glove, seed: 0 }));
    dispatch(updateSkinWear({ weapon: _glove, wear: 0 }));

    (async () => {
      await axios.put('/api/skin/glove', { glove: _glove });
      await axios.put('/api/skin/detail', {
        weapon: _glove,
        paint: paint,
        seed: 0,
        wear: 0,
        name: '',
      });
    })();
  };

  const onSeedChange = (e) => {
    const seed = Number(e.target.value);

    dispatch(updateSkinSeed({ weapon: glove, seed }));

    (async () => {
      await axios.put('/api/skin/detail', {
        weapon: glove,
        paint,
        seed,
        wear,
        name: '',
      });
    })();
  };

  const onWearChange = (e) => {
    const wear = Number(e.target.value);

    dispatch(updateSkinWear({ weapon: glove, wear }));

    (async () => {
      await axios.put('/api/skin/detail', {
        weapon: glove,
        paint,
        seed,
        wear,
        name: '',
      });
    })();
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg p-6">
      <img
        className="w-auto h-36 object-cover object-center mx-auto"
        src={`/img/${glove}_${paint}.png`}
        alt={`${glove}-${paint}`}
        draggable={false}
        onError={(event) => {
          event.currentTarget.src = '/img/none.png';
        }}
      />

      <div className="mt-4 text-xl font-bold">
        {Weapon.getNameFromWeaponIndex(glove)}
      </div>

      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-600">스킨</label>
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={`${glove}_${paint}`}
          onChange={onPaintChange}
        >
          {Object.keys(gloves).map((group) => (
            <optgroup key={group} label={group}>
              {gloves[group].map((detail) => (
                <option
                  key={detail.paint}
                  value={`${detail.weapon}_${detail.paint}`}
                >
                  {detail.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="mt-2 flex">
        <div className="mr-2 w-1/2">
          <label className="block text-sm font-medium text-gray-600">
            시드
          </label>
          <input
            value={seed}
            onChange={onSeedChange}
            type="number"
            min={0}
            disabled={paint === 0}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="ml-2 w-1/2">
          <label className="block text-sm font-medium text-gray-600">
            플롯
          </label>
          <input
            value={wear}
            onChange={onWearChange}
            type="number"
            step={0.05}
            min={0}
            max={1}
            disabled={paint === 0}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
      </div>
    </div>
  );
}
