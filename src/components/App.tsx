import React from "react";
import { Table } from "./Table/Table";
import { CompanyLogo } from "./Logo/Logo";
import { Header } from "./Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddNewRow } from "./AddNewRow/AddNewRow";
import { Paginator } from "./Paginator/Paginator";
import { observer } from "mobx-react-lite";

import styles from "./App.module.css";

const App = observer(() => {
  return (
    <div className={styles.Wrapper}>
      <CompanyLogo />

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Table />}></Route>
          <Route path="addNewRow" element={<AddNewRow />}></Route>
        </Routes>
        <Paginator />
      </BrowserRouter>
    </div>
  );
});

export default App;
