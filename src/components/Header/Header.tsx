import React from "react";

import styles from "./Header.module.css";
import store from "../../store/store";
import { Row } from "../../types.global/types.global";
import { observer } from "mobx-react-lite";

const headerColumns = [
  { name: "PostId", field: "postId" },
  { name: "Id", field: "id" },
  { name: "Name", field: "name" },
  { name: "Email", field: "email" },
  { name: "Body", field: "body" },
];

export const Header = observer(() => {
  const { sortRows, rows, clearRows } = store.tableData;
  const { showModal } = store.modalData;

  const onClearRows = () => {
    showModal({
      message: "Все данные будут удалены из таблицы. Вы уверены?",
      method: clearRows,
    });
  };

  const addNewRow = () => {
    // redirect into /addNewRow page
  };

  const renderCells = () => {
    return headerColumns.map((column, index) => (
      <div
        key={index}
        className={styles.HeaderCell}
        onClick={() => sortRows(column.field as keyof Row)}
      >
        {column.name}
      </div>
    ));
  };
  return (
    <>
      <div className={styles.Buttons}>
        {rows.length !== 0 && (
          <button className={styles.ClearTableButton} onClick={onClearRows}>
            Очистить таблицу
          </button>
        )}

        <button className={styles.AddNewRowButton} onClick={addNewRow}>
          Добавить данные в таблицу
        </button>
      </div>

      <div className={styles.Header}>{renderCells()}</div>
    </>
  );
});
