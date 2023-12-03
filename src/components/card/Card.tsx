import { UserData } from "../../types/types";
import "./Card.css";

export default function Card(props: UserData) {
  return (
    <>
      <div className="cardbox" data-testid="card">
        <p>{props.name}</p>
        <p>{props.age}</p>
        <p>{props.email}</p>
        <p>{props.gender}</p>
        <p>{props.country}</p>
      </div>
    </>
  );
}
