import { makeAutoObservable } from "mobx";
import { Row } from "../types.global/types.global";
import { dataService } from "../services/data.service";

class ModalStore {
  isActive: boolean = false;
  message: string = "";
  method: (data?: any) => void = () => {};

  constructor() {
    makeAutoObservable(this);
  }

  showModal = (props: { message: string; method: (data?: any) => void }) => {
    this.message = props.message;
    this.method = props.method;
    this.isActive = true;
  };

  confirm = () => {
    this.method();
    this.isActive = false;
  };

  cancel = () => {
    this.isActive = false;
  };
}

class TableDataStore {
  allRows: Row[] = [];
  rows: Row[] = [];
  rowsCount: number = 0;
  error: Error | null = null;
  isLoading: boolean = false;
  page: number = 1;
  itemsPerPage: number = 10;
  chosenRowId: number = -1;
  isModalActive: boolean = false;

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

  loadData = () => {
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
  };

  addRow = (newRow: Row) => {
    this.rows.unshift(newRow);
    this.rows.pop();
    this.allRows.unshift(newRow);
  };

  deleteRow = () => {
    this.rows = this.rows.filter((item) => item.id !== this.chosenRowId);
    this.allRows = this.allRows.filter((item) => item.id !== this.chosenRowId);
    this.isModalActive = false;
  };

  clearRows = () => {
    this.rows = [];
    this.allRows = [];
  };

  sortRows = (field: keyof Row) => {
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
  };

  chooseRow = (rowId: number) => {
    if (rowId === this.chosenRowId) {
      this.chosenRowId = -1;
      return;
    }
    this.chosenRowId = rowId;
  };
}

class RootStore {
  tableData: TableDataStore;
  modalData: ModalStore;

  constructor() {
    this.tableData = new TableDataStore();
    this.modalData = new ModalStore();
  }
}

const store = new RootStore();

export default store;
