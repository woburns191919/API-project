

import { useDispatch } from "react-redux";


import { useModal } from '../../context/Modal';

import { thunkSpotDelete, thunkGetCurrentSpots } from "../../store/spots";
// import { closeModal } from "../context/Modal"
import "./SpotDelete.css";


const SpotDelete = ({ spotId }) => {
  // const { spotId } = useParams();
  const { closeModal } = useModal()
  // console.log('use params', useParams())
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(thunkSpotDelete(spotId))
    await dispatch(thunkGetCurrentSpots())
    closeModal();
  }
//   useEffect(() => {
//     dispatch(thunkSpotDelete(spotId)).then(data => console.log('deleted', data))
// }, [dispatch])


if (!spotId) return null;
return (
  <>
  {/* <div className="confirmdelete"> */}
  <h5>Confirm Delete</h5>
  {/* </div> */}
  <h4 class="sure">Are you sure you want to remove this spot from the listings?</h4>
  <div className="buttondiv">
  <button
  id="yesbutton"
  onClick={handleDelete}
  >Yes(Delete Spot)
  </button>
  <button
  className="nobutton"
  onClick={closeModal}
  >No (Keep Spot)</button>
  </div>
  </>
)
}

// frontend/src/context/Modal.js

export default SpotDelete;
