import React, { useEffect } from "react";
import { Table } from "./Table/Table";

import { CompanyLogo } from "./Logo/Logo";

import store from "../store/store";
import { Header } from "./Header/Header";

import styles from "./App.module.css";

function App() {
  useEffect(() => {
    store.tableData.loadData();
  }, []);

  return (
    <div className={styles.Wrapper}>
      <CompanyLogo />
      <Header />
      <Table />
    </div>
  );
}

export default App;
