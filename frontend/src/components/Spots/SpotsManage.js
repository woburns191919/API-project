import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCurrentSpots } from "../../store/spots";
import { Link } from 'react-router-dom';
import { NavLink} from "react-router-dom";

 const SpotsManage= () => {
  // console.log('component rendered')

const dispatch = useDispatch();

const sessionUser = useSelector((state) => state.session.user);

useEffect(() => {
  dispatch(thunkGetCurrentSpots(sessionUser))
}, [dispatch])

// dispatch(thunkGetCurrentSpots(sessionUser))
const currentSpots = useSelector((state) => state.spots.allSpots.Spots)
// console.log('current spots****', currentSpots)

  return (
    <>
    <main className="outer-wrapper">
      <div className="photo-container">
        {currentSpots?.map((currentSpotObj, i) => (
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
               <NavLink to="/spots/new">
              Update
             </NavLink>
              </button> {'   '}
              <button>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
export default SpotsManage;
