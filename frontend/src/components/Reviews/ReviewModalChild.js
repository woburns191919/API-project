// import { useDispatch, useSelector } from "react-redux";
// import { closeModal, useModal } from "../../context/Modal";
// import { useParams } from "react-router-dom";
// import { thunkGetReviewsBySpotId } from "../../store/Spots";
// import { useEffect } from "react";

// const ReviewModalChild = () => {
//   const { spotId } = useParams();

//   const { closeModal } = useModal();

//   const dispatch = useDispatch();


//   useEffect(() => {
//     dispatch(thunkGetReviewsBySpotId(spotId))
//   }, [dispatch])


//   const reviewsArr = useSelector((state) => console.log('state***', state));
//   console.log('reviews Arr from review modal child', reviewsArr)


//   if (!spotId) return null;
//   return (
//     <>
//       <h5>How was your stay?</h5>
//       <div className="review-textarea-box">
//       <textarea>
//         Leave your review here...
//       </textarea>
//       </div>
//       <div className="review-star-box">
//       </div>
//       <button

//       >

//       </button>
//     </>
//   );
// };


// export default ReviewModalChild;
