import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Pokemon } from "./pokemon.model";
import { PokemonHelper } from "./pokemon-helper";

const BASE_URL = "https://baas.kinvey.com/appdata/kid_H1_cK1DWQ";

@Injectable()
export class PokemonService {
  public shinies = new Array<Pokemon>();
  public luckies = new Array<Pokemon>();

  helper = new PokemonHelper();

  constructor(private http: HttpClient) {}

  getShinies() {
    this.shinies = [];
    return this.get(
      "/Shinies",
      this.shinies,
      this.parseOwnedData(this.helper.readShinies())
    );
  }
  getLuckies() {
    this.luckies = [];
    return this.get(
      "/Luckies",
      this.luckies,
      this.parseOwnedData(this.helper.readLuckies())
    );
  }

  private get(endpoint: string, destinationArray: Array<Pokemon>, ownedMons: Array<Number>) {
    return this.http.get(BASE_URL + endpoint, {
      headers: this.getHeaders(), params: { "sort": "id" }
    })
    .pipe(
      map((data) => {
        let shinies = <Pokemon[]>data;

        shinies.forEach((mon) => {
          let owned = false;
          ownedMons.forEach((ownedId) => {
            if (ownedId === Number(mon.id)) {
              owned = true;
            }
          })
          destinationArray.push(new Pokemon(mon.name, mon.id, owned));
        });
      })
    );
  }

  toggleShinyOwned(index) {
    this.shinies[index].owned = !this.shinies[index].owned;
    this.helper.saveShinies(this.buildOwnedArray(this.shinies));
  }
  toggleLuckyOwned(index) {
    this.luckies[index].owned = !this.luckies[index].owned;
    this.helper.saveLuckies(this.buildOwnedArray(this.luckies));
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
    this.shinies.forEach((shiny) => {
      if (shiny.owned) {
        saved.push(shiny.id);
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

