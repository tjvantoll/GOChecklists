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
      // Copy to clipboard
      var textarea = document.createElement("textarea");
      textarea.innerHTML = message;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.parentNode.removeChild(textarea);
      alert("Text copied to clipboard");
    }
  }
}
