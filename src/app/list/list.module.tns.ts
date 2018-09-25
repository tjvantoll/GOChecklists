import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ROUTES, COMPONENT_DECLARATIONS, PROVIDERS_DECLARATIONS } from "./list.common";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptHttpClientModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(ROUTES)
  ],
  exports: [
    NativeScriptRouterModule
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS
  ],
  providers: [
    ...PROVIDERS_DECLARATIONS
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ListModule { }
