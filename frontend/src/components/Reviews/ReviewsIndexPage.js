// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { thunkGetReviewsBySpotId } from "../../store/reviews";
// import "./Reviews.css";

// const ReviewsIndexPage = () => {
//   const reviews = Object.values(
//     useSelector((state) => (state.spot.Reviews ? state.spot.Reviews : []))
//   );

//   useEffect(() => {
//     dispatch(thunkGetReviewsBySpotId());
//   }, [dispatch]);


//     const dispatch = useDispatch();
//   return <h1>these are the reviews by spotId</h1>;
// };

// export default ReviewsIndexPage;
