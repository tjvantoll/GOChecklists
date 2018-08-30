let theNavigator: any;

export class DexHelper {
  static isIOS() {
    return false;
  }

  static showError(message) {
    alert(message);
  }

  static toggleMenu() {}

  static shareText(message) {
    theNavigator = window.navigator;
    if (theNavigator && theNavigator.share) {
      theNavigator.share({
        title: "ShinyDex",
        text: message
      });
    } else {
      // This magic happens via ClipboardJS in index.html
      alert("Copied to clipboard");
    }
  }
}
