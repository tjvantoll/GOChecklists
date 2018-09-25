import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { ListModule } from "./list/list.module";

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    ListModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
