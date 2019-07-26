import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Pokemon } from "./pokemon.model";
import { PokemonHelper } from "./pokemon-helper";

const BASE_URL = "https://baas.kinvey.com/appdata/kid_H1_cK1DWQ";

@Injectable()
export class PokemonService {
  private dex = new Array<Pokemon>();
  private shinies = new Array<Pokemon>();
  private luckies = new Array<Pokemon>();
  private unown = new Array<Pokemon>();
  private shadows = new Array<Pokemon>();

  helper = new PokemonHelper();

  static FEMALE_SPRITE_LIST = [3, 12, 19, 20, 25, 26, 41, 42, 44, 45, 64, 65, 84, 85, 97, 111, 112, 118, 119, 123, 129, 130, 154, 165, 166, 178, 185, 186, 190, 194, 195, 198, 202, 203, 207, 208, 212, 214, 215, 217, 221, 224, 229, 232, 256, 257, 267, 269, 272, 274, 275, 307, 308, 315, 316, 317, 322, 323, 332, 350, 369, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 407, 415, 417, 424, 443, 444, 445, 449, 450, 453, 454, 456, 457, 459, 460, 461, 464, 465, 473];

  constructor(private http: HttpClient) {}

  getDex() {
    return this.getPokemon(this.parseOwnedData(this.helper.readDex()))
      .then(data => {
        for (let i = data.length - 1; i >= 0; i--) {
          if (!data[i].available) {
            data.splice(i, 1);
          }
        }

        this.dex = data;
        return this.dex;
      });
  }

  getShinies() {
    return this.getPokemon(this.parseOwnedData(this.helper.readShinies()))
      .then(data => {
        for (let i = data.length - 1; i >= 0; i--) {
          if (data[i].shinyAvailable === false) {
            data.splice(i, 1);
          }
        }

        this.shinies = data;
        return this.shinies;
      });
  }

  getLuckies() {
    return this.getPokemon(this.parseOwnedData(this.helper.readLuckies()))
      .then(data => {
        for (let i = data.length - 1; i >= 0; i--) {
          if (data[i].tradable === false || data[i].available === false) {
            data.splice(i, 1);
          }
        }

        this.luckies = data;
        return this.luckies;
      });
  }

  getUnown() : any {
    return new Promise((resolve, reject) => {
      this.unown = [];
      let unownValues = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!?";
      let ownedUnowns = this.parseOwnedData(this.helper.readUnown());

      for (let i = 0; i < unownValues.length; i++) {
        let owned = false;
        ownedUnowns.forEach((mon) => {
          if (mon == unownValues.charAt(i)) {
            owned = true;
          }
        })
        
        this.unown.push(new Pokemon(unownValues.charAt(i), "201", owned));
      }

      resolve(this.unown);
    })
  }

  getShadows() {
    return this.getPokemon(this.parseOwnedData(this.helper.readShadows()))
      .then(data => {
        for (let i = data.length - 1; i >= 0; i--) {
          if (data[i].shadow === false) {
            data.splice(i, 1);
          }
        }

        this.shadows = data;
        return this.shadows;
      });
  }

  private getPokemon(ownedMons: Array<Number>) {
    return this.http.get(BASE_URL + "/Pokemon", {
      headers: this.getHeaders(),
      params: { "sort": "id" }
    })
    .toPromise()
    .then(data => {
      let mons = <Pokemon[]> data;
      let returnData = <Pokemon[]> [];

      mons.forEach((mon) => {
        let owned = false;
        ownedMons.forEach((ownedId) => {
          if (ownedId === Number(mon.id)) {
            owned = true;
          }
        })
        returnData.push(
          new Pokemon(
            mon.name,
            mon.id,
            owned,
            mon.available,
            mon.shinyAvailable,
            mon.tradable,
            mon.gender,
            mon.shadow
          )
        );
      });

      return returnData;
    })
  }

  toggleDexOwned(index) {
    this.dex[index].owned = !this.dex[index].owned;
    this.helper.saveDex(this.buildOwnedArray(this.dex));
  }
  toggleShinyOwned(index) {
    this.shinies[index].owned = !this.shinies[index].owned;
    this.helper.saveShinies(this.buildOwnedArray(this.shinies));
  }
  toggleLuckyOwned(index) {
    this.luckies[index].owned = !this.luckies[index].owned;
    this.helper.saveLuckies(this.buildOwnedArray(this.luckies));
  }
  toggleUnownOwned(index) {
    this.unown[index].owned = !this.unown[index].owned;
    let saved = [];
    this.unown.forEach((mon) => {
      if (mon.owned) {
        saved.push(mon.name);
      }
    });
    this.helper.saveUnown(saved);
  }
  toggleShadowOwned(index) {
    this.shadows[index].owned = !this.shadows[index].owned;
    this.helper.saveShadows(this.buildOwnedArray(this.shadows));
  }

  private parseOwnedData(rawData: string) {
    let ownedArray = [];
    if (rawData) {
      ownedArray = JSON.parse(rawData);
    }
    return ownedArray;
  }

  private buildOwnedArray(sourceArray: Array<Pokemon>) {
    let saved = [];
    sourceArray.forEach((mon) => {
      if (mon.owned) {
        saved.push(mon.id);
      }
    });

    return saved;
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json",
      "Authorization": "Basic a2lkX0gxX2NLMURXUTozZjExNTVhOGY5ODE0MDBlYTYyMWFkYTczMmViZTFjMQ=="
    };
  }
}

