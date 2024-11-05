import React from "react";

import styles from "./Row.module.css";
import { Row as RowInterface } from "../../types.global/types.global";

interface RowProps {
  data: RowInterface;
}

export const Row = ({ data }: RowProps) => {
  const handleMouseUp = () => {};
  const handleMouseDown = () => {};

  const renderRowCells = () => {
    return Object.values(data).map((value, index) => (
      <div key={index} className={styles.Cell}>
        {value}

        <div className={styles.Resizer} onMouseDown={handleMouseDown}></div>
      </div>
    ));
  };
  return (
    <div className={styles.Row} onMouseUp={handleMouseUp}>
      {renderRowCells()}
    </div>
  );
};
