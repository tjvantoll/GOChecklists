import { Component, OnInit } from "@angular/core";
import * as SocialShare from "nativescript-social-share";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application";
import { isIOS, screen } from "tns-core-modules/platform";
import { alert } from "tns-core-modules/ui/dialogs";
import { topmost } from "tns-core-modules/ui/frame";
import { Page } from "tns-core-modules/ui/page";

import { Shiny } from "../shared/shiny.model";
import { ShinyService } from "../shared/shiny.service";

declare var UIBarStyle: any;

@Component({
  selector: "ns-home",
  moduleId: module.id,
  styleUrls: ["./home.component.css"],
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  isAndroid;
  loaded = false;
  shinies: Shiny[];
  ownedCount;
  percentOwned;
  progressbarColor;

  constructor(private page: Page, private shinyService: ShinyService) { }

  ngOnInit(): void {
    this.isAndroid = !isIOS;
    if (isIOS) {
      let navigationBar = topmost().ios.controller.navigationBar;
      navigationBar.barStyle = UIBarStyle.UIBarStyleDefault;

      let height = screen.mainScreen.heightPixels;
      let width = screen.mainScreen.widthPixels;
      if ((height == 2436 && width == 1125) || (height == 1125 && width == 2436)) {
        this.page.addCss(".page { margin-bottom: -30; }");
      }
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

  toggleShinyOwned(args) {
    this.shinyService.toggleShinyOwned(args.index);
    this.determineOwnedCounts();
  }

  toggleMenu() {
    const sideDrawer = <RadSideDrawer>getRootView();
    sideDrawer.toggleDrawerState();
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