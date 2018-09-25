import { Routes } from "@angular/router";

import { ListComponent } from "./list.component";
import { ListService } from "./list.service";

export const COMPONENT_DECLARATIONS: any[] = [
  ListComponent
];

export const PROVIDERS_DECLARATIONS: any[] = [
  ListService
];

export const ROUTES: Routes = [
  { path: "list", component: ListComponent },
];