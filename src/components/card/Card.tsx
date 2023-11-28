import styles from "./Card.module.css";

type CardProps = {
  url: string;
  author: string;
};

export default function Card(props: CardProps) {
  return (
    <>
      <div className={styles.image_box} data-testid="card">
        <img className={styles.img} src={props.url} alt={props.author}></img>
      </div>
      <div className={styles.image_data}>
        <p className={styles.author}>Author: {props.author}</p>
      </div>
    </>
  );
}
