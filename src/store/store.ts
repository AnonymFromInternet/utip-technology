import { makeAutoObservable } from "mobx";
import { Row } from "../types.global/types.global";
import { dataService } from "../services/data.service";

class TableDataStore {
  allRows: Row[] = [];
  rows: Row[] = [];
  rowsCount: number = 0;
  error: Error | null = null;
  isLoading: boolean = false;
  page: number = 1;
  itemsPerPage: number = 10;

  isFieldSorted: Record<string, boolean> = {
    postId: true,
    id: true,
    name: true,
    email: true,
    body: true,
  };

  constructor() {
    makeAutoObservable(this);

    const savedAllRows = dataService.getDataFromLocalstorage();
    if (savedAllRows.length > 0) {
      this.allRows = savedAllRows;
      for (let index = 0; index < this.itemsPerPage; index++) {
        this.rows[index] = savedAllRows[index];
      }
    }
  }

  loadData() {
    this.isLoading = true;
    const savedAllRows = dataService.getDataFromLocalstorage();
    if (savedAllRows.length > 0) {
      this.allRows = savedAllRows;
      for (let index = 0; index < this.itemsPerPage; index++) {
        this.rows[index] = savedAllRows[index];
      }

      this.isLoading = false;
      return;
    }

    dataService
      .getData()
      .then((response) => response.json())
      .then((jsoned) => {
        this.allRows = jsoned;
        this.rowsCount = jsoned.length;
        return jsoned;
      })
      .then((allRows) => {
        for (let index = 0; index < this.itemsPerPage; index++) {
          this.rows[index] = allRows[index];
        }
      })
      .catch((e) => (this.error = e))
      .finally(() => (this.isLoading = false));
  }

  addRow(newRow: Row) {
    this.rows.push(newRow);
  }

  deleteRow(rowId: number) {
    this.rows = this.rows.filter((item) => item.id !== rowId);
  }

  clearRows() {
    this.rows = [];
    this.allRows = [];
  }

  sortRows(field: keyof Row) {
    const ascending = this.isFieldSorted[field];

    this.rows.sort((a, b) => {
      if (a[field] < b[field]) {
        return ascending ? -1 : 1;
      }

      if (a[field] > b[field]) {
        return ascending ? 1 : -1;
      }

      return 0;
    });

    this.isFieldSorted[field] = !this.isFieldSorted[field];
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
