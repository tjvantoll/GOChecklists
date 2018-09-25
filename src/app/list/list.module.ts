import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { ROUTES, COMPONENT_DECLARATIONS, PROVIDERS_DECLARATIONS } from './list.common';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS
  ],
  providers: [
    ...PROVIDERS_DECLARATIONS
  ]
})
export class ListModule { }
