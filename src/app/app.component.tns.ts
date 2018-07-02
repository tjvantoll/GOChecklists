import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application";

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html",
})
export class AppComponent {
  constructor(private router: Router, private routerExtensions: RouterExtensions) {}

  navigate(route) {
    this.routerExtensions.navigate([route]);

    const sideDrawer = <RadSideDrawer>getRootView();
    sideDrawer.closeDrawer();
  }
}
