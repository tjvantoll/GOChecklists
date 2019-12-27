import DexModes from "./DexModes";

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
      // id sort
      if (sortOrder === 1) {
        return idBasedSort(a, b);
      }

      // Name sort
      if (sortOrder === 2) {
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
}
