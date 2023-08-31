import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCurrentSpots } from "../../store/spots";
import { Link } from 'react-router-dom';
import { NavLink} from "react-router-dom";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import "./SpotsManage.css";

 const SpotsManage= () => {
  // console.log('component rendered')

const dispatch = useDispatch();

const sessionUser = useSelector((state) => state.session.user);

useEffect(() => {
  dispatch(thunkGetCurrentSpots(sessionUser))
}, [dispatch])

const { setModalContent, setOnModalClose } = useModal();

console.log(setModalContent)


// dispatch(thunkGetCurrentSpots(sessionUser))
const currentSpots = useSelector((state) => state.spots && state.spots.allSpots.Spots)
// console.log('current spots****', currentSpots)
if (!currentSpots) return null;
  return (
    <>
    <main className="outer-wrapper">
      <div className="photo-container">
        {currentSpots.length && currentSpots.map((currentSpotObj, i) => (
          <div key={i} className = "inner-Container">
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

                <div className="right-info">${currentSpotObj.price} night</div>
              </div>
              <button>
               <NavLink to={`/spots/edit/${currentSpotObj.id}`}>
              Update
             </NavLink>
              </button> {'   '}

                <Link to={`/spots/delete/${currentSpotObj.id}`}>
                <NavLink to="/reviews/current">
            <OpenModalButton
              buttonText="Delete"
              // hidden={
              //   spotArr.Owner &&
              //   loggedInUser &&
              //   spotArr.Owner.id === loggedInUser.id &&
              //   loggedInUser.id === loggedInUser.id
              // }
              modalComponent={<OpenModalButton />}
            />
          </NavLink>
                </Link>

                <button>
          <NavLink to={`/spots/delete/${currentSpotObj.id}`}>
               delete
             </NavLink>
          </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
export default SpotsManage;
