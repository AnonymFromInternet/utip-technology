import { columns } from "../../constants/constants";
import { Row } from "../../types.global/types.global";

import styles from "./Cells.module.css";

interface CellsProps {
  data: Row;
}

export const Cells = ({ data }: CellsProps) => {
  return (
    <>
      {columns.map((column, index) => {
        return (
          <div key={"cell" + index} className={styles.Cell}>
            {data[column.field as keyof Row]}
          </div>
        );
      })}
    </>
  );
};
