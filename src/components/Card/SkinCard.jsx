import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import {
  updateSkinName,
  updateSkinPaint,
  updateSkinSeed,
  updateSkinWear,
} from '../../redux/slices/skinSlice.js';

import skins from '../../constant/skins.json';

import Weapon from '../../utils/Weapon.js';
import axios from '../../utils/axios.js';

SkinCard.propTypes = {
  weapon: PropTypes.number,
  paint: PropTypes.number,
  seed: PropTypes.number,
  wear: PropTypes.number,
  name: PropTypes.string,
};

export default function SkinCard({ weapon, paint, seed, wear, name }) {
  const dispatch = useDispatch();

  const onPaintChange = (e) => {
    const paint = Number(e.target.value);

    dispatch(updateSkinPaint({ weapon, paint }));
    dispatch(updateSkinSeed({ weapon, seed: 0 }));
    dispatch(updateSkinWear({ weapon, wear: 0 }));

    (async () => {
      await axios.put('/api/skin/detail', {
        weapon,
        paint,
        seed: 0,
        wear: 0,
        name: name,
      });
    })();
  };

  const onSeedChange = (e) => {
    const seed = Number(e.target.value);

    dispatch(updateSkinSeed({ weapon, seed }));
    (async () => {
      await axios.put('/api/skin/detail', { weapon, paint, seed, wear, name });
    })();
  };

  const onWearChange = (e) => {
    const wear = Number(e.target.value);

    dispatch(updateSkinWear({ weapon, wear }));
    (async () => {
      await axios.put('/api/skin/detail', { weapon, paint, seed, wear, name });
    })();
  };

  const onNameChange = (e) => {
    const name = e.target.value;

    dispatch(updateSkinName({ weapon, name }));

    (async () => {
      await axios.put('/api/skin/detail', { weapon, paint, seed, wear, name });
    })();
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg p-6">
      <img
        className="w-auto h-36 object-cover object-center mx-auto"
        src={`/img/${weapon}_${paint}.png`}
        alt={`${weapon}-${paint}`}
        draggable={false}
        onError={(event) => {
          event.currentTarget.src = '/img/none.png';
        }}
      />

      <div className="mt-4 text-xl font-bold">
        {Weapon.getNameFromWeaponIndex(weapon)}
      </div>

      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-600">스킨</label>
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={paint}
          onChange={onPaintChange}
        >
          {skins[weapon].map((skin) => (
            <option key={skin.paint} value={skin.paint}>
              {skin.name}
            </option>
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

      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-600">이름</label>
        <input
          value={name}
          onChange={onNameChange}
          type="text"
          disabled={paint === 0}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder={Weapon.getNameFromWeaponIndex(weapon)}
        />
      </div>
    </div>
  );
}
