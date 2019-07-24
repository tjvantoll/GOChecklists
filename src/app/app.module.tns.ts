import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { DexComponent } from "./dex/dex.component";
import { HomeComponent } from "./home/home.component";
import { PokemonService } from "./shared/pokemon.service";

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptUIListViewModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DexComponent,
    HomeComponent
  ],
  providers: [
    PokemonService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
