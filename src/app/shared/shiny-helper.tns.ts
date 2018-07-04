import { knownFolders, File } from "tns-core-modules/file-system";

export class ShinyHelper {
  saveFile: File;

  constructor() {
    this.saveFile = this.saveFile = knownFolders.documents().getFile("shinies.json");
  }

  read(): string {
    return this.saveFile.readTextSync();
  }

  save(saved) {
    this.saveFile.writeText(JSON.stringify(saved));
  }
}