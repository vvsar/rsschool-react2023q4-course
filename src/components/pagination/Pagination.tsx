import { useEffect, useState } from "react";
import type {
  PaginationProps,
  BackButtonProps,
  ForwardButtonProps,
} from "../../types/types";
import styles from "./Pagination.module.css";

function FirstPageButton({ pageNumber, onClick }: BackButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const isActiveButtonStyle = `active_${isActive}`;
  useEffect(() => {
    if (pageNumber === "1") {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [pageNumber]);
  return (
    <button
      className={`${styles.button} ${styles[isActiveButtonStyle]}`}
      onClick={onClick}
    >
      {"<<"}
    </button>
  );
}

function PrevPageButton({ pageNumber, onClick }: BackButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const isActiveButtonStyle = `active_${isActive}`;
  useEffect(() => {
    if (pageNumber === "1") {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [pageNumber]);
  return (
    <button
      className={`${styles.button} ${styles[isActiveButtonStyle]}`}
      onClick={onClick}
    >
      {"<"}
    </button>
  );
}

function NextPageButton({
  pageNumber,
  totalPages,
  onClick,
}: ForwardButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const isActiveButtonStyle = `active_${isActive}`;
  useEffect(() => {
    if (+pageNumber === totalPages) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [pageNumber]);
  return (
    <button
      className={`${styles.button} ${styles[isActiveButtonStyle]}`}
      onClick={onClick}
    >
      {">"}
    </button>
  );
}

function LastPageButton({
  pageNumber,
  totalPages,
  onClick,
}: ForwardButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const isActiveButtonStyle = `active_${isActive}`;
  useEffect(() => {
    if (+pageNumber === totalPages) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [pageNumber]);
  return (
    <button
      className={`${styles.button} ${styles[isActiveButtonStyle]}`}
      onClick={onClick}
    >
      {">>"}
    </button>
  );
}

export default function Pagination(props: PaginationProps) {
  const pageNumber = props.currentPage;
  const [currentPage, setCurrentPage] = useState(pageNumber);

  useEffect(() => {
    setCurrentPage(pageNumber);
  }, [pageNumber]);

  const goToFirstPage = () => {
    if (currentPage === "1") return;
    props.changeCurrentPage("1");
  };

  const goToPrevPage = () => {
    if (currentPage === "1") return;
    const page = (+currentPage - 1).toString();
    props.changeCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage === props.totalPages.toString()) return;
    const page = (+currentPage + 1).toString();
    props.changeCurrentPage(page);
  };

  const goToLastPage = () => {
    if (currentPage === props.totalPages.toString()) return;
    const page = props.totalPages.toString();
    props.changeCurrentPage(page);
  };

  return props.totalPages === 0 ? null : (
    <div className={styles.pagination}>
      <FirstPageButton pageNumber={props.currentPage} onClick={goToFirstPage} />
      <PrevPageButton pageNumber={props.currentPage} onClick={goToPrevPage} />
      <p
        className={styles.page_info}
      >{`PAGE ${currentPage} OF ${props.totalPages}`}</p>
      <NextPageButton
        pageNumber={pageNumber}
        totalPages={props.totalPages}
        onClick={goToNextPage}
      />
      <LastPageButton
        pageNumber={pageNumber}
        totalPages={props.totalPages}
        onClick={goToLastPage}
      />
    </div>
  );
}
