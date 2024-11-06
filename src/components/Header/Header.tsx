import React from "react";

import styles from "./Header.module.css";
import store from "../../store/store";
import { Row } from "../../types.global/types.global";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { columns } from "../../constants/constants";

export const Header = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const { sortRows, rows, clearRows } = store.tableData;
  const { showModal } = store.modalData;

  const onClearRows = () => {
    showModal({
      message: "Все данные будут удалены из таблицы. Вы уверены?",
      method: clearRows,
    });
  };

  const renderCells = () => {
    return columns.map((column, index) => (
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
          <button
            className={styles.ClearTableButton}
            onClick={onClearRows}
            disabled={location.pathname.includes("addNewRow")}
          >
            Очистить таблицу
          </button>
        )}

        <button
          className={styles.AddNewRowButton}
          onClick={() => navigate("/addNewRow")}
          disabled={location.pathname.includes("addNewRow")}
        >
          Добавить данные в таблицу
        </button>
      </div>

      <div className={styles.Header}>{renderCells()}</div>
    </>
  );
});
