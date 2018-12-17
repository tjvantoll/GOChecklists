import { Routes } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { DexComponent } from "./dex/dex.component";

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "dex", component: DexComponent },
  { path: "lucky", component: DexComponent },
  { path: "shiny", component: DexComponent },
  { path: "unown", component: DexComponent }
];
