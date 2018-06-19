import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { getString, setString } from "tns-core-modules/application-settings";

import { Shiny } from "./shiny.model";

@Injectable()
export class ShinyService {
  public shinies = new Array<Shiny>();

  constructor(private http: HttpClient) { }

  getShinies() {
    return this.http.get("https://baas.kinvey.com/appdata/kid_H1_cK1DWQ/Shinies", { headers: this.getHeaders() })
      .pipe(
        map((data) => {
          let shinies = <Shiny[]>data;
          let ownedArray = this.getOwnedData();

          shinies.forEach((shiny) => {
            let owned = false;
            ownedArray.forEach((ownedId) => {
              if (ownedId == shiny.id) {
                owned = true;
              }
            })
            this.shinies.push(new Shiny(shiny.name, shiny.id, owned));
          });
        })
      );
  }

  toggleShinyOwned(index) {
    this.shinies[index].owned = !this.shinies[index].owned;
    this.save();
  }

  save() {
    let saved = [];
    this.shinies.forEach((shiny) => {
      if (shiny.owned) {
        saved.push(shiny.id);
      }
    });
    setString("owned", JSON.stringify(saved));
  }

  private getOwnedData() {
    let owned = getString("owned");
    let ownedArray = [];

    if (owned) {
      ownedArray = JSON.parse(owned);
    }

    return ownedArray;
  }

  private getHeaders() {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Basic a2lkX0gxX2NLMURXUTozZjExNTVhOGY5ODE0MDBlYTYyMWFkYTczMmViZTFjMQ=="
    });
}
}
