import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable()
export class UtilityService {
  constructor(private titleService: Title) {}

  setPageTitle(title: string) {
    this.titleService.setTitle("GOChecklists: " + title);
  }
}

