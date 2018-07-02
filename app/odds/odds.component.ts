import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application";
import { isIOS, screen } from "tns-core-modules/platform";

@Component({
  selector: "ns-odds",
  moduleId: module.id,
  styleUrls: ["./odds.component.css"],
  templateUrl: "./odds.component.html"
})
export class OddsComponent implements OnInit {
  isAndroid;
  encounters: string;
  result0: string;
  result1: string;
  result2: string;

  constructor() {}

  ngOnInit(): void {
    this.isAndroid = !isIOS;
  }

  calculate() {
    if (!this.encounters) {
      alert({
        title: "ShinyDex",
        message: "Please input a number of encounters.",
        okButtonText: "Ok"
      });
    }

    let numberOfEncounters = parseInt(this.encounters, 10);

    if (Number.isNaN(numberOfEncounters)) {
      alert({
        title: "ShinyDex",
        message: "Please input a valid number.",
        okButtonText: "Ok"
      });
    }

    const zeroOdds = (Math.pow((449 / 450), numberOfEncounters) * 100).toPrecision(4);

    this.result0 = "Odds of seeing 0 shinies: " + zeroOdds + "%";
    this.result1 = "Odds of seeing 1 or more shiny: " + (100 - parseFloat(zeroOdds)).toPrecision(4) + "%";
    this.result2 = "Odds of seeing 2 or more shinies: MATH IS HARD";

  }

  toggleMenu() {
    const sideDrawer = <RadSideDrawer>getRootView();
    sideDrawer.toggleDrawerState();
  }
}
