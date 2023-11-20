import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/store";
import { saveCurrentPageValue } from "../../redux/searchDataSlice";
import type {
  PaginationProps,
  BackButtonProps,
  ForwardButtonProps,
} from "../../types/types";
import "./Pagination.css";

function FirstPageButton({ pageNumber, onClick }: BackButtonProps) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (pageNumber === "1") {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [pageNumber]);
  return (
    <button className={`button active-${isActive}`} onClick={onClick}>
      {"<<"}
    </button>
  );
}

function PrevPageButton({ pageNumber, onClick }: BackButtonProps) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (pageNumber === "1") {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [pageNumber]);
  return (
    <button className={`button active-${isActive}`} onClick={onClick}>
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
  useEffect(() => {
    if (+pageNumber === totalPages) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [pageNumber]);
  return (
    <button className={`button active-${isActive}`} onClick={onClick}>
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
  useEffect(() => {
    if (+pageNumber === totalPages) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [pageNumber]);
  return (
    <button className={`button active-${isActive}`} onClick={onClick}>
      {">>"}
    </button>
  );
}

export default function Pagination({
  totalPages,
  changeCurrentPage,
}: PaginationProps) {
  const searchData = useSelector((state: AppState) => state.searchData);
  const pageNumber = searchData.currentPage;
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentPage(pageNumber);
  }, [pageNumber]);

  const goToFirstPage = () => {
    if (currentPage === "1") return;
    dispatch(saveCurrentPageValue("1"));
    localStorage.setItem("currentPage", "1");
    setCurrentPage("1");
    changeCurrentPage("1");
  };

  const goToPrevPage = () => {
    if (currentPage === "1") return;
    const page = (+currentPage - 1).toString();
    dispatch(saveCurrentPageValue(page));
    localStorage.setItem("currentPage", page);
    setCurrentPage(page);
    changeCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage === totalPages.toString()) return;
    const page = (+currentPage + 1).toString();
    dispatch(saveCurrentPageValue(page));
    localStorage.setItem("currentPage", page);
    setCurrentPage(page);
    changeCurrentPage(page);
  };

  const goToLastPage = () => {
    if (currentPage === totalPages.toString()) return;
    const page = totalPages.toString();
    dispatch(saveCurrentPageValue(page));
    localStorage.setItem("currentPage", page);
    setCurrentPage(page);
    changeCurrentPage(page);
  };

  return totalPages === 0 ? null : (
    <div className="pagination">
      <FirstPageButton pageNumber={pageNumber} onClick={goToFirstPage} />
      <PrevPageButton pageNumber={pageNumber} onClick={goToPrevPage} />
      <p className="page-info">{`PAGE ${pageNumber} OF ${totalPages}`}</p>
      <NextPageButton
        pageNumber={pageNumber}
        totalPages={totalPages}
        onClick={goToNextPage}
      />
      <LastPageButton
        pageNumber={pageNumber}
        totalPages={totalPages}
        onClick={goToLastPage}
      />
    </div>
  );
}
