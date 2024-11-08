import React, { MouseEvent, useCallback, useRef, DragEvent } from "react";

import { Row as RowInterface } from "../../types.global/types.global";
import { observer } from "mobx-react-lite";
import store from "../../store/store";

import styles from "./Row.module.css";
import { Cells } from "../Cells/Cells";

interface RowProps {
  data: RowInterface;
  index: number;
}

export const Row = observer(({ data, index }: RowProps) => {
  const { chooseRow, chosenRowId, deleteRow, moveRow } = store.tableData;
  const rowRef = useRef<HTMLDivElement | null>(null);

  const onDragStart = (event: DragEvent) => {
    event.stopPropagation();

    event.dataTransfer.setData("text/plain", "" + index);
  };

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    const draggedIndex = event.dataTransfer.getData("text/plain");
    if (+draggedIndex !== index) {
      moveRow(+draggedIndex, index);
    }
  };

  const handleOnDelete = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    store.modalData.showModal({
      message: "Данные будут удалены. Вы уверены?",
      method: deleteRow,
    });
  }, []);

  return (
    <div
      className={`${styles.Row} ${
        data.id === chosenRowId ? styles.ChosenRow : ""
      }`}
      onClick={() => chooseRow(data.id)}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      ref={rowRef}
    >
      <Cells data={data} />
      {chosenRowId === data.id && (
        <button className={styles.DeleteButton} onClick={handleOnDelete}>
          Удалить
        </button>
      )}
    </div>
  );
});

Row.displayName = "Row";
