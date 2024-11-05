import { Row } from "../types.global/types.global";

class DataService {
  getData() {
    return fetch("https://jsonplaceholder.typicode.com/comments");
  }

  getDataFromLocalstorage(): Row[] {
    try {
      const allRows = localStorage.getItem("allRows");
      if (allRows !== null) {
        return JSON.parse(allRows);
      }
      return [];
    } catch (error) {
      throw new Error("cannot get all rows from localstorage");
    }
  }

  saveDataToLocalStorage(allRows: Row[]) {
    try {
      localStorage.setItem("allRows", JSON.stringify(allRows));
    } catch (error) {
      throw new Error("cannot save all rows into localstorage");
    }
  }
}

export const dataService = new DataService();
