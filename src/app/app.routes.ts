import { Routes } from '@angular/router';

import { DexComponent } from "./dex/dex.component";

export const ROUTES: Routes = [
  { path: "", redirectTo: "/shiny", pathMatch: "full" },
  { path: "lucky", component: DexComponent },
  { path: "shiny", component: DexComponent }
];
