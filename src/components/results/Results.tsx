// import Card from "../card/Card";
import "./Results.css";

export default function Results() {
  return (
    <div className="results" data-testid="results">
      {/* <div className="results-field">
        {transformedData.length > 0 ? (
          <div className="cards-container">
            {transformedData.map((item) => (
              <div className="card" key={item.id}>
                <Card url={item.urls.small} author={item.user.name} />
              </div>
            ))}
          </div>
        ) : (
          <p>Sorry, but nothing was found.</p>
        )}
      </div> */}
    </div>
  );
}
