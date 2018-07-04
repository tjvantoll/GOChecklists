import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { OddsComponent } from "./odds/odds.component";
import { DexComponent } from "./dex/dex.component";
import { ShinyService } from "./shared/shiny.service";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    OddsComponent,
    DexComponent
  ],
  providers: [
    ShinyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
