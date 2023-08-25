import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots } from "../../store/spots";




const GetAllSpots = () => {

  const dispatch = useDispatch();

//   // if (!spots) return null

  useEffect(() => {
    dispatch(thunkGetAllSpots())
  }, [dispatch])
}


export default GetAllSpots;
