import { Component, OnInit } from "@angular/core";

import { ListService } from "./list.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  items: any[];

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.get().subscribe((data: any) => {
      this.items = data;
    });
  }

  itemTapped(item) {
    this.listService.toggleSelected(item);
  }
}
