import store from "../../store/store";
import styles from "./EmptyTableMessage.module.css";

export const EmptyTableMessage = () => {
  const loadData = () => {
    store.tableData.loadData();
  };
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Message}>
        В настоящий момент в таблице нет данных
      </div>
      <button className={styles.GetDataButton} onClick={loadData}>
        Загрузить данные
      </button>
    </div>
  );
};
