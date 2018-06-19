import { Component, OnInit } from "@angular/core";
import * as SocialShare from "nativescript-social-share";
import { isIOS } from "tns-core-modules/platform";
import { alert } from "tns-core-modules/ui/dialogs";
import { topmost } from "tns-core-modules/ui/frame";

import { Shiny } from "./shiny.model";
import { ShinyService } from "./shiny.service";

declare var UIBarStyle: any;

@Component({
  selector: "ns-home",
  moduleId: module.id,
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  loaded = false;
  shinies: Shiny[];
  ownedCount;
  percentOwned;

  constructor(private shinyService: ShinyService) { }

  ngOnInit(): void {
    if (isIOS) {
      let navigationBar = topmost().ios.controller.navigationBar;
      navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }

    this.shinyService.getShinies().subscribe(
      () => {
        this.shinies = this.shinyService.shinies;
        this.determineOwnedCounts();
        this.loaded = true;
      },
      () => {
        alert({
          title: "ShinyDex",
          message: "Could not retrieve a list of shinies from the server. Check your network connection.",
          okButtonText: "OK"
        });
      });
  }

  determineOwnedCounts() {
    let owned = 0;
    this.shinies.forEach((shiny) => {
      if (shiny.owned) { owned++; }
    });
    this.ownedCount = owned;

    let percent = Math.round((owned / this.shinies.length) * 100);
    this.percentOwned = percent + "*," + (100 - percent) + "*";
  }

  toggleShinyOwned(args) {
    this.shinyService.toggleShinyOwned(args.index);
    this.determineOwnedCounts();
  }

  share() {
    let message = "My ShinyDex status: " + this.ownedCount + " / " + this.shinies.length + "\n\n" + "My shinies: ";
    let ownedShinies = [];

    this.shinies.forEach((shiny) => {
      if (shiny.owned) {
        ownedShinies.push(shiny.name);
      }
    });
    message += ownedShinies.join(", ");

    SocialShare.shareText(message, "My ShinyDex");
  }
}
