export class Pokemon {
  constructor(
    public name: string,
    public id: string,
    public owned: boolean = false,
    public available: boolean = true,
    public shinyAvailable: boolean = false,
    public tradable = true
  ) {}
}
