import "./Card.css";

type CardProps = {
  url: string;
  author: string;
};

export default function Card(props: CardProps) {
  return (
    <>
      <div className="image-box" data-testid="card">
        <img className="img" src={props.url} alt={props.author}></img>
      </div>
      <div className="image-data">
        <p className="author">Author: {props.author}</p>
      </div>
    </>
  );
}
