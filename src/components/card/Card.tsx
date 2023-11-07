import "./Card.css";

type CardProps = {
  url: string;
  author: string;
};

export default function Card(props: CardProps) {
  return (
    <div className="card">
      <div className="image-box">
        <img className="img" src={props.url} alt={props.author}></img>
      </div>
      <div className="image-data">
        <p className="author">Author: {props.author}</p>
      </div>
    </div>
  );
}
