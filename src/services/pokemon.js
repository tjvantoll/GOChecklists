import DexModes from "./DexModes";
import SortModes from "./SortModes";

import pokemon from "../data/pokemon";
const UNOWN_VALUES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!?";

export default class PokemonService {
  getPageMode() {
    return window.location.pathname.replace("/", "");
  }

  getMons(pageMode) {
    return pageMode === DexModes.UNOWN
      ? this.filterUnown()
      : this.filter(pokemon, pageMode);
  }

  filter(allMons, pageMode) {
    const ownedMons = this.read(pageMode) || [];
    const availableMons = allMons.filter((mon) => {
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

    // Reset the data from previous runs
    pokemon.forEach((mon) => {
      mon.owned = false;
    });
    availableMons.forEach((mon) => {
      if (ownedMons.includes(mon.id)) {
        mon.owned = true;
      }
    });
    return availableMons;
  }

  filterUnown() {
    const ownedMons = this.read(DexModes.UNOWN) || [];
    const unownToReturn = [];

    Array.from(UNOWN_VALUES).forEach((unown) => {
      unownToReturn.push({
        name: unown,
        owned: ownedMons.includes(unown),
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
    const owned = data.filter((mon) => mon.owned);
    const valuesToSave = owned.map((mon) =>
      pageMode === DexModes.UNOWN ? mon.name : mon.id
    );
    localStorage.setItem(key, JSON.stringify(valuesToSave));
  }

  exportAllData() {
    const allData = {};
    const modes = [
      DexModes.DEX,
      DexModes.SHINY,
      DexModes.LUCKY,
      DexModes.UNOWN,
      DexModes.SHADOW,
    ];

    modes.forEach((mode) => {
      const key = DexModes.getSaveKey(mode);
      const data = localStorage.getItem(key);
      if (data) {
        allData[key] = JSON.parse(data);
      }
    });

    return JSON.stringify(allData);
  }

  importAllData(dataString) {
    try {
      const data = JSON.parse(dataString);
      const modes = [
        DexModes.DEX,
        DexModes.SHINY,
        DexModes.LUCKY,
        DexModes.UNOWN,
        DexModes.SHADOW,
      ];

      modes.forEach((mode) => {
        const key = DexModes.getSaveKey(mode);
        if (data[key]) {
          localStorage.setItem(key, JSON.stringify(data[key]));
        }
      });

      return true;
    } catch (error) {
      console.error("Import failed:", error);
      return false;
    }
  }

  sort(mons, sortOrder) {
    const idBasedSort = (a, b) => {
      return parseInt(a.id, 10) > parseInt(b.id, 10) ? 1 : -1;
    };

    return mons.sort((a, b) => {
      if (sortOrder === SortModes.ID) {
        return idBasedSort(a, b);
      }

      if (sortOrder === SortModes.NAME) {
        return a.name > b.name ? 1 : -1;
      }

      // Checked sort
      if ((a.owned && b.owned) || (!a.owned && !b.owned)) {
        // Sort Unowns by name
        if (a.name.length === 1) {
          return a.name > b.name ? 1 : -1;
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
      Authorization:
        "Basic a2lkX0gxX2NLMURXUTozZjExNTVhOGY5ODE0MDBlYTYyMWFkYTczMmViZTFjMQ==",
    };
  }

  getGroupedMons(mons) {
    const groups = [];
    this.getGroups().forEach((group) => {
      const monsForGroup = [];
      group.forEach((id) => {
        const mon = mons.filter((mon) => mon.id === id)[0];
        if (mon) {
          monsForGroup.push(mon);
        }
      });
      if (monsForGroup.length > 0) {
        groups.push(monsForGroup);
      }
    });

    return groups;
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
      [43, 44, 45, 182],
      [46, 47],
      [48, 49],
      [50, 51],
      [52, 53, 863],
      [54, 55],
      [56, 57, 979],
      [58, 59],
      [60, 61, 62, 186],
      [63, 64, 65],
      [66, 67, 68],
      [69, 70, 71],
      [72, 73],
      [74, 75, 76],
      [77, 78],
      [79, 80, 199],
      [81, 82, 462],
      [83, 865],
      [84, 85],
      [86, 87],
      [88, 89],
      [90, 91],
      [92, 93, 94],
      [95, 208],
      [96, 97],
      [98, 99],
      [100, 101],
      [102, 103],
      [104, 105],
      [236, 106, 107, 237],
      [108, 463],
      [109, 110],
      [111, 112, 464],
      [440, 113, 242],
      [114, 465],
      [115],
      [116, 117, 230],
      [118, 119],
      [120, 121],
      [439, 122, 866],
      [123, 212, 900],
      [238, 124],
      [239, 125, 466],
      [240, 126, 467],
      [127],
      [128],
      [129, 130],
      [131],
      [132],
      [133, 134, 135, 136, 196, 197, 470, 471, 700],
      [137, 233, 474],
      [138, 139],
      [140, 141],
      [142],
      [446, 143],
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
      [175, 176, 468],
      [177, 178],
      [179, 180, 181],
      [298, 183, 184],
      [438, 185],
      [187, 188, 189],
      [190, 424],
      [191, 192],
      [193, 469],
      [194, 195, 980],
      [198, 430],
      [200, 429],
      [201],
      [360, 202],
      [203],
      [204, 205],
      [206],
      [207, 472],
      [209, 210],
      [211, 904],
      [213],
      [214],
      [215, 461, 903],
      [216, 217, 901],
      [218, 219],
      [220, 221, 473],
      [222, 864],
      [223, 224],
      [225],
      [458, 226],
      [227],
      [228, 229],
      [231, 232],
      [234, 899],
      [235],
      [241],
      [243],
      [244],
      [245],
      [246, 247, 248],
      [249],
      [250],
      [251],
      [252, 253, 254],
      [255, 256, 257],
      [258, 259, 260],
      [261, 262],
      [263, 264, 862],
      [265, 266, 267, 268, 269],
      [270, 271, 272],
      [273, 274, 275],
      [276, 277],
      [278, 279],
      [280, 281, 282, 475],
      [283, 284],
      [285, 286],
      [287, 288, 289],
      [290, 291, 292],
      [293, 294, 295],
      [296, 297],
      [299, 476],
      [300, 301],
      [302],
      [303],
      [304, 305, 306],
      [307, 308],
      [309, 310],
      [311],
      [312],
      [313],
      [314],
      [406, 315, 407],
      [316, 317],
      [318, 319],
      [320, 321],
      [322, 323],
      [324],
      [325, 326],
      [327],
      [328, 329, 330],
      [331, 332],
      [333, 334],
      [335],
      [336],
      [337],
      [338],
      [339, 340],
      [341, 342],
      [343, 344],
      [345, 346],
      [347, 348],
      [349, 350],
      [351],
      [352],
      [353, 354],
      [355, 356, 477],
      [357],
      [433, 358],
      [359],
      [361, 362, 478],
      [363, 364, 365],
      [366, 367, 368],
      [369],
      [370],
      [371, 372, 373],
      [374, 375, 376],
      [377],
      [378],
      [379],
      [380],
      [381],
      [382],
      [383],
      [384],
      [385],
      [386],
      [387, 388, 389],
      [390, 391, 392],
      [393, 394, 395],
      [396, 397, 398],
      [399, 400],
      [401, 402],
      [403, 404, 405],
      [408, 409],
      [410, 411],
      [412, 413, 414],
      [415, 416],
      [417],
      [418, 419],
      [420, 421],
      [422, 423],
      [425, 426],
      [427, 428],
      [431, 432],
      [434, 435],
      [436, 437],
      [441],
      [442],
      [443, 444, 445],
      [447, 448],
      [449, 450],
      [451, 452],
      [453, 454],
      [455],
      [456, 457],
      [459, 460],
      [479],
      [480],
      [481],
      [482],
      [483],
      [484],
      [485],
      [486],
      [487],
      [488],
      [489, 490],
      [491],
      [492],
      [493],
      [494],
      [495, 496, 497],
      [498, 499, 500],
      [501, 502, 503],
      [504, 505],
      [506, 507, 508],
      [509, 510],
      [511, 512],
      [513, 514],
      [515, 516],
      [517, 518],
      [519, 520, 521],
      [522, 523],
      [524, 525, 526],
      [527, 528],
      [529, 530],
      [531],
      [532, 533, 534],
      [535, 536, 537],
      [538],
      [539],
      [540, 541, 542],
      [543, 544, 545],
      [546, 547],
      [548, 549],
      [550, 902],
      [551, 552, 553],
      [554, 555],
      [556],
      [557, 558],
      [559, 560],
      [561],
      [562, 563, 867],
      [564, 565],
      [566, 567],
      [568, 569],
      [570, 571],
      [572, 573],
      [574, 575, 576],
      [577, 578, 579],
      [580, 581],
      [582, 583, 584],
      [585, 586],
      [587],
      [588, 589],
      [590, 591],
      [592, 593],
      [594],
      [595, 596],
      [597, 598],
      [599, 600, 601],
      [602, 603, 604],
      [605, 606],
      [607, 608, 609],
      [610, 611, 612],
      [613, 614],
      [615],
      [616, 617],
      [618],
      [619, 620],
      [621],
      [622, 623],
      [624, 625, 983],
      [626],
      [627, 628],
      [629, 630],
      [631],
      [632],
      [633, 634, 635],
      [636, 637],
      [638],
      [639],
      [640],
      [641],
      [642],
      [643],
      [644],
      [645],
      [646],
      [647],
      [648],
      [649],
      [650, 651, 652],
      [653, 654, 655],
      [656, 657, 658],
      [659, 660],
      [661, 662, 663],
      [664, 665, 666],
      [667, 668],
      [669, 670, 671],
      [672, 673],
      [674, 675],
      [676],
      [677, 678],
      [679, 680, 681],
      [682, 683],
      [684, 685],
      [686, 687],
      [688, 689],
      [690, 691],
      [692, 693],
      [694, 695],
      [696, 697],
      [698, 699],
      [701],
      [702],
      [703],
      [704, 705, 706],
      [707],
      [708, 709],
      [710, 711],
      [712, 713],
      [714, 715],
      [716],
      [717],
      [718],
      [719],
      [720],
      [721],
      [722, 723, 724],
      [725, 726, 727],
      [728, 729, 730],
      [731, 732, 733],
      [734, 735],
      [736, 737, 738],
      [739, 740],
      [741],
      [742, 743],
      [744, 745],
      [746],
      [747, 748],
      [749, 750],
      [751, 752],
      [753, 754],
      [755, 756],
      [757, 758],
      [759, 760],
      [761, 762, 763],
      [764],
      [765],
      [766],
      [767, 768],
      [769, 770],
      [771],
      [772, 773],
      [774],
      [775],
      [776],
      [777],
      [778],
      [779],
      [780],
      [781],
      [782, 783, 784],
      [785],
      [786],
      [787],
      [788],
      [789, 790, 791, 792],
      [793],
      [794],
      [795],
      [796],
      [797],
      [798],
      [799],
      [800],
      [801],
      [802],
      [803, 804],
      [805],
      [806],
      [807],
      [808, 809],
      [810, 811, 812],
      [813, 814, 815],
      [816, 817, 818],
      [819, 820],
      [821, 822, 823],
      [824, 825, 826],
      [827, 828],
      [829, 830],
      [831, 832],
      [833, 834],
      [835, 836],
      [837, 838, 839],
      [840, 841, 842],
      [843, 844],
      [845],
      [846, 847],
      [848, 849],
      [850, 851],
      [852, 853],
      [854, 855],
      [856, 857, 858],
      [859, 860, 861],
      [868, 869],
      [870],
      [871],
      [872],
      [873, 874],
      [875],
      [876],
      [877],
      [878, 879],
      [880],
      [881],
      [882],
      [883],
      [884],
      [885, 886, 887],
      [888],
      [889],
      [890],
      [891, 892],
      [893],
      [894],
      [895],
      [896],
      [897],
      [898],
      [905],
      [906, 907, 908],
      [909, 910, 911],
      [912, 913, 914],
      [915, 916],
      [919, 920],
      [921, 922, 923],
      [924, 925],
      [926, 927],
      [928, 929, 930],
      [935, 936, 937],
      [938, 939],
      [944, 945],
      [957, 958, 959],
      [960, 961],
      [962],
      [965, 966],
      [971, 972],
      [974, 975],
      [978],
      [996, 997, 998],
      [999, 1000],
    ];
  }
}
