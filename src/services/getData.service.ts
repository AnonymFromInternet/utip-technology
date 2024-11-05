class DataService {
  getData() {
    return fetch("https://jsonplaceholder.typicode.com/comments");
  }
}

export const dataService = new DataService();
