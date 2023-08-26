import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots } from "../../store/spots";
import "./GetAllSpots.css";





const GetAllSpots = () => {

 const spots = Object.values(useSelector((state) =>
 state.spots.allSpots ? state.spots.allSpots : []
 ))


 const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunkGetAllSpots())
  }, [dispatch])

  console.log('spots type', spots)



  return (
    <>
    <main className="outer-wrapper">
      <div className="photo-container">

 {spots.map((spotObj, i) =>

 <div className="inner-container">
 <img key = {i} src= {`${spotObj.previewImage}`}>
 </img>
 <div className="info">
  <div className="left-info">
    <div className="city-state">
  {spotObj.city}, {'   '} {'   '}
  {spotObj.state}
  </div>
  <div className="star-info">
  {spotObj.avgRating}
  </div>
  </div>

  <div className="right-info">
  ${spotObj.price} night
  </div>

 </div>
 </div>


)}

  </div>
  </main>


    </>
  )
}


export default GetAllSpots;
