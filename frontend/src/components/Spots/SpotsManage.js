import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCurrentSpots } from "../../store/spots";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SpotDelete from "./SpotDelete";
import "./SpotsManage.css";

const SpotsManage = () => {
  // console.log('component rendered')

  // const { setModalContent, setOnModalClose } = useModal()
  // console.log('spot id from manage', spotId)

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetCurrentSpots(sessionUser));
  }, [dispatch]);

  const currentSpotsObj = useSelector(
    (state) => state && state.spots && state.spots.allSpots
  );
  console.log('current spots obj', currentSpotsObj)
if (!currentSpotsObj) return null;

console.log('current spots obj after check')

  const currentSpots = Object.values(currentSpotsObj)
  console.log('array, after check', currentSpots)


  // console.log('current spots from component', currentSpots)

  if (!currentSpots) return null;
  return (
    <>
      <main className="outer-wrapper">
        <div className="photo-container">
          {currentSpots.length &&
            currentSpots.map((currentSpotObj, i) => (
              <div key={i} className="inner-Container">
                <Link to={`/spots/${currentSpotObj.id}`}>
                  <img src={`${currentSpotObj.previewImage}`} />
                </Link>
                <div className="info">
                  <div className="left-info">
                    <div className="city-state">
                      {currentSpotObj.city}, {"   "} {"   "}
                      {currentSpotObj.state}
                    </div>
                    <div className="star-info">{currentSpotObj.avgRating}</div>
                  </div>
                  <div className="right-info">
                    ${currentSpotObj.price} night
                  </div>
                </div>
                <button>
                  <NavLink to={`/spots/edit/${currentSpotObj.id}`}>
                    Update
                  </NavLink>
                </button>{" "}
                {"   "}
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<SpotDelete spotId={currentSpotObj.id} />}
                />
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default SpotsManage;
