import "./Card.css";

type CardProps = {
  url: string;
  author: string;
  // description: string | null;
};

// class Card extends React.Component<CardProps> {
//   render() {
//     return (
//       <div className="card">
//         <div className="image-box">
//           <img
//             className="img"
//             src={this.props.url}
//             alt={this.props.author}
//           ></img>
//         </div>
//         <div className="image-data">
//           <p>Author: {this.props.author}</p>
//           <p>Description: {this.props.description}</p>
//         </div>
//       </div>
//     );
//   }
// }

export default function Card(props: CardProps) {
  return (
    <div className="card">
      <div className="image-box">
        <img className="img" src={props.url} alt={props.author}></img>
      </div>
      <div className="image-data">
        <p className="author">Author: {props.author}</p>
        {/* <p>Description: {props.description}</p> */}
      </div>
    </div>
  );
}

// export default Card;
