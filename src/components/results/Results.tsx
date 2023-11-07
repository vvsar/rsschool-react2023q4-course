import { useEffect, useState } from "react";
import getResults from "../../api/api";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import "./Results.css";

type ResultsPageProps = {
  word: string;
  perPage: string;
};

type DataItem = {
  description: string | null;
  urls: { small: string };
  user: { name: string };
};

type ResponseData = {
  total: number;
  total_pages: number;
  results: DataItem[];
};

// type State = {
//   resultsData: DataItem[];
// };

// class Results extends React.Component<ResultsPageProps, State> {
//   constructor(props: ResultsPageProps) {
//     super(props);
//     this.state = { resultsData: [] as DataItem[] };
//   }

//   fetchRandomCards = async () => {
//     const response = await getResults<DataItem[]>(this.props.query);
//     // console.log(response[0].id);
//     this.setState({ resultsData: response });
//   };

//   fetchCards = async () => {
//     const response = await getResults<SearchResultsData>(this.props.query);
//     // console.log(response.total_pages);
//     this.setState({ resultsData: response.results });
//   };

//   fetchResults = () => {
//     if (this.props.query === "") {
//       this.fetchRandomCards();
//     } else {
//       this.fetchCards();
//     }
//   };

//   componentDidMount() {
//     this.fetchResults();
//   }

//   componentDidUpdate(previousProps: ResultsPageProps) {
//     if (previousProps.query === this.props.query) return;
//     this.fetchResults();
//   }

//   render() {
//     const cards =
//       this.state.resultsData.length > 0 ? (
//         this.state.resultsData.map((item, i) => (
//           <Card
//             url={item.urls.small}
//             author={item.user.name}
//             description={item.description}
//             key={i}
//           />
//         ))
//       ) : (
//         <p>Sorry, but nothing was found.</p>
//       );
//     return <main className="results">{cards}</main>;
//   }
// }

export default function Results({ word, perPage }: ResultsPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [resultsData, setResultsData] = useState([] as DataItem[]);
  const [pageIsRandom, setPageIsRandom] = useState(false);
  const [totalNumber, setTotalNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState("1");

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
      return fetchRandomCards();
    } else {
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

  return (
    <main className="results">
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
      {/* {} */}
      {resultsData.length > 0 ? (
        resultsData.map((item, i) => (
          <Card
            url={item.urls.small}
            author={item.user.name}
            description={item.description}
            key={i}
          />
        ))
      ) : (
        <p>Sorry, but nothing was found.</p>
      )}
    </main>
  );
}

// export default Results;
