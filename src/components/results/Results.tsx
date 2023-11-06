import { useEffect, useState } from "react";
import getResults from "../../api/api";
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

type SearchResultsData = {
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

  const fetchRandomCards = async () => {
    const response = await getResults<DataItem[]>(word, perPage);
    setResultsData(response);
  };

  const fetchCards = async () => {
    const response = await getResults<SearchResultsData>(word, perPage);
    setResultsData(response.results);
  };

  const fetchResults = () => {
    if (word === "") {
      return fetchRandomCards();
    } else {
      return fetchCards();
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchResults().then(() => setIsLoading(false));
  }, [word, perPage]);

  return (
    <main className="results">
      {isLoading ? <p>Loading...</p> : null}
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
