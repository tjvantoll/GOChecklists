import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { OddsComponent } from "./odds/odds.component";

const routes: Routes = [
  { path: "", redirectTo: "/odds", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "odds", component: OddsComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
