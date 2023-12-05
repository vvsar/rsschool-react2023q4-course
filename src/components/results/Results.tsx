import Card from "../card/Card";
import "./Results.css";
import { AppState } from "../../redux/store";
import { useSelector } from "react-redux";

export default function Results() {
  const data = useSelector((state: AppState) => state.data);

  return (
    <div className="results" data-testid="results">
      <div className="results-field">
        {data.length > 0 ? (
          <div className="cards-container">
            {data.map((item, index) => (
              <div className="card-wrapper" key={index}>
                <Card
                  name={item.name}
                  age={item.age}
                  email={item.email}
                  gender={item.gender}
                  country={item.country}
                  picture={item.picture}
                  password=""
                  confirm_password=""
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No submitted data</p>
        )}
      </div>
    </div>
  );
}
