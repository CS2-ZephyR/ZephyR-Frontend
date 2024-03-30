import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import {
  updateKnife,
  updateSkinName,
  updateSkinPaint,
  updateSkinSeed,
  updateSkinWear,
} from '../../redux/slices/skinSlice.js';

import skins from '../../constant/skins.json';

import Weapon from '../../utils/Weapon.js';
import axios from '../../utils/axios.js';

KnifeCard.propTypes = {
  knife: PropTypes.string,
  paint: PropTypes.number,
  seed: PropTypes.number,
  wear: PropTypes.number,
  name: PropTypes.string,
};

export default function KnifeCard({ knife, paint, seed, wear, name }) {
  const dispatch = useDispatch();

  const knifeRaw = Weapon.getKnifeIndexFromKnifeRaw(knife);

  const onKnifeChange = (e) => {
    const knife = e.target.value;
    const knifeRaw = Weapon.getKnifeIndexFromKnifeRaw(knife);

    dispatch(updateKnife({ knife }));
    dispatch(updateSkinPaint({ weapon: knifeRaw, paint: 0 }));
    dispatch(updateSkinSeed({ weapon: knifeRaw, seed: 0 }));
    dispatch(updateSkinWear({ weapon: knifeRaw, wear: 0 }));

    (async () => {
      await axios.put('/api/skin/knife', { knife });
      await axios.put('/api/skin/detail', {
        weapon: knifeRaw,
        paint: 0,
        seed: 0,
        wear: 0,
        name: name,
      });
    })();
  };

  const onPaintChange = (e) => {
    const paint = Number(e.target.value);

    dispatch(updateSkinPaint({ weapon: knifeRaw, paint }));
    dispatch(updateSkinSeed({ weapon: knifeRaw, seed: 0 }));
    dispatch(updateSkinWear({ weapon: knifeRaw, wear: 0 }));

    (async () => {
      await axios.put('/api/skin/detail', {
        weapon: knifeRaw,
        paint,
        seed: 0,
        wear: 0,
        name: name,
      });
    })();
  };

  const onSeedChange = (e) => {
    const seed = Number(e.target.value);

    dispatch(updateSkinSeed({ weapon: knifeRaw, seed }));
    (async () => {
      await axios.put('/api/skin/detail', {
        weapon: knifeRaw,
        paint,
        seed,
        wear,
        name,
      });
    })();
  };

  const onWearChange = (e) => {
    const wear = Number(e.target.value);

    dispatch(updateSkinWear({ weapon: knifeRaw, wear }));
    (async () => {
      await axios.put('/api/skin/detail', {
        weapon: knifeRaw,
        paint,
        seed,
        wear,
        name,
      });
    })();
  };

  const onNameChange = (e) => {
    const name = e.target.value;

    dispatch(updateSkinName({ weapon: knifeRaw, name }));
    (async () => {
      await axios.put('/api/skin/detail', {
        weapon: knifeRaw,
        paint,
        seed,
        wear,
        name,
      });
    })();
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg p-6">
      <img
        className="w-auto h-36 object-cover object-center mx-auto"
        src={`/img/${knifeRaw}_${paint}.png`}
        alt={`${knife}-${paint}`}
        draggable={false}
        onError={(event) => {
          event.currentTarget.src = '/img/none.png';
        }}
      />

      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-600">칼</label>
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={knife}
          onChange={onKnifeChange}
        >
          {Weapon.getWeaponListFromType('knife').map((knifeIndex) => (
            <option
              key={Number(knifeIndex)}
              value={Weapon.getKnifeRawFromWeaponIndex(knifeIndex)}
            >
              {Weapon.getNameFromWeaponIndex(knifeIndex)}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-600">스킨</label>
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={paint}
          onChange={onPaintChange}
          disabled={knife === ''}
        >
          {knife !== '' &&
            skins[knifeRaw].map((skin) => (
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
          placeholder={Weapon.getNameFromWeaponIndex(knife)}
        />
      </div>
    </div>
  );
}
