import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Pokemon } from "../shared/pokemon.model";
import { PokemonService } from "../shared/pokemon.service";
import { DexHelper } from "./dex-helper";
import { UtilityService } from "../shared/utility.service";

@Component({
  selector: "ns-dex",
  moduleId: module.id,
  styleUrls: ["./dex.component.css"],
  templateUrl: "./dex.component.html"
})
export class DexComponent implements OnInit {
  pageMode;
  isAndroid = !DexHelper.isIOS();
  loaded = false;
  dialogOpen = false;
  mons: Pokemon[] = [];

  ownedCount;
  percentOwned;
  progressbarColor;

  sortOrder;
  listGenders;

  constructor(
    private pokemonService: PokemonService,
    private utilityService: UtilityService,
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
        case DexModes.SHADOW:
          this.pageMode = DexModes.SHADOW;
          break;
      }

      this.utilityService.setPageTitle(DexModes.getPageTitle(this.pageMode));
    });
  }

  ngOnInit(): void {
    this.sortOrder = DexHelper.readSortOrder(this.getSortOrderName()) || DexModes.getDefaultSortOrder(this.pageMode);
    // this.listGenders = localStorage.getItem(this.getListGendersName()) || "no";
    this.listGenders = "no";

    switch (this.pageMode) {
      case DexModes.DEX:
        this.pokemonService.getDex().then(data => { this.processList(data) }).catch(this.handleError);
        break;
      case DexModes.SHINY:
        this.pokemonService.getShinies().then(data => { this.processList(data) }).catch(this.handleError);
        break;
      case DexModes.LUCKY:
        this.pokemonService.getLuckies().then(data => { this.processList(data) }).catch(this.handleError);
        break;
      case DexModes.UNOWN:
        this.pokemonService.getUnown().then(data => { this.processList(data) }).catch(this.handleError);
        break;
      case DexModes.SHADOW:
        this.pokemonService.getShadows().then(data => { this.processList(data) }).catch(this.handleError);
    }
  }

  private processList(data: Pokemon[]) {
    this.mons = data;
    this.sort();
    // This is buggy when gender mode is turned off and needs more testing.
    // this.genderHandling();
    this.determineOwnedCounts();
    this.loaded = true;
  }
  private handleError() {
    DexHelper.showError("Could not retrieve a list of shinies from the server. Check your network connection.");
  }

  sort() {
    const idBasedSort = (a: Pokemon, b: Pokemon) => {
      return parseInt(a.id, 10) > parseInt(b.id, 10) ? 1: -1;
    }
    
    DexHelper.writeSortOrder(this.getSortOrderName(), this.sortOrder);

    this.mons = this.mons.sort((a: Pokemon, b: Pokemon) => {
      // id sort
      if (this.sortOrder == 1) {
        return idBasedSort(a, b);
      }

      // Name sort
      if (this.sortOrder == 2) {
        return a.name > b.name ? 1: -1;
      }

      // Checked sort
      if ((a.owned && b.owned) || (!a.owned && !b.owned)) {
        // Sort Unowns by name
        if (this.pageMode == DexModes.UNOWN) {
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

  /*
  genderHandling() {
    const finalList = [];
    this.mons.forEach((mon) => {
      if (mon.gender == "both" && this.listGenders == "yes") {
        var male = Object.assign({}, mon);
        var female = Object.assign({}, mon);
        male.gender = "male";
        female.gender = "female";
        finalList.push(male);
        finalList.push(female);
        return;
      }

      finalList.push(mon);
    });

    this.mons = finalList;
  }
  genderChange() {
    localStorage.setItem(this.getListGendersName(), this.listGenders);
    this.processList(this.mons);
  }
  */

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
      case DexModes.SHADOW:
        this.pokemonService.toggleShadowOwned(index);
    }

    this.determineOwnedCounts();
    setTimeout(() => { this.sort() }, 100);
  }

  getPageTitle() {
    return DexModes.getPageTitle(this.pageMode);
  }

  getImagePath(mon: Pokemon) {
    var intId = parseInt(mon.id);

    let femaleSpriteExists = PokemonService.FEMALE_SPRITE_LIST.includes(intId);
    let femalePath = (femaleSpriteExists && mon.gender == "female") ? "female/" : "";

    if (this.pageMode == DexModes.UNOWN) {
      return DexModes.getImagePath(this.pageMode) + mon.id + "-" + mon.name.toLowerCase() + ".png";
    }
    return DexModes.getImagePath(this.pageMode) + femalePath + mon.id + ".png";
  }

  toggleDialog() {
    this.dialogOpen = !this.dialogOpen;
    DexHelper.toggleDialogDisplay(this.dialogOpen);
  }

  private getSortOrderName() {
    return "sortOrder-" + this.pageMode;
  }
  private getListGendersName() {
    return "listGendersName-" + this.pageMode;
  }
  private getGenderIcon(mon) {
    if (mon.gender == "female") {
      return "♀";
    }
    if (mon.gender == "male") {
      return "♂";
    }
    return "";
  }
}

class DexModes {
  static DEX = "dex";
  static SHINY = "shiny";
  static LUCKY = "lucky";
  static UNOWN = "unown";
  static SHADOW = "shadow";

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
      case DexModes.SHADOW:
        return "ShadowDex";
    }
  }

  static getDefaultSortOrder(mode) {
    return mode == DexModes.UNOWN ? 2 : 1;
  }
}
