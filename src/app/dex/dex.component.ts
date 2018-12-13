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
  isAndroid;
  imagePath;
  routePath;
  pageTitle;

  loaded = false;
  mons: Pokemon[] = [];

  ownedCount;
  percentOwned;
  progressbarColor;

  sharing = false;
  shareStatus = true;
  shareOwned = false;
  shareUnowned = false;
  shareMessage;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {
    this.route.url.subscribe(params => {
      this.routePath = params[0].path;
    });
  }

  ngOnInit(): void {
    this.isAndroid = !DexHelper.isIOS();
    this.imagePath = "~/app/images/" + (this.isAndroid ? "sprites" : "sprites-black") + "/";
    this.pageTitle = this.isShinyMode() ? "ShinyDex" : "LuckyDex";

    var success = () => {
      this.mons = this.isShinyMode() ? this.pokemonService.shinies : this.pokemonService.luckies;
      this.determineOwnedCounts();
      this.loaded = true;
    };
    var failure = () => {
      DexHelper.showError("Could not retrieve a list of shinies from the server. Check your network connection.");
    }

    if (this.isShinyMode()) {
      this.pokemonService.getShinies().subscribe(success, failure);
    } else {
      this.pokemonService.getLuckies().subscribe(success, failure);
    }
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
    let index = this.mons.indexOf(shiny);
    
    if (this.isShinyMode()) {
      this.pokemonService.toggleShinyOwned(index);
    } else {
      this.pokemonService.toggleLuckyOwned(index);
    }

    this.determineOwnedCounts();
  }

  toggleMenu() {
    DexHelper.toggleMenu();
  }

  share() {
    this.sharing = !this.sharing;
  }

  confirmShare() {
    let message = "";
    
    if (this.shareStatus) {
      message += "I have " + this.ownedCount + " / " + this.mons.length + " shinies.";
    }

    if (this.shareOwned) {
      let ownedShinies = [];
      this.mons.forEach((shiny) => {
        if (shiny.owned) {
          ownedShinies.push(shiny.name);
        }
      });
      if (this.shareStatus) {
        message += "\n\n";
      }
      message += ("My shinies: " + ownedShinies.join(", "));
    }

    if (this.shareUnowned) {
      let unownedShinies = [];
      this.mons.forEach((shiny) => {
        if (!shiny.owned) {
          unownedShinies.push(shiny.name);
        }
      });
      if (this.shareStatus || this.shareOwned) {
        message += "\n\n";
      }
      message += ("I need: " + unownedShinies.join(", "));
    }

    this.shareMessage = message;
    DexHelper.shareText(message);
    this.cancelShare();
  }

  cancelShare() {
    this.sharing = false;
  }

  private isShinyMode() {
    return this.routePath == "shiny";
  }
}
