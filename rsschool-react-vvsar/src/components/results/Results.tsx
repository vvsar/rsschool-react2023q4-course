import React from "react";
import getResults from "../../api/api";
import Card from "../card/Card";
import "./Results.css";

type ResultsPageProps = {
  query: string;
};

type ResultsDataItem = {
  description: string | null;
  urls: { small: string };
  user: { name: string };
};

class Results extends React.Component<ResultsPageProps> {
  constructor(props: ResultsPageProps) {
    super(props);
    this.state = { resultsData: [] as ResultsDataItem[] };
  }

  fetchCards = async () => {
    const response = await getResults<ResultsDataItem[]>(this.props.query);
    this.setState({ resultsData: response });
  };

  componentDidMount() {
    this.fetchCards();
  }

  render() {
    const cards = this.state.resultsData.map((item, i) => (
      <Card
        url={item.urls.small}
        author={item.user.name}
        description={item.description}
        key={i}
      />
    ));
    return <main className="results">{cards}</main>;
  }
}

export default Results;
