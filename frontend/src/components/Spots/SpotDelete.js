import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";
import { useModal } from '../../context/Modal';

import { thunkSpotDelete, thunkGetSpotDetails } from "../../store/spots";
// import { closeModal } from "../context/Modal"

const SpotDelete = ({ spotId }) => {
  // const { spotId } = useParams();

  // console.log('use params', useParams())

  const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(thunkSpotDelete(spotId)).then(data => console.log('deleted', data))
// }, [dispatch])

console.log('is this running?')

if (!spotId) return null;
return (
  <>
  <h5>Confirm Delete</h5>
  <h4>Are you sure you want to remove this spot from the listings?</h4>
  <button
  onClick={() => dispatch(thunkSpotDelete(spotId))}
  >Yes(Delete Spot)
  </button>
  <button>No (Keep Spot)</button>
  </>
)
}

// frontend/src/context/Modal.js

export default SpotDelete;
