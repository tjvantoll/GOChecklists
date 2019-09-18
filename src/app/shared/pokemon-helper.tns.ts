import { knownFolders, File } from "tns-core-modules/file-system";

export class PokemonHelper {
  dexSaveFile: File;
  shinySaveFile: File;
  luckySaveFile: File;
  unownSaveFile: File;
  shadowSaveFile: File;

  constructor() {
    this.dexSaveFile = knownFolders.documents().getFile("dex.json");
    this.shinySaveFile = knownFolders.documents().getFile("shinies.json");
    this.luckySaveFile = knownFolders.documents().getFile("luckies.json");
    this.unownSaveFile = knownFolders.documents().getFile("unown.json");
    this.shadowSaveFile = knownFolders.documents().getFile("shadows.json");
  }

  readDex(): string {
    return this.read(this.dexSaveFile);
  }
  saveDex(saved) {
    this.save(this.dexSaveFile, saved);
  }
  readShinies(): string {
    return this.read(this.shinySaveFile);
  }
  saveShinies(saved) {
    this.save(this.shinySaveFile, saved);
  }
  readLuckies(): string {
    return this.read(this.luckySaveFile);
  }
  saveLuckies(saved) {
    this.save(this.luckySaveFile, saved);
  }
  readUnown(): string {
    return this.read(this.unownSaveFile);
  }
  saveUnown(saved) {
    this.save(this.unownSaveFile, saved);
  }
  readShadows(): string {
    return this.read(this.shadowSaveFile);
  }
  saveShadows(saved) {
    this.save(this.shadowSaveFile, saved);
  }

  private read(file: File) {
    return file.readTextSync();
  }
  private save(file: File, data) {
    return file.writeText(JSON.stringify(data));
  }
}