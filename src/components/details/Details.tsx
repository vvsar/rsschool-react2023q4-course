import { useRouter } from "next/router";
import type { DataItemExtended } from "../../types/types";
import styles from "./Details.module.css";

export default function Details(props: {
  pageType: string;
  details: DataItemExtended;
}) {
  const router = useRouter();

  const closeDetails = () => {
    router.back();
  };

  return (
    <div className={styles.details_wrapper}>
      {props.details.id ? (
        <div className={styles.details} data-testid="details">
          <div className={styles.photo_box}>
            <img
              className={styles.img}
              data-testid="img"
              src={props.details.urls.regular}
              alt={props.details.alt_description}
            ></img>
          </div>
          <div className={styles.image_data}>
            <p className={styles.text} data-testid="author">
              Author: {props.details.user.name}
            </p>
            {props.details.description ? null : (
              <p className={styles.text} data-testid="description">
                {props.details.description}
              </p>
            )}
            <p className={styles.text} data-testid="camera">
              Camera: {props.details.exif.name}
            </p>
          </div>
          <button className={styles.close_button} onClick={closeDetails}>
            CLOSE PANEL
          </button>
        </div>
      ) : (
        <p>Error!</p>
      )}
    </div>
  );
}
