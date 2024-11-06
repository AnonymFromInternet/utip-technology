import store from "../../store/store";
import styles from "./EmptyTableMessage.module.css";

export const EmptyTableMessage = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Message}>
        В настоящий момент в таблице нет данных
      </div>
      <button
        className={styles.GetDataButton}
        onClick={store.tableData.loadData}
      >
        Загрузить данные
      </button>
    </div>
  );
};
