export default class SettingsService {
  readSortOrder(pageMode) {
    return localStorage.getItem(this.getSortOrderKey(pageMode));
  }
  writeSortOrder(sortOrder, pageMode) {
    localStorage.setItem(this.getSortOrderKey(pageMode), sortOrder);
  }

  getSortOrderKey(pageMode) {
    return `sortOrder-${pageMode}`;
  }
}
