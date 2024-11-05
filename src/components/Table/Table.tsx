import { observer } from "mobx-react-lite";
import styles from "./Table.module.css";
import store from "../../store/store";
import { Key, useEffect } from "react";
import { Row } from "../Row/Row";
import { EmptyTableMessage } from "../EmptyTableMessage/EmptyTableMessage";
import { Loader } from "../Loader/Loader";
import { dataService } from "../../services/data.service";

export const Table = observer(() => {
  const { rows, isLoading, allRows } = store.tableData;

  useEffect(() => {
    const handleBeforeUnload = (event: Event) => {
      dataService.saveDataToLocalStorage(allRows);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [allRows]);

  const renderRows = () => {
    return rows.map((row) => <Row key={row.id as Key} data={row}></Row>);
  };
  return (
    <div className={styles.Table}>
      {isLoading && <Loader />}
      {rows.length === 0 && !isLoading ? <EmptyTableMessage /> : renderRows()}
    </div>
  );
});
