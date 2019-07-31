import { Component, OnInit } from "@angular/core";

import { UtilityService } from "../shared/utility.service";

@Component({
  selector: "ns-home",
  moduleId: module.id,
  styleUrls: ["./home.component.css"],
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  constructor(private utilityService: UtilityService) {}

  ngOnInit(): void {
    this.utilityService.setPageTitle("Up-to-date checklists for Pokémon GO");
  }
}
