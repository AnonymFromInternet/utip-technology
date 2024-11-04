import { makeAutoObservable } from "mobx";
import { Row } from "../types.global/types.global";

// export const useStore = () => {
//   return makeAutoObservable({
//     tableItemsCount: 0,
//     tableItems: [],
//     addRow: (newRow: Row) => {
//       this.tableData.push(newRow);
//     },
//     deleteRow: (rowId: Number) => {
//       this.tableItems = this.tableItems.filter(
//         (item: Row) => item.id !== rowId
//       );
//     },
//   });
// };

class GlobalStore {
  rows: Row[] = [];
  rowsCount: Number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setRows(responseData: Row[]) {
    this.rows = responseData;
  }

  addRow(newRow: Row) {
    this.rows.push(newRow);
  }

  deleteRow(rowId: Number) {
    this.rows = this.rows.filter((item) => item.id !== rowId);
  }
}
const Store = new GlobalStore();

export default Store;
