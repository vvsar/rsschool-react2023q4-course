import { useEffect, useState } from "react";
import "./Pagination.css";

type PaginationProps = {
  pageNumber: string;
  totalPages: number;
};

function FirstPageButton({ pageNumber }: { pageNumber: string }) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (pageNumber === "1") {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [pageNumber]);
  return <button className={`button active-${isActive}`}>{"<<"}</button>;
}

function PrevPageButton({ pageNumber }: { pageNumber: string }) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (pageNumber === "1") {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [pageNumber]);
  return <button className={`button active-${isActive}`}>{"<"}</button>;
}

function NextPageButton({ pageNumber, totalPages }: PaginationProps) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (+pageNumber === totalPages) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [pageNumber]);
  return <button className={`button active-${isActive}`}>{">"}</button>;
}

function LastPageButton({ pageNumber, totalPages }: PaginationProps) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (+pageNumber === totalPages) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [pageNumber]);
  return <button className={`button active-${isActive}`}>{">>"}</button>;
}

export default function Pagination({
  pageNumber,
  totalPages,
}: PaginationProps) {
  return totalPages === 0 ? null : (
    <div className="pagination">
      <FirstPageButton pageNumber={pageNumber} />
      <PrevPageButton pageNumber={pageNumber} />
      <p className="page-info">{`PAGE ${pageNumber} OF ${totalPages}`}</p>
      <NextPageButton pageNumber={pageNumber} totalPages={totalPages} />
      <LastPageButton pageNumber={pageNumber} totalPages={totalPages} />
    </div>
  );
}
