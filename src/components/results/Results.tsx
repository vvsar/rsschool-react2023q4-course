import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { getResults } from "../../api/api";
import SearchContext from "../../contexts/SearchContext";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import { useNavigate } from "react-router-dom";
import "./Results.css";

// type ResultsPageProps = {
//   word: string;
//   perPage: string;
// };

type DataItem = {
  id: string;
  urls: { small: string };
  user: { name: string };
};

type ResponseData = {
  total: number;
  total_pages: number;
  results: DataItem[];
};

export default function Results() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setSearchParams] = useSearchParams();
  const searchContext = useContext(SearchContext);
  const [keyWord] = useState(searchContext.searchInputValue);
  const [perPage] = useState(searchContext.perPageValue);
  const [resultsData, setResultsData] = useState([] as DataItem[]);
  const [pageIsRandom, setPageIsRandom] = useState(false);
  const [totalNumber, setTotalNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState("1");
  const [cardToOpenId, setCardToOpenId] = useState("");
  const navigate = useNavigate();

  const fetchRandomCards = async () => {
    const response = await getResults<DataItem[]>(
      keyWord,
      perPage,
      currentPage,
    );
    setResultsData(response);
  };

  const fetchCards = async () => {
    const response = await getResults<ResponseData>(
      keyWord,
      perPage,
      currentPage,
    );
    setResultsData(response.results);
    // Hardcoded limitation of the total number of photos
    const total = response.total < 120 ? response.total : 120;
    setTotalNumber(Math.ceil(total / +perPage));
  };

  const fetchResults = () => {
    if (!keyWord) {
      setPageIsRandom(true);
      setSearchParams({ page: "random", per_page: perPage });
      return fetchRandomCards();
    } else {
      setPageIsRandom(false);
      setSearchParams({
        search: keyWord,
        page: currentPage,
        per_page: perPage,
      });
      return fetchCards();
    }
  };

  useEffect(() => {
    setCurrentPage("1");
  }, [keyWord, perPage]);

  useEffect(() => {
    setIsLoading(true);
    fetchResults().then(() => setIsLoading(false));
  }, []);

  const onCardClick = (id: string) => {
    if (cardToOpenId) return;
    setCardToOpenId(id);
    let url: string;
    if (!keyWord) {
      url = `details/${id}/?page=random&per_page=${perPage}`;
    } else {
      url = `details/${id}/?search=${keyWord}&page=${currentPage}&per_page=${perPage}`;
    }
    navigate(url);
  };

  const closeDetails = () => {
    setCardToOpenId("");
    let url: string;
    if (!keyWord) {
      url = `/rsschool-react2023q4-course/?page=random&per_page=${perPage}`;
    } else {
      url = `/rsschool-react2023q4-course/?search=${keyWord}&page=${currentPage}&per_page=${perPage}`;
    }
    navigate(url);
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
