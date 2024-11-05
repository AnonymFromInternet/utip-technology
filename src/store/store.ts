import { makeAutoObservable } from "mobx";
import { Row } from "../types.global/types.global";
import { dataService } from "../services/getData.service";

class TableDataStore {
  rows: Row[] = [];
  rowsCount: Number = 0;
  error: Error | null = null;
  isLoading: Boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadData() {
    this.isLoading = true;

    dataService
      .getData()
      .then((response) => response.json())
      .then((jsoned) => (this.rows = jsoned))
      .catch((e) => (this.error = e))
      .finally(() => (this.isLoading = false));
  }

  addRow(newRow: Row) {
    this.rows.push(newRow);
  }

  deleteRow(rowId: Number) {
    this.rows = this.rows.filter((item) => item.id !== rowId);
  }
}

class RootStore {
  tableData: TableDataStore;

  constructor() {
    this.tableData = new TableDataStore();
  }
}

const store = new RootStore();

export default store;
