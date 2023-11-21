import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/store";
import { useGetPhotoQuery } from "../../redux/services/photosApi";
import { saveOpenStatus, saveId } from "../../redux/detailsSlice";
import type { DataItemExtended } from "../../types/types";
import "./Details.css";

export default function Details() {
  const detailsData = useSelector((state: AppState) => state.detailsData);
  const dispatch = useDispatch();

  const { data, isError, isLoading } = useGetPhotoQuery(detailsData.id);
  const photoData = data ? data : ({} as DataItemExtended);

  const closeDetails = () => {
    dispatch(saveOpenStatus(false));
    dispatch(saveId(""));
  };

  if (isError) {
    return <p>Sorry, there is an error...</p>;
  }

  return (
    <div className="colored">
      {isLoading ? (
        <p>Loading...</p>
      ) : photoData.id ? (
        <div className="details">
          <div className="photo-box">
            <img
              className="img"
              data-testid="img"
              src={photoData.urls.regular}
              alt={photoData.alt_description}
            ></img>
          </div>
          <div className="image-data">
            <p className="text" data-testid="author">
              Author: {photoData.user.name}
            </p>
            {photoData.description ? null : (
              <p className="text" data-testid="description">
                {photoData.description}
              </p>
            )}
            <p className="text" data-testid="camera">
              Camera: {photoData.exif.name}
            </p>
          </div>
          <button className="close-button" onClick={closeDetails}>
            CLOSE PANEL
          </button>
        </div>
      ) : (
        <p>Error!</p>
      )}
    </div>
  );
}
