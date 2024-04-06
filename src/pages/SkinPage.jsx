import { useSelector } from 'react-redux';

import { AgentCard, GloveCard, KnifeCard, MusicKitCard, SkinCard, SmokeColorCard } from '../components/index.js';

import Weapon from '../utils/Weapon.js';

const WeaponComponent = (skin, name, type) => {
  const skinData = new Map();

  for (const wIndex of Weapon.getWeaponListFromType(type)) {
    const oData = skin.detail[wIndex];

    if (oData !== undefined) {
      skinData.set(wIndex, skin.detail[wIndex]);
    } else {
      skinData.set(wIndex, {
        paint: 0,
        seed: 0,
        wear: 0,
        name: '',
      });
    }
  }

  return (
    <div className="mb-20">
      <p className="text-2xl font-bold mb-2.5">{name}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from(skinData).map(
          ([weapon, { paint, seed, wear, name }], index) => (
            <SkinCard
              key={index}
              weapon={weapon}
              paint={paint}
              seed={seed}
              wear={wear}
              name={name}
            />
          ),
        )}
      </div>
    </div>
  );
};

const GloveComponent = (skin) => {
  const detail = skin.detail[skin.glove];

  return (
    <div className="mb-20">
      <p className="text-2xl font-bold mb-2.5">장갑</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <GloveCard
          glove={skin.glove}
          paint={detail?.paint ?? 0}
          wear={detail?.wear ?? 0}
          seed={detail?.seed ?? 0}
        />
      </div>
    </div>
  );
};

const KnifeComponent = (skin) => {
  const detail = skin.detail[Weapon.getKnifeIndexFromKnifeRaw(skin.knife)];

  return (
    <div className="mb-20">
      <p className="text-2xl font-bold mb-2.5">칼</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <KnifeCard
          knife={skin.knife}
          paint={detail?.paint ?? 0}
          wear={detail?.wear ?? 0}
          seed={detail?.seed ?? 0}
          name={detail?.name ?? ''}
        />
      </div>
    </div>
  );
};

const AgentComponent = (skin) => {
  return (
    <div className="mb-20">
      <p className="text-2xl font-bold mb-2.5">요원</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <AgentCard team={'t'} model={skin.agent.t} />
        <AgentCard team={'ct'} model={skin.agent.ct} />
      </div>
    </div>
  );
};

const MusicKitComponent = (skin) => {
  return (
    <div className="mb-20">
      <p className="text-2xl font-bold mb-2.5">음악 키트</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <MusicKitCard music={skin.music} />
      </div>
    </div>
  );
};

const SmokeColorComponent = (skin) => {
  return (
    <div className="mb-20">
      <p className="text-2xl font-bold mb-2.5">연막탄 색상</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <SmokeColorCard r={skin.smoke.R} g={skin.smoke.G} b={skin.smoke.B}/>
      </div>
    </div>
  );
};

export default function SkinPage() {
  const skin = useSelector((state) => state.skin);

  return (
    <div className="flex justify-center">
      <div className="mx-20 my-16 max-w-screen-lg">
        {WeaponComponent(skin, '권총', 'pistol')}
        {WeaponComponent(skin, '짧은 총', 'smg')}
        {WeaponComponent(skin, '긴 총', 'rifle')}
        {WeaponComponent(skin, '기타', 'other')}
        {GloveComponent(skin)}
        {KnifeComponent(skin)}
        {AgentComponent(skin)}
        {MusicKitComponent(skin)}
        {SmokeColorComponent(skin)}
      </div>
    </div>
  );
}
