import { useEffect, useState } from "react";
import "./Pagination.css";

type PaginationProps = {
  pageNumber: string;
  totalPages: number;
  changeCurrentPage: (value: string) => void;
};

type BackButtonProps = {
  pageNumber: string;
  onClick: () => void;
};

type ForwardButtonProps = {
  pageNumber: string;
  totalPages: number;
  onClick: () => void;
};

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
  pageNumber,
  totalPages,
  changeCurrentPage,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(pageNumber);

  useEffect(() => {
    setCurrentPage(pageNumber);
  }, [pageNumber]);

  const goToFirstPage = () => {
    if (currentPage === "1") return;
    setCurrentPage("1");
    changeCurrentPage("1");
  };

  const goToPrevPage = () => {
    if (currentPage === "1") return;
    const page = (+currentPage - 1).toString();
    setCurrentPage(page);
    changeCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage === totalPages.toString()) return;
    const page = (+currentPage + 1).toString();
    setCurrentPage(page);
    changeCurrentPage(page);
  };

  const goToLastPage = () => {
    if (currentPage === totalPages.toString()) return;
    setCurrentPage(totalPages.toString());
    changeCurrentPage(totalPages.toString());
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
