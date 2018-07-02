import { Routes } from '@angular/router';

import { DexComponent } from "./dex/dex.component";
import { OddsComponent } from "./odds/odds.component";

export const ROUTES: Routes = [
  { path: "", redirectTo: "/dex", pathMatch: "full" },
  { path: "dex", component: DexComponent },
  { path: "odds", component: OddsComponent }
];
