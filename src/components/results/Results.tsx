import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/store";
import type { DataItem } from "../../types/types";
import {
  useGetRandomPageQuery,
  useGetResultsPageQuery,
} from "../../redux/services/photosApi";
import { saveOpenStatus, saveId } from "../../redux/detailsSlice";
import { saveResultsLoadingStatus } from "../../redux/loadingsSlice";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import { useNavigate } from "react-router-dom";
import "./Results.css";

export default function Results() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchData = useSelector((state: AppState) => state.searchData);
  const detailsData = useSelector((state: AppState) => state.detailsData);
  const [currentPage, setCurrentPage] = useState(searchData.currentPage);

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

  useEffect(() => {
    if (isLoading) {
      dispatch(saveResultsLoadingStatus("loading"));
    } else {
      dispatch(saveResultsLoadingStatus("idle"));
    }
  }, [isLoading]);

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
    if (detailsData.isOpen) return;
    dispatch(saveOpenStatus(true));
    dispatch(saveId(id));
  };

  const closeDetails = () => {
    dispatch(saveOpenStatus(false));
    dispatch(saveId(""));
  };

  const onCardsContainerClick = () => {
    if (!detailsData.isOpen) return;
    closeDetails();
  };

  useEffect(() => {
    setCurrentPage(searchData.currentPage);
  }, [searchData.currentPage]);

  useEffect(() => {
    let url: string;
    if (detailsData.id) {
      if (!searchData.keyWord) {
        url = `details/${detailsData.id}/?page=random&per_page=${searchData.perPage}`;
      } else {
        url = `details/${detailsData.id}/?search=${searchData.keyWord}&page=${currentPage}&per_page=${searchData.perPage}`;
      }
    } else {
      if (!searchData.keyWord) {
        url = `/rsschool-react2023q4-course/?page=random&per_page=${searchData.perPage}`;
      } else {
        url = `/rsschool-react2023q4-course/?search=${searchData.keyWord}&page=${currentPage}&per_page=${searchData.perPage}`;
      }
    }
    navigate(url);
  }, [detailsData.id]);

  if (isError) {
    return <p>Sorry, there is an error...</p>;
  }

  return (
    <div className="results" data-testid="results">
      {isLoading ? (
        <p>Loading...</p>
      ) : !searchData.keyWord ? (
        <p className="random-photos">RANDOM PHOTOS</p>
      ) : (
        <Pagination
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
