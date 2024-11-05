import React from "react";

import styles from "./Header.module.css";

const headerColumns = ["PostId", "Id", "Name", "Email", "Body"];

export const Header = () => {
  const renderCells = () => {
    return headerColumns.map((column, index) => (
      <div key={index} className={styles.Header_Cell}>
        {column}
      </div>
    ));
  };
  return <div className={styles.Header}>{renderCells()}</div>;
};
