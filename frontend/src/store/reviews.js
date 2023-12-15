import { csrfFetch } from "./csrf";
import { thunkGetReviewsBySpotId, thunkGetSpotDetails } from "./spots";

const GETREVIEWSBYSPOTID = "/reviews/get_reviews_by_id";

const CREATEREVIEW = "/reviews/create_review";

const REVIEWDELETE = "/reviews/delete_review";

const actionGetReviewsBySpotId = (reviews) => ({
  type: GETREVIEWSBYSPOTID,
  reviews,
});

const actionCreateReview = (review) => ({
  type: CREATEREVIEW,
  review,
});

const actionReviewDelete = (review) => ({
  type: REVIEWDELETE,
  review,
});

export const thunkCreateReview = (payload, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  dispatch(thunkGetReviewsBySpotId(spotId));
  dispatch(thunkGetSpotDetails(spotId));
  return data;
};

export const thunkReviewDelete = (reviewId, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(actionReviewDelete(data));
    dispatch(thunkGetSpotDetails(spotId));

    if (!data) {
      throw new Error("no data");
    }

    return data;
  } else {
    throw new Error("no data");
  }
};

let initialState = { spot: {}, user: {} };

export default function reviewReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GETREVIEWSBYSPOTID:
      newState = { ...state, spot: action.reviews };
      return newState;
    case CREATEREVIEW:
      newState = { ...state, spot: { ...state.spot, [action.review.id]: action.review } };
      return newState;
    case REVIEWDELETE:
      newState = { ...state, spot: { ...state.spot } };
      if (newState.spot[action.review.id]) {
        delete newState.spot[action.review.id];
      }
      return newState;
    default:
      return state;
  }
}

