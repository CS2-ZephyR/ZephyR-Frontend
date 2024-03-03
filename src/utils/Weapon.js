export default {
  getWeaponListFromType: (type) => {
    if (type === 'pistol') {
      return [32, 61, 4, 36, 2, 3, 30, 63, 64, 1]
    } else if (type === 'smg') {
      return [17, 24, 26, 23, 33, 34, 19, 35, 29, 27, 25, 28, 14]
    } else if (type === 'rifle') {
      return [10, 13, 60, 16, 7, 39, 8, 40, 9, 38, 11]
    }

    return [];
  }
}
