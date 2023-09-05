import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCurrentSpots } from "../../store/spots";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SpotDelete from "./SpotDelete";
import "./SpotsManage.css";
import "./GetAllSpots.css";

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
  console.log("current spots obj", currentSpotsObj);
  if (!currentSpotsObj) return null;

  console.log("current spots obj after check");

  const currentSpots = Object.values(currentSpotsObj);
  console.log("array, after check", currentSpots);

  // console.log('current spots from component', currentSpots)

  if (!currentSpots) return null;
  return (
    <>
      <main className="outer-wrapper">
        <header className="manage-create-current-spots">
          <h3>Manage Your Spots</h3>
        </header>
        <section id="create-spot-for-manage">
        {currentSpots.length === 0 && <button>
              <NavLink to="/spots/new">Create a New Spot</NavLink>
            </button>}
        </section>
        <div className="photo-container">
          {currentSpots.length > 0 &&
            currentSpots.map((currentSpotObj, i) => (
            // currentSpotObj.preview === true && (
              <div key={i} className="inner-Container">
                <Link to={`/spots/${currentSpotObj.id}`}>

                  <img src={`${currentSpotObj.previewImage}`} />

                <div className="info">
                  <div className="left-info">
                    <div className="city-state">
                      {currentSpotObj.city}, {"   "} {"   "}
                      {currentSpotObj.state}
                    </div>
                    <div className="star-info">
                    <i className="fa fa-star"></i>
                      {currentSpotObj.avgRating > 0 ? currentSpotObj.avgRating.toFixed(2) : 'new '}</div>
                  </div>
                  <div className="right-info"><b>${currentSpotObj.price}</b>night

                  </div>
                </div>
                  </Link>
                <button>
                  <NavLink to={`/spots/edit/${currentSpotObj.id}`}>
                    Update
                  </NavLink>
                </button>{" "}
                {"   "}
               { <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<SpotDelete spotId={currentSpotObj.id} />}
                />  }
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default SpotsManage;
