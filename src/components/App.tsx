import React, { useEffect } from "react";
import { Table } from "./Table/Table";

import { CompanyLogo } from "./Logo/Logo";

import styles from "./App.module.css";
import { useGetData } from "../services/useGetData.service";
import { log } from "console";

function App() {
  // https://jsonplaceholder.typicode.com/comments
  // https://dummyjson.com/docs/auth
  // const { data, isLoading, error } = useGetData();

  // console.log("data :", data);
  // console.log("isLoading :", isLoading);
  // console.log("error :", error);
  // console.log("");

  return (
    <div className={styles.Wrapper}>
      <CompanyLogo />
      <Table />
    </div>
  );
}

export default App;
