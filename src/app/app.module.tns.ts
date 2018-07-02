import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { DexComponent } from "./dex/dex.component";
import { OddsComponent } from "./odds/odds.component";
import { ShinyService } from "./shared/shiny.service";

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptUIListViewModule,
    NativeScriptUISideDrawerModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DexComponent,
    OddsComponent
  ],
  providers: [
    ShinyService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
