// import { useEffect } from "react";
import Card from "../card/Card";
import "./Results.css";
import { AppState } from "../../redux/store";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

export default function Results() {
  // const [state, setState] = useState([] as AppState);

  const data = useSelector((state: AppState) => state.data);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // console.log(data);
  // }, [data]);
  return (
    <div className="results" data-testid="results">
      <div className="results-field">
        {data.length > 0 ? (
          <div className="cards-container">
            {data.map((item, index) => (
              <div className="card" key={index}>
                <Card
                  name={item.name}
                  age={item.age}
                  email={item.email}
                  gender={item.gender}
                  country={item.country}
                  password={item.password}
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
