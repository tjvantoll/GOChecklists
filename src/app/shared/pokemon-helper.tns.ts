import { knownFolders, File } from "tns-core-modules/file-system";

export class PokemonHelper {
  shinySaveFile: File;
  luckySaveFile: File;

  constructor() {
    this.shinySaveFile = knownFolders.documents().getFile("shinies.json");
    this.luckySaveFile = knownFolders.documents().getFile("luckies.json");
  }

  readShinies(): string {
    return this.shinySaveFile.readTextSync();
  }
  readLuckies(): string {
    return this.luckySaveFile.readTextSync();
  }

  saveShinies(saved) {
    this.shinySaveFile.writeText(JSON.stringify(saved));
  }
  saveLuckies(saved) {
    this.luckySaveFile.writeText(JSON.stringify(saved));
  }
}