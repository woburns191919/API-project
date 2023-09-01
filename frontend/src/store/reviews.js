import { csrfFetch } from "./csrf";
import { thunkGetReviewsBySpotId } from "./spots";

//types

const GETREVIEWSBYSPOTID = "/reviews/get_reviews_by_id";

const CREATEREVIEW= "/reviews/create_review"

const REVIEWDELETE = "/reviews/delete_review"

//get reviews action

const actionGetReviewsBySpotId = (reviews) => ({
  type: GETREVIEWSBYSPOTID,
  reviews,
});

//create reviews action


const actionCreateReview = (review) => ({
  type: CREATEREVIEW,
  review,
});


// delete reviews action

const actionReviewDelete = (review) => ({
  type: REVIEWDELETE,
  review
})


//get reviews thunk

// export const thunkGetReviewsBySpotId = (spotId) => async (dispatch) => {
//   console.log("entered review thunk");
//   const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(actionGetReviewsBySpotId(data));
//     console.log("data from thunk: ", data);
//     return data;
//   }
// };


//create reviews thunk


export const thunkCreateReview = (payload, spotId) => async (dispatch) => {

  console.log('payload from Create Review thunk', payload)

  console.log('spotId from Create Review thunk', spotId)

  console.log('entering create review thunk')

  const res = await csrfFetch(`/api/spots/${spotId}/reviews`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  console.log("res??", res);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  dispatch(thunkGetReviewsBySpotId(spotId))
  return data
};

//delete reviews thunk

export const thunkReviewDelete = (reviewId) => async (dispatch) => {

const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  })
  console.log('res from delete review thunk', res)
  if (res.ok) {
    const data = await res.json();
    dispatch(actionReviewDelete(data))
    if (!data) {
      throw new Error('no data')
    }
    console.log('data from delete review thunk', data)
    return data;
  } else {
    throw new Error('no data')
  }
}



//reducer

let initialState = { spot: {}, user: {} };

export default function reviewReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GETREVIEWSBYSPOTID:
      newState = { ...state, spot: {} };
      newState.spot = action.reviews;
      return newState;
    case CREATEREVIEW:
      newState = {...state, [action.review.id]: action.review}
      return newState
    case REVIEWDELETE:
      newState = {...state, spot: {...state.spot}}
      console.log('newstate spot actionid', newState.spot[action.id])
      delete newState.spot[action.id]
      return state
    default:
      return state;
  }
}
