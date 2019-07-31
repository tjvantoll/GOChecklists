import { alert } from "tns-core-modules/ui/dialogs";
import { isIOS } from "tns-core-modules/platform";

export class DexHelper {
  static isIOS() {
    return isIOS;
  }

  static showError(message) {
    alert({
      title: "GOChecklists",
      message: message,
      okButtonText: "OK"
    });
  }

  static readSortOrder(mode) {
    return "";
  }

  static writeSortOrder(mode, sortOrder) {
    
  }

  static toggleDialogDisplay(isDialogOpen: boolean) {

  }
}
