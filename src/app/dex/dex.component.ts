import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Pokemon } from "../shared/pokemon.model";
import { PokemonService } from "../shared/pokemon.service";
import { DexHelper } from "./dex-helper";

@Component({
  selector: "ns-dex",
  moduleId: module.id,
  styleUrls: ["./dex.component.css"],
  templateUrl: "./dex.component.html"
})
export class DexComponent implements OnInit {
  pageMode;
  loaded = false;
  dialogOpen = false;
  mons: Pokemon[] = [];

  ownedCount;
  percentOwned;
  progressbarColor;

  sortOrder;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {
    this.route.url.subscribe(params => {
      let routePath = params[0].path;
      switch (routePath) {
        case DexModes.DEX:
          this.pageMode = DexModes.DEX;
          break;
        case DexModes.SHINY:
          this.pageMode = DexModes.SHINY;
          break;
        case DexModes.LUCKY:
          this.pageMode = DexModes.LUCKY;
          break;
        case DexModes.UNOWN:
          this.pageMode = DexModes.UNOWN;
          break;
      }
    });
  }

  ngOnInit(): void {
    this.sortOrder = localStorage.getItem(this.getSortOrderName()) || DexModes.getDefaultSortOrder(this.pageMode);
    var success = (data: Pokemon[]) => {
      this.mons = data;
      this.sort();
      this.determineOwnedCounts();
      this.loaded = true;
    };
    var failure = () => {
      DexHelper.showError("Could not retrieve a list of shinies from the server. Check your network connection.");
    }

    switch (this.pageMode) {
      case DexModes.DEX:
        this.pokemonService.getDex().then(success).catch(failure);
        break;
      case DexModes.SHINY:
        this.pokemonService.getShinies().then(success).catch(failure);
        break;
      case DexModes.LUCKY:
        this.pokemonService.getLuckies().then(success).catch(failure);
        break;
      case DexModes.UNOWN:
        this.pokemonService.getUnown().then(success).catch(failure);
        break;
    }
  }

  sort() {
    const idBasedSort = (a: Pokemon, b: Pokemon) => {
      return parseInt(a.id, 10) > parseInt(b.id, 10) ? 1: -1;
    }
    localStorage.setItem(this.getSortOrderName(), this.sortOrder);
    this.mons = this.mons.sort((a: Pokemon, b: Pokemon) => {
      if (this.sortOrder == 1) {
        return idBasedSort(a, b);
      }
      if (this.sortOrder == 2) {
        return a.name > b.name ? 1: -1;
      }

      if ((a.owned && b.owned) || (!a.owned && !b.owned)) {
        return idBasedSort(a, b);
      }
      if (a.owned && !b.owned) {
        return 1;
      }
      return -1;
    });
  }

  determineOwnedCounts() {
    let owned = 0;
    this.mons.forEach((shiny) => {
      if (shiny.owned) { owned++; }
    });
    this.ownedCount = owned;

    let percent = Math.round((owned / this.mons.length) * 100);
    this.percentOwned = percent;

    this.progressbarColor = (percent <= 6) ? "#FB041E" :
      (percent > 6 && percent <= 12) ? "#FD2222" :
      (percent > 12 && percent <= 18) ? "#FC4926" :
      (percent > 18 && percent <= 24) ? "#FC6628" :
      (percent > 24 && percent <= 30) ? "#FE882A" :
      (percent > 30 && percent <= 36) ? "#FFA52E" :
      (percent > 36 && percent <= 42) ? "#FEC230" :
      (percent > 42 && percent <= 48) ? "#FFDE34" :
      (percent > 48 && percent <= 54) ? "#F4DE2B" :
      (percent > 54 && percent <= 60) ? "#E7DD25" :
      (percent > 60 && percent <= 66) ? "#DBDD1C" :
      (percent > 66 && percent <= 72) ? "#CEDC18" :
      (percent > 72 && percent <= 78) ? "#C3DC0E" :
      (percent > 78 && percent <= 84) ? "#B6DC07" :
      (percent > 84 && percent <= 90) ? "#A9DC03" : "#9ADA00";
  }

  toggleShinyOwned(shiny) {
    if (this.dialogOpen) {
      return;
    }

    let index = this.mons.indexOf(shiny);

    switch (this.pageMode) {
      case DexModes.DEX:
        this.pokemonService.toggleDexOwned(index);
        break;
      case DexModes.SHINY:
        this.pokemonService.toggleShinyOwned(index);
        break;
      case DexModes.LUCKY:
        this.pokemonService.toggleLuckyOwned(index);
        break;
      case DexModes.UNOWN:
        this.pokemonService.toggleUnownOwned(index);
        break;
    }

    this.determineOwnedCounts();
    setTimeout(() => { this.sort() }, 100);
  }

  getPageTitle() {
    return DexModes.getPageTitle(this.pageMode);
  }

  getImagePath(mon: Pokemon) {
    if (this.pageMode == DexModes.UNOWN) {
      return DexModes.getImagePath(this.pageMode) + mon.id + "-" + mon.name.toLowerCase() + ".png";
    }
    return DexModes.getImagePath(this.pageMode) + mon.id + ".png";
  }

  toggleDialog() {
    this.dialogOpen = !this.dialogOpen;
    document.body.style.overflow = this.dialogOpen ? "hidden" : "auto";
  }

  getSortOrderName() {
    return "sortOrder-" + this.pageMode;
  }
}

class DexModes {
  static DEX = "dex";
  static SHINY = "shiny";
  static LUCKY = "lucky";
  static UNOWN = "unown";

  static getImagePath(mode) {
    return "/app/images/" +
      ((mode == DexModes.SHINY) ? "shiny-sprites" : "sprites") + "/";
  }

  static getPageTitle(mode) {
    switch (mode) {
      case DexModes.DEX:
        return "Dex";
      case DexModes.SHINY:
        return "ShinyDex";
      case DexModes.LUCKY:
        return "LuckyDex";
      case DexModes.UNOWN:
        return "UnownDex";
    }
  }

  static getDefaultSortOrder(mode) {
    return mode == DexModes.UNOWN ? 2 : 1;
  }
}
