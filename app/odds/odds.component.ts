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

  constructor() {}

  ngOnInit(): void {
    this.isAndroid = !isIOS;
  }

  toggleMenu() {
    const sideDrawer = <RadSideDrawer>getRootView();
    sideDrawer.toggleDrawerState();
  }
}
