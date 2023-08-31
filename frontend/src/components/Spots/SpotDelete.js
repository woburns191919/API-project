import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";

import { thunkSpotDelete, thunkGetSpotDetails } from "../../store/spots";

const SpotDelete = () => {
  const { spotId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkSpotDelete(spotId)).then(data => console.log('deleted', data))
}, [dispatch])

if (!spotId) return null;
}


export default SpotDelete;
