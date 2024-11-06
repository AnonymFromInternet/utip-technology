import React from "react";
import { Table } from "./Table/Table";

import { CompanyLogo } from "./Logo/Logo";

import { Header } from "./Header/Header";

import styles from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddNewRow } from "./AddNewRow/AddNewRow";

function App() {
  return (
    <div className={styles.Wrapper}>
      <CompanyLogo />
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />}></Route>
          <Route path="addNewRow" element={<AddNewRow />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
