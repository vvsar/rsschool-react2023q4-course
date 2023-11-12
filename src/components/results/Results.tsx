import { useEffect, useState } from "react";
import { getResults } from "../../api/api";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
// import Detailes from "../details/Details";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Results.css";

type ResultsPageProps = {
  word: string;
  perPage: string;
};

type DataItem = {
  id: string;
  urls: { small: string };
  user: { name: string };
};

// type DataItem = {
//   id: string;
//   description: string | null;
//   alt_description: string;
//   urls: { small: string; regular: string };
//   user: { name: string };
//   exif: { name: string };
// };

type ResponseData = {
  total: number;
  total_pages: number;
  results: DataItem[];
};

export default function Results({ word, perPage }: ResultsPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [resultsData, setResultsData] = useState([] as DataItem[]);
  const [pageIsRandom, setPageIsRandom] = useState(false);
  const [totalNumber, setTotalNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState("1");
  const [, setSearchParams] = useSearchParams();
  const [cardToOpenId, setCardToOpenId] = useState("");
  const navigate = useNavigate();

  const fetchRandomCards = async () => {
    const response = await getResults<DataItem[]>(word, perPage, currentPage);
    setResultsData(response);
  };

  const fetchCards = async () => {
    const response = await getResults<ResponseData>(word, perPage, currentPage);
    setResultsData(response.results);
    // Hardcoded limitation of the total number of photos
    const total = response.total < 120 ? response.total : 120;
    setTotalNumber(Math.ceil(total / +perPage));
  };

  const fetchResults = () => {
    if (word === "") {
      setPageIsRandom(true);
      setSearchParams({ page: "random", per_page: perPage });
      return fetchRandomCards();
    } else {
      setSearchParams({ search: word, page: currentPage, per_page: perPage });
      setPageIsRandom(false);
      return fetchCards();
    }
  };

  useEffect(() => {
    setCurrentPage("1");
  }, [word, perPage]);

  useEffect(() => {
    setIsLoading(true);
    fetchResults().then(() => setIsLoading(false));
  }, [word, perPage, currentPage]);

  const onCardClick = (id: string) => {
    if (cardToOpenId) return;
    setCardToOpenId(id);
    navigate(`details/${id}`);
  };

  const closeDetails = () => {
    setCardToOpenId("");
    setSearchParams((params) => {
      params.delete("details_id");
      return params;
    });
  };

  const onCardsContainerClick = () => {
    if (!cardToOpenId) return;
    closeDetails();
  };

  return (
    <div className="results">
      {isLoading ? (
        <p>Loading...</p>
      ) : pageIsRandom ? (
        <p className="random-photos">RANDOM PHOTOS</p>
      ) : (
        <Pagination
          pageNumber={currentPage}
          totalPages={totalNumber}
          changeCurrentPage={setCurrentPage}
        />
      )}
      <div className="results-field">
        {resultsData.length > 0 ? (
          <div className="cards-container" onClick={onCardsContainerClick}>
            {resultsData.map((item) => (
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
