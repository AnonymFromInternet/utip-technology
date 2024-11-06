import styles from "./Modal.module.css";
import store from "../../store/store";
import { observer } from "mobx-react-lite";
import { MouseEvent, MouseEventHandler } from "react";

interface ModalProps {
  message: string;
  messageColor?: string;
  backgroundColor?: string;
}

export const Modal = observer(({ message }: ModalProps) => {
  const { deleteRow, toggleModal } = store.tableData;
  const onDeleteRow = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteRow();
  };
  const onCancelDelete = (
    event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    toggleModal(false);
  };
  return (
    <div className={styles.Modal} onClick={(event) => onCancelDelete(event)}>
      <div
        className={styles.ModalContent}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <p className={styles.Message}>{message}</p>
        <div className={styles.ButtonsWrapper}>
          <button onClick={onDeleteRow} className={styles.DeleteButton}>
            Да, удалить!
          </button>
          <button
            onClick={onCancelDelete}
            className={styles.CancelDeleteButton}
          >
            Отменить удаление
          </button>
        </div>
      </div>
    </div>
  );
});
