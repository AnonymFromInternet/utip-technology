import store from "../../store/store";
import { observer } from "mobx-react-lite";
import { MouseEvent } from "react";

import styles from "./Modal.module.css";

export const Modal = observer(() => {
  const { confirm, cancel, isActive, message } = store.modalData;

  const onConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    confirm();
  };

  const onCancel = (
    event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    cancel();
  };

  return (
    <div
      className={`${styles.Modal} ${isActive && styles.ModalActive}`}
      onClick={(event) => onCancel(event)}
    >
      <div
        className={styles.ModalContent}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <p className={styles.Message}>{message}</p>
        <div className={styles.ButtonsWrapper}>
          <button onClick={onConfirm} className={styles.DeleteButton}>
            Да, удалить!
          </button>
          <button onClick={onCancel} className={styles.CancelDeleteButton}>
            Отменить удаление
          </button>
        </div>
      </div>
    </div>
  );
});
