import React, { MouseEvent } from "react";

import { Row as RowInterface } from "../../types.global/types.global";
import { observer } from "mobx-react-lite";
import store from "../../store/store";

import { columns } from "../../constants/constants";

import styles from "./Row.module.css";

interface RowProps {
  data: RowInterface;
}

export const Row = observer(({ data }: RowProps) => {
  const { chooseRow, chosenRowId, deleteRow } = store.tableData;

  const handleOnDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    store.modalData.showModal({
      message: "Данные будут удалены. Вы уверены?",
      method: deleteRow,
    });
  };

  const renderRowCells = () => {
    return columns.map((column, index) => {
      return (
        <div key={index} className={styles.Cell}>
          {data[column.field as keyof RowInterface]}

          <div className={styles.Resizer}></div>
        </div>
      );
    });
  };
  return (
    <div
      className={`${styles.Row} ${
        data.id === chosenRowId ? styles.ChosenRow : ""
      }`}
      onClick={() => chooseRow(data.id)}
    >
      {renderRowCells()}
      {chosenRowId === data.id && (
        <button className={styles.DeleteButton} onClick={handleOnDelete}>
          Удалить
        </button>
      )}
    </div>
  );
});
