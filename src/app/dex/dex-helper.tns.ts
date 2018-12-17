import * as SocialShare from "nativescript-social-share";
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

  static shareText(message) {
    SocialShare.shareText(message, "My ShinyDex");
  }
}
