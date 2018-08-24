import * as SocialShare from "nativescript-social-share";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application";
import { isIOS } from "tns-core-modules/platform";
import { alert } from "tns-core-modules/ui/dialogs";

export class DexHelper {
  static isIOS() {
    return isIOS;
  }

  static showError(message) {
    alert({
      title: "ShinyDex",
      message: message,
      okButtonText: "OK"
    });
  }

  static toggleMenu() {
    const sideDrawer = <RadSideDrawer>getRootView();
    sideDrawer.toggleDrawerState();
  }

  static shareText(message) {
    SocialShare.shareText(message, "My ShinyDex");
  }
}
