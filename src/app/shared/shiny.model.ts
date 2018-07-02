export class Shiny {
  constructor(
    public name: string,
    public id: string,
    public owned: boolean = false
  ) {}

  getImage() {
    return "~/app/images/sprites/" + this.id + ".png";
  }
}
