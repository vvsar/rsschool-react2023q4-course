import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";
// import { useSearchParams } from "react-router-dom";
import type { DataItem } from "../../types/types";
import {
  useGetRandomPageQuery,
  useGetResultsPageQuery,
} from "../../redux/services/photosApi";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import { useNavigate } from "react-router-dom";
import "./Results.css";

export default function Results() {
  const [currentPage, setCurrentPage] = useState("1");
  // const [, setSearchParams] = useSearchParams();
  const [cardToOpenId, setCardToOpenId] = useState("");
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const searchData = useSelector((state: AppState) => state.searchData);

  const fetchResults = () => {
    if (!searchData.keyWord) {
      return useGetRandomPageQuery(searchData.perPage);
    } else {
      return useGetResultsPageQuery({
        keyWord: searchData.keyWord,
        perPage: searchData.perPage,
        currentPage: currentPage,
      });
    }
  };

  const { data, isError, isLoading } = fetchResults();

  const transformedData = data
    ? Array.isArray(data)
      ? data
      : data.results
    : ([] as DataItem[]);

  const total = data
    ? !Array.isArray(data)
      ? data.total < 120
        ? data.total
        : 120
      : 0
    : 0;

  const totalNumber = Math.ceil(total / +searchData.perPage);

  const onCardClick = (id: string) => {
    if (cardToOpenId) return;
    setCardToOpenId(id);
    let url: string;
    if (!searchData.keyWord) {
      url = `details/${id}/?page=random&per_page=${searchData.perPage}`;
    } else {
      url = `details/${id}/?search=${searchData.keyWord}&page=${currentPage}&per_page=${searchData.perPage}`;
    }
    navigate(url);
  };

  const closeDetails = () => {
    setCardToOpenId("");
    let urlAddition: string;
    if (!searchData.keyWord) {
      urlAddition = `?page=random&per_page=${searchData.perPage}`;
    } else {
      urlAddition = `?search=${searchData.keyWord}&page=${currentPage}&per_page=${searchData.perPage}`;
    }
    navigate(`/rsschool-react2023q4-course/${urlAddition}`);
  };

  const onCardsContainerClick = () => {
    if (!cardToOpenId) return;
    closeDetails();
  };

  if (isError) {
    return <p>Sorry, there is an error...</p>;
  }

  return (
    <div className="results">
      {isLoading ? (
        <p>Loading...</p>
      ) : !searchData.keyWord ? (
        <p className="random-photos">RANDOM PHOTOS</p>
      ) : (
        <Pagination
          pageNumber={currentPage}
          totalPages={totalNumber}
          changeCurrentPage={setCurrentPage}
        />
      )}
      <div className="results-field">
        {transformedData.length > 0 ? (
          <div className="cards-container" onClick={onCardsContainerClick}>
            {transformedData.map((item) => (
              <div
                className="card"
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
