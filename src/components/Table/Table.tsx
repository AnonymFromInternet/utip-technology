import { observer } from "mobx-react-lite";
import styles from "./Table.module.css";
import store from "../../store/store";
import { Key } from "react";
import { Row } from "../Row/Row";

export const Table = observer(() => {
  const renderRows = () => {
    return store.tableData.rows.map((row) => (
      <Row key={row.id as Key} data={row}></Row>
    ));
  };
  return <div className={styles.Table}>{renderRows()}</div>;
});
