import styles from "./404.module.css";

export default function Page404() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.page_title}>
          <span>FIND IMAGES ON</span>
        </div>
        <h2 className={styles.h2}>PAGE NOT FOUND!</h2>
      </header>
    </>
  );
}
