import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule, Title } from "@angular/platform-browser";

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { DexComponent } from "./dex/dex.component";
import { HomeComponent } from "./home/home.component";
import { PokemonService } from "./shared/pokemon.service";
import { UtilityService } from "./shared/utility.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DexComponent,
    HomeComponent
  ],
  providers: [
    PokemonService,
    Title,
    UtilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
