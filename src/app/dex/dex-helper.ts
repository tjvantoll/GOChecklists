export class DexHelper {
  static isIOS() {
    return false;
  }

  static showError(message) {
    alert(message);
  }

  static readSortOrder(mode) {
    return localStorage.getItem(mode);
  }

  static writeSortOrder(mode, sortOrder) {
    return localStorage.setItem(mode, sortOrder);
  }

  static toggleDialogDisplay(isDialogOpen: boolean) {
    document.body.style.overflow = isDialogOpen ? "hidden" : "auto";
  }

  static getImagePathPrefix() {
    return "/app/images/";
  }
}
