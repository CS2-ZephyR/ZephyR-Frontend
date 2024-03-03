import {useEffect, useState} from "react";
import PropTypes from 'prop-types';

import {SkinCard} from "../components/";

import Weapon from "../utils/Weapon.js";

SkinPage.propTypes = {
  type: PropTypes.string
}

export default function SkinPage({type}) {
  const [skinList, setSkinList] = useState({})

  const weaponList = Weapon.getWeaponListFromType(type)

  useEffect(() => {
    (async () => {
      const userSkin = Object.fromEntries(Object.entries({}).filter(([key]) => weaponList.includes(Number(key))));

      const defaultSkin = {};
      for (const weapon of weaponList) {
        defaultSkin[weapon] = { paint: 0, seed: 0, wear: 0, name: '' };
      }

      setSkinList({...defaultSkin, ...userSkin});
    })();
  }, []);

  return (
      <div className="mx-24 my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(skinList).map(([weapon, {paint, seed, wear, name}]) => (
              <SkinCard key={weapon} weapon={weapon} paint={paint} seed={seed} wear={wear} name={name}/>
          ))}
        </div>
      </div>
  )
}
