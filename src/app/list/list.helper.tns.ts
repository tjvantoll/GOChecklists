import { knownFolders, File } from "tns-core-modules/file-system";

export class ListHelper {
  saveFile: File;

  constructor() {
    this.saveFile = knownFolders.documents().getFile("items.json");
  }

  readItems() {
    const items = this.saveFile.readTextSync();
    return items ? JSON.parse(items) : [];
  }

  writeItems(items) {
    this.saveFile.writeText(JSON.stringify(items));
  }
}
