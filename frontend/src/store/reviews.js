import { csrfFetch } from "./csrf";

//types

const GETREVIEWSBYSPOTID = "/reviews/get_reviews_by_id";


const CREATEREVIEWFORSPOT = "/reviews_create_review_for_spot"

const actionGetReviewsBySpotId = (reviews) => ({
  type: GETREVIEWSBYSPOTID,
  reviews,
});

export const thunkGetReviewsBySpotId = (spotId) => async (dispatch) => {
  console.log("entered review thunk");
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const data = await res.json();
    dispatch(actionGetReviewsBySpotId(data));
    console.log("data from thunk: ", data);
    return data;
  }
};

let initialState = { spot: {}, user: {} };

export default function reviewReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GETREVIEWSBYSPOTID:
      newState = { ...state, spot: {} };
      newState.spot = action.reviews;
      return newState;
    default:
      return state;
  }
}
