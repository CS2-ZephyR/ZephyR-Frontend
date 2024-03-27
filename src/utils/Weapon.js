const knifeDict = {
  500: 'weapon_bayonet',
  503: 'weapon_knife_css',
  505: 'weapon_knife_flip',
  506: 'weapon_knife_gut',
  507: 'weapon_knife_karambit',
  508: 'weapon_knife_m9_bayonet',
  509: 'weapon_knife_tactical',
  512: 'weapon_knife_falchion',
  514: 'weapon_knife_survival_bowie',
  515: 'weapon_knife_butterfly',
  516: 'weapon_knife_push',
  517: 'weapon_knife_cord',
  518: 'weapon_knife_canis',
  519: 'weapon_knife_ursus',
  520: 'weapon_knife_gypsy_jackknife',
  521: 'weapon_knife_outdoor',
  522: 'weapon_knife_stiletto',
  523: 'weapon_knife_widowmaker',
  525: 'weapon_knife_skeleton',
  526: 'weapon_knife_kukri',
  0: '',
};

const weaponIndex = {
  1: '데저트 이글',
  2: '듀얼 베레타',
  3: '파이브 세븐',
  4: '글록 18',
  7: 'AK-47',
  8: 'AUG',
  9: 'AWP',
  10: '파마스',
  11: 'G3SG1',
  13: '갈릴 돌격소총',
  14: 'M249',
  16: 'M4A1',
  17: 'MAC-10',
  19: 'P90',
  23: 'MP5-SD',
  24: 'UMP-45',
  25: 'XM1014',
  26: 'PP 비존',
  27: 'MAG-7',
  28: '네게브',
  29: '소드오프',
  30: 'Tec-9',
  31: '제우스',
  32: 'P2000',
  33: 'MP7',
  34: 'MP9',
  35: '노바',
  36: 'P250',
  38: 'SCAR-20',
  39: 'SG 553',
  40: 'SSG 08',
  60: 'M4A1-S',
  61: 'USP-S',
  63: 'CZ75 기관권총',
  64: 'R8 리볼버',
  500: '총검',
  503: '클래식 칼',
  505: '접이식 칼',
  506: '갈고리 칼',
  507: '카람빗',
  508: 'M9 총검',
  509: '헌츠맨 단검',
  512: '파르치온 단검',
  514: '보위 단검',
  515: '버터플라이 나이프',
  516: '그림자 단검',
  517: '파라코드 칼',
  518: '생존용 칼',
  519: '우르서스 칼',
  520: '나바하 칼',
  521: '유목민 칼',
  522: '스텔레토 나이프',
  523: '탈론 나이프',
  525: '스켈레톤 칼',
  526: '쿠크리 칼',
  0: '기본 칼',
};

export default {
  getWeaponListFromType: (type) => {
    if (type === 'pistol') {
      return [32, 61, 4, 36, 2, 3, 30, 63, 64, 1];
    } else if (type === 'smg') {
      return [17, 24, 26, 23, 33, 34, 19, 35, 29, 27, 25, 28, 14];
    } else if (type === 'rifle') {
      return [10, 13, 60, 16, 7, 39, 8, 40, 9, 38, 11];
    } else if (type === 'other') {
      return [31];
    } else if (type === 'knife') {
      return [
        0, 500, 503, 505, 506, 507, 508, 509, 512, 514, 515, 516, 517, 518, 519,
        520, 521, 522, 523, 525, 526,
      ];
    }

    return [];
  },

  getNameFromWeaponIndex: (index) => {
    return weaponIndex[index];
  },

  getKnifeRawFromWeaponIndex: (index) => {
    return knifeDict[index];
  },

  getKnifeIndexFromKnifeRaw: (raw) => {
    for (const [index, _raw] of Object.entries(knifeDict)) {
      if (raw === _raw) {
        return index;
      }
    }

    return 0;
  },
};
