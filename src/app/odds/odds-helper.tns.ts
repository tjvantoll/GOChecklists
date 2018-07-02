import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application";

export class OddsHelper {
  static toggleMenu() {
    const sideDrawer = <RadSideDrawer>getRootView();
    sideDrawer.toggleDrawerState();
  }
}