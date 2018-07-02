import * as SocialShare from "nativescript-social-share";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application";
import { isIOS, screen } from "tns-core-modules/platform";
import { alert } from "tns-core-modules/ui/dialogs";
import { topmost } from "tns-core-modules/ui/frame";

export class DexHelper {
  static isIOS() {
    return isIOS;
  }

  static handleStatusBar() {
    if (isIOS) {
      let height = screen.mainScreen.heightPixels;
      let width = screen.mainScreen.widthPixels;
      if ((height == 2436 && width == 1125) || (height == 1125 && width == 2436)) {
        topmost().page.addCss(".page { margin-bottom: -30; }");
      }
    }
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
