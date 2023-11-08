import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { getPhoto } from "../../api/api";
import "./Details.css";

type DataItem = {
  description: string | null;
  alt_description: string;
  urls: { regular: string };
  user: { name: string };
  exif: { name: string };
};

type DetailsProps = {
  id: string;
  closeDetails: () => void;
};

export default function Detailes({ id, closeDetails }: DetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [resultsData, setResultsData] = useState({} as DataItem);
  const fetchPhoto = async () => {
    const response = await getPhoto<DataItem>(id);
    setResultsData(response);
  };

  const fetchResults = () => {
    return fetchPhoto();
  };

  useEffect(() => {
    setIsLoading(true);
    fetchResults().then(() => setIsLoading(false));
  }, [id]);

  return (
    <div className="results">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="details">
          <div className="photo-box">
            <img
              className="img"
              src={resultsData.urls.regular}
              alt={resultsData.alt_description}
            ></img>
          </div>
          <div className="image-data">
            <p className="text">Author: {resultsData.user.name}</p>
            {resultsData.description ? null : (
              <p className="text">{resultsData.description}</p>
            )}
            <p className="text">Camera: {resultsData.exif.name}</p>
          </div>
          <button className="close-button" onClick={closeDetails}>
            CLOSE PANEL
          </button>
        </div>
      )}
    </div>
  );
}
