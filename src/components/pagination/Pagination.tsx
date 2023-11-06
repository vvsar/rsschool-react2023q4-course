import "./Pagination.css";

type PaginationProps = {
  pageNumber: number;
  totalPages: number;
};

export default function Pagination({
  pageNumber,
  totalPages,
}: PaginationProps) {
  return totalPages === 0 ? null : (
    <div className="pagination">
      <button className="button inactive">{"<<"}</button>
      <button className="button inactive">{"<"}</button>
      <p className="page-info">{`PAGE ${pageNumber} OF ${totalPages}`}</p>
      <button className="button inactive">{">"}</button>
      <button className="button inactive">{">>"}</button>
    </div>
  );
}
