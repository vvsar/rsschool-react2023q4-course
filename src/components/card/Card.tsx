import { UserData } from "../../types/types";
import "./Card.css";

export default function Card(props: UserData) {
  return (
    <>
      <>
        <div className="image-wrapper">
          <img src={props.picture} alt="Not uploaded"></img>
        </div>
        <p>{props.name}</p>
        <p>{`Age: ${props.age}`}</p>
        <p>{props.email}</p>
        <p>{props.gender}</p>
        <p>{props.country}</p>
      </>
    </>
  );
}
