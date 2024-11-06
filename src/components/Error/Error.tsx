import styles from "./Error.module.css";

interface ErrorProps {
  message?: string;
}

export const Error = (props: ErrorProps) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Message}>{props.message}</div>
    </div>
  );
};
