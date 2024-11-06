import React, { MouseEvent } from "react";

import { Row as RowInterface } from "../../types.global/types.global";
import { observer } from "mobx-react-lite";
import store from "../../store/store";

import styles from "./Row.module.css";
import { Modal } from "../Modal/Modal";

interface RowProps {
  data: RowInterface;
}

export const Row = observer(({ data }: RowProps) => {
  const { chooseRow, chosenRowId, isModalActive, toggleModal } =
    store.tableData;

  const handleMouseUp = () => {};
  const handleMouseDown = () => {};
  const openModal = () => {};

  const handleOnDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleModal(true);
    openModal();
  };

  const renderRowCells = () => {
    return Object.values(data).map((value, index) => (
      <div key={index} className={styles.Cell}>
        {value}

        <div className={styles.Resizer} onMouseDown={handleMouseDown}></div>
      </div>
    ));
  };
  return (
    <div
      className={`${styles.Row} ${
        data.id === chosenRowId ? styles.ChosenRow : ""
      }`}
      onMouseUp={handleMouseUp}
      onClick={() => chooseRow(data.id)}
    >
      {renderRowCells()}
      {chosenRowId === data.id && (
        <button className={styles.DeleteButton} onClick={handleOnDelete}>
          Удалить
        </button>
      )}
      {isModalActive && <Modal message={"Данные будут удалены. Вы уверены?"} />}
    </div>
  );
});
