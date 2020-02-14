import DexModes from "./DexModes";
import SortModes from "./SortModes";

const UNOWN_VALUES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!?";

export default class PokemonService {
  getMons(pageMode) {
    return fetch("https://baas.kinvey.com/appdata/kid_H1_cK1DWQ/Pokemon?sort=id", {
      headers: this.getHeaders()
    })
    .then(res => res.json())
    .then(data => {
      return pageMode === DexModes.UNOWN ? this.filterUnown() :
        this.filter(data, pageMode);
    })
  }

  filter(allMons, pageMode) {
    const ownedMons = this.read(pageMode) || [];
    const availableMons = allMons.filter(mon => {
      switch (pageMode) {
        case DexModes.DEX:
          return mon.available !== false;
        case DexModes.SHINY:
          return mon.shinyAvailable !== false;
        case DexModes.LUCKY:
          return mon.available !== false && mon.tradable !== false;
        case DexModes.SHADOW:
          return mon.shadow === true;
        default:
          throw new Error();
      }
    });

    availableMons.forEach(mon => {
      if (ownedMons.includes(mon.id)) {
        mon.owned = true;
      }
    });
    return availableMons;
  }

  filterUnown() {
    const ownedMons = this.read(DexModes.UNOWN) || [];
    const unownToReturn = [];

    Array.from(UNOWN_VALUES).forEach(unown => {
      unownToReturn.push({
        name: unown,
        owned: ownedMons.includes(unown)
      });
    });

    return unownToReturn;
  }

  read(pageMode) {
    const key = DexModes.getSaveKey(pageMode);
    const mons = localStorage.getItem(key);
    return JSON.parse(mons);
  }

  save(data, pageMode) {
    const key = DexModes.getSaveKey(pageMode);
    const owned = data.filter(mon => mon.owned);
    const valuesToSave = owned.map(mon => pageMode === DexModes.UNOWN ?
      mon.name : mon.id);
    localStorage.setItem(key, JSON.stringify(valuesToSave));
  }

  sort(mons, sortOrder) {
    sortOrder = parseInt(sortOrder, 10);
    const idBasedSort = (a, b) => {
      return parseInt(a.id, 10) > parseInt(b.id, 10) ? 1: -1;
    }

    return mons.sort((a, b) => {
      if (sortOrder === SortModes.ID) {
        return idBasedSort(a, b);
      }

      if (sortOrder === SortModes.NAME) {
        return a.name > b.name ? 1: -1;
      }

      // Checked sort
      if ((a.owned && b.owned) || (!a.owned && !b.owned)) {
        // Sort Unowns by name
        if (a.name.length === 1) {
          return a.name > b.name ? 1: -1;
        } else {
          return idBasedSort(a, b);
        }
      }

      if (a.owned && !b.owned) {
        return 1;
      }
      return -1;
    });
  }

  getHeaders() {
    return {
      "Content-Type": "application/json",
      "Authorization": "Basic a2lkX0gxX2NLMURXUTozZjExNTVhOGY5ODE0MDBlYTYyMWFkYTczMmViZTFjMQ=="
    };
  }

  getGroups() {
    return [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12],
      [13, 14, 15],
      [16, 17, 18],
      [19, 20],
      [21, 22],
      [23, 24],
      [172, 25, 26],
      [27, 28],
      [29, 30, 31],
      [32, 33, 34],
      [173, 35, 36],
      [37, 38],
      [174, 39, 40],
      [41, 42, 169],
      [43, 44, 45],
      [46, 47],
      [48, 49],
      [50, 51],
      [52, 53],
      [54, 55],
      [56, 57],
      [58, 59],
      [60, 61, 62],
      [63, 64, 65],
      [66, 67, 68],
      [69, 70, 71],
      [72, 73],
      [74, 75, 76],
      [77, 78],
      [79, 80],
      [81, 82],
      [83],
      [84, 85],
      [86, 87],
      [88, 89],
      [90, 91],
      [92, 93, 94],
      [95],
      [96, 97],
      [98, 99],
      [100, 101],
      [102, 103],
      [104, 105],
      [106],
      [107],
      [108],
      [109, 110],
      [111, 112],
      [113],
      [114],
      [115],
      [116, 117],
      [118, 119],
      [120, 121],
      [122],
      [123],
      [124],
      [125],
      [126],
      [127],
      [128],
      [129, 130],
      [131],
      [132],
      [133, 134, 135, 136],
      [137],
      [138, 139],
      [140, 141],
      [142],
      [143],
      [144],
      [145],
      [146],
      [147, 148, 149],
      [150],
      [151],
      [152, 153, 154],
      [155, 156, 157],
      [158, 159, 160],
      [161, 162],
      [163, 164],
      [165, 166],
      [167, 168],
      [170, 171],
      [175, 176],
      [177, 178],
      [179, 180, 181]
    ]
  }
}
