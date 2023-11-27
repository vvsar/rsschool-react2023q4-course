import { useState, useEffect } from "react";
import type { DataItem, ResultsPageProps } from "../../types/types";
// import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import styles from "./Results.module.css";

export default function Results(props: ResultsPageProps) {
  const [cardsData, setCardsData] = useState([] as DataItem[]);

  // const transformedData = data
  //   ? Array.isArray(data)
  //     ? data
  //     : data.results
  //   : ([] as DataItem[]);

  // const total = props.data
  //   ? !Array.isArray(props.data)
  //     ? props.data.total < 120
  //       ? data.total
  //       : 120
  //     : 0
  //   : 0;

  // const totalNumber = Math.ceil(total / +searchData.perPage);

  // const onCardClick = (id: string) => {

  // };

  // const closeDetails = () => {

  // };

  // const onCardsContainerClick = () => {
  //   if (!detailsData.isOpen) return;
  //   closeDetails();
  // };

  useEffect(() => {
    setCardsData(props.data);
  }, [props.data]);

  // if (isError) {
  //   return <p>Sorry, there is an error...</p>;
  // }

  return (
    <div className={styles.results} data-testid="results">
      {props.pageType === "random" ? (
        <p className={styles.random_photos}>RANDOM PHOTOS</p>
      ) : (
        <p>Pagination is to be here</p>
        // <Pagination
        //   totalPages={props.totalNumber}
        //   changeCurrentPage={() => {
        //     return;
        //   }}
        // />
      )}
      <div className={styles.results_field}>
        {cardsData.length > 0 ? (
          <div
            className={styles.cards_container}
            // onClick={onCardsContainerClick}
          >
            {cardsData.map((item) => (
              <div
                className={styles.card}
                key={item.id}
                // onClick={() => onCardClick(item.id)}
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
