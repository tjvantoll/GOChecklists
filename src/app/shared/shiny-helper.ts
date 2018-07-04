export class ShinyHelper {
  read(): string {
    return localStorage.getItem("shinies");
  }

  save(saved) {
    localStorage.setItem("shinies", JSON.stringify(saved));
  }
}