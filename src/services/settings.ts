export default class SettingsService {
  readSortOrder(pageMode: string): string | null {
    if (typeof localStorage === "undefined") return null;
    return localStorage.getItem(this.getSortOrderKey(pageMode));
  }
  writeSortOrder(sortOrder: string, pageMode: string): void {
    localStorage.setItem(this.getSortOrderKey(pageMode), sortOrder);
  }

  getSortOrderKey(pageMode: string): string {
    return `sortOrder-${pageMode}`;
  }
}
