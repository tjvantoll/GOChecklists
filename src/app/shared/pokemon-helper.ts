export class PokemonHelper {
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

  private read(key: string) {
    return localStorage.getItem(key);
  }
  private save(key: string, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}