import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { DataItem, ResultsPageProps } from "../../types/types";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import styles from "./Results.module.css";

export default function Results(props: ResultsPageProps) {
  const router = useRouter();
  const [cardsData, setCardsData] = useState([] as DataItem[]);

  const onCardClick = (id: string) => {
    if (router.pathname.includes("details")) {
      return;
    }
    const pairs = Object.entries(router.query);
    const parts = pairs.map((item) => `${item[0]}=${item[1]}`);
    const queryParams = "?" + parts.join("&");
    router.push(`${props.pageType}/details/${id}/${queryParams}`);
  };

  const closeDetails = () => {
    if (!router.pathname.includes("details")) {
      return;
    }
    router.back();
  };

  useEffect(() => {
    setCardsData(props.data);
  }, [props.data]);

  return (
    <div className={styles.results} data-testid="results">
      {props.pageType === "random" ? (
        <p className={styles.random_photos}>RANDOM PHOTOS</p>
      ) : (
        <Pagination
          totalPages={props.totalPagesNumber}
          currentPage={props.currentPage}
          changeCurrentPage={props.onPageChange}
        />
      )}
      <div className={styles.results_field}>
        {cardsData.length > 0 ? (
          <div className={styles.cards_container} onClick={closeDetails}>
            {cardsData.map((item) => (
              <div
                className={styles.card}
                key={item.id}
                onClick={() => onCardClick(item.id)}
              >
                <Card url={item.urls.small} author={item.user.name} />
              </div>
            ))}
          </div>
        ) : (
          <p>Sorry, but nothing was found.</p>
        )}
      </div>
    </div>
  );
}
