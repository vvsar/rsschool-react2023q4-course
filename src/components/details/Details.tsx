import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { getPhoto } from "../../api/api";
import "./Details.css";

type DataItem = {
  id: string;
  description: string | null;
  alt_description: string;
  urls: { regular: string };
  user: { name: string };
  exif: { name: string | null };
};

export default function Details() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [resultsData, setResultsData] = useState({
    id: "",
    description: "",
    alt_description: "",
    urls: { regular: "" },
    user: { name: "" },
    exif: { name: "" },
  } as DataItem);

  const { id } = useParams();

  const fetchPhoto = async () => {
    const response = await getPhoto<DataItem>(id as string);
    setResultsData(response);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPhoto().then(() => {
      setIsLoading(false);
    });
  }, [id]);

  const closeDetails = () => {
    navigate("/rsschool-react2023q4-course/");
  };

  return (
    <div className="colored">
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
            <p className="text" data-testid="author">
              Author: {resultsData.user.name}
            </p>
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
