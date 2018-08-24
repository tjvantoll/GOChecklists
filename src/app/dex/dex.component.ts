import { Component, OnInit } from "@angular/core";

import { Shiny } from "../shared/shiny.model";
import { ShinyService } from "../shared/shiny.service";
import { DexHelper } from "./dex-helper";

@Component({
  selector: "ns-dex",
  moduleId: module.id,
  styleUrls: ["./dex.component.css"],
  templateUrl: "./dex.component.html"
})
export class DexComponent implements OnInit {
  isAndroid;
  loaded = false;
  shinies: Shiny[] = [];

  ownedCount;
  percentOwned;
  progressbarColor;

  sharing = false;
  shareStatus = true;
  shareOwned = false;
  shareUnowned = false;

  constructor(
    private shinyService: ShinyService
  ) {}

  ngOnInit(): void {
    this.isAndroid = !DexHelper.isIOS();

    this.shinyService.getShinies().subscribe(
      () => {
        this.shinies = this.shinyService.shinies;
        this.determineOwnedCounts();
        this.loaded = true;
      },
      () => {
        DexHelper.showError("Could not retrieve a list of shinies from the server. Check your network connection.");
      });
  }

  determineOwnedCounts() {
    let owned = 0;
    this.shinies.forEach((shiny) => {
      if (shiny.owned) { owned++; }
    });
    this.ownedCount = owned;

    let percent = Math.round((owned / this.shinies.length) * 100);
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
    let index = this.shinies.indexOf(shiny);
    this.shinyService.toggleShinyOwned(index);
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
      message += "My ShinyDex status: " + this.ownedCount + " / " + this.shinies.length;
    }

    if (this.shareOwned) {
      let ownedShinies = [];
      this.shinies.forEach((shiny) => {
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
      this.shinies.forEach((shiny) => {
        if (!shiny.owned) {
          unownedShinies.push(shiny.name);
        }
      });
      if (this.shareStatus || this.shareOwned) {
        message += "\n\n";
      }
      message += ("I need: " + unownedShinies.join(", "));
    }

    DexHelper.shareText(message);
    this.cancelShare();
  }

  cancelShare() {
    this.sharing = false;
  }
}
