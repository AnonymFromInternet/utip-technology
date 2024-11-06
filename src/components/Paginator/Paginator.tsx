import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { useLocation } from "react-router-dom";

import styles from "./Paginator.module.css";

export const Paginator = observer(() => {
  const location = useLocation();
  const { rowsCount, itemsPerPage, page, setPage } = store.tableData;
  const pageCount = Math.ceil(rowsCount / itemsPerPage);

  if (location.pathname.includes("addNewRow")) {
    return null;
  }

  return (
    <div className={styles.Paginator}>
      {[...Array(pageCount > 15 ? 15 : pageCount)].map((_, index) => {
        return (
          <button
            key={index}
            className={page === index + 1 ? styles.ActivePage : ""}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
});
