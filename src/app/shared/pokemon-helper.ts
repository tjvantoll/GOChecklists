export class PokemonHelper {
  readDex(): string {
    return this.read("dex");
  }
  saveDex(saved) {
    this.save("dex", saved);
  }
  readShinies(): string {
    return this.read("shinies");
  }
  saveShinies(saved) {
    this.save("shinies", saved);
  }
  readLuckies(): string {
    return this.read("luckies");
  }
  saveLuckies(saved) {
    this.save("luckies", saved);
  }
  readUnown(): string {
    return this.read("unown");
  }
  saveUnown(saved) {
    this.save("unown", saved);
  }

  private read(key: string) {
    return localStorage.getItem(key);
  }
  private save(key: string, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}