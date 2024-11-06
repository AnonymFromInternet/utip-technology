import styles from "./AddNewRow.module.css";
import { Row } from "../../types.global/types.global";
import store from "../../store/store";
import { useNavigate } from "react-router-dom";
import { sleep } from "../../services/sleep.service";
import { useForm } from "./hooks/useForm";

export const AddNewRow = () => {
  const { addRow } = store.tableData;
  const navigate = useNavigate();

  const {
    postId,
    setPostId,
    id,
    setId,
    name,
    setName,
    email,
    setEmail,
    body,
    setBody,
    isMessageVisible,
    setIsMessageVisible,
  } = useForm();

  const validateFields = (): boolean => {
    const fields = [postId, id, name, email, body];

    if (fields.some((item) => item.trim() === "")) {
      return true;
    }

    if (isNaN(+postId) || isNaN(+id)) {
      return true;
    }

    return false;
  };

  const onBackToTable = () => {
    navigate("/utip-technology");
  };

  const onAddNewRow = async () => {
    const newRow: Row = {
      id: +id,
      postId: +postId,
      name,
      body,
      email,
    };
    addRow(newRow);
    setIsMessageVisible(true);

    await sleep(1500);

    setIsMessageVisible(false);

    navigate("/utip-technology");
  };

  return (
    <>
      <div className={styles.Wrapper}>
        <input
          type="text"
          className={styles.Input}
          value={postId}
          onChange={(event) => setPostId(event.currentTarget.value)}
        />
        <input
          type="text"
          name=""
          id=""
          className={styles.Input}
          value={id}
          onChange={(event) => setId(event.currentTarget.value)}
        />
        <input
          type="text"
          className={styles.Input}
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
        <input
          type="text"
          className={styles.Input}
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <input
          type="text"
          className={styles.Input}
          value={body}
          onChange={(event) => setBody(event.currentTarget.value)}
        />
      </div>

      <div className={styles.ButtonWrapper}>
        <button className={styles.BackToTheTableButton} onClick={onBackToTable}>
          Назад к таблице
        </button>
        <button
          className={styles.SaveButton}
          onClick={onAddNewRow}
          disabled={validateFields()}
        >
          Добавить новые данные в таблицу
        </button>
      </div>

      <div
        className={`${styles.Message} ${
          isMessageVisible && styles.MessageVisible
        }`}
      >
        Данные успешно сохранены
      </div>
    </>
  );
};
