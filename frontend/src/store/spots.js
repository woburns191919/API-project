import { csrfFetch } from "./csrf";

//types

const GETALLSPOTS = "/spots/get_all_spots";

const GETSPOTDETAILS = "/spots/get_spot_details";

const GETREVIEWSBYSPOTID = "/spots/get_reviews_by_id";

const actionGetReviewsBySpotId = (reviews) => ({
  type: GETREVIEWSBYSPOTID,
  reviews,
});

//actions

//GetAllSpot action

const actionGetSpots = (spots) => ({
  type: GETALLSPOTS,
  spots,
});

//GetSpotDetails action

const actionGetSpotDetails = (spot) => ({
  type: GETSPOTDETAILS,
  spot,
});

//GetAllSpots thunk
export const thunkGetAllSpots = () => async (dispatch) => {

  const res = await csrfFetch("/api/spots");
  // console.log(res)
  if (res.ok) {
    const data = await res.json();
    dispatch(actionGetSpots(normalizerSpots(data)));
    return data;
  } else {
    console.warn("error: ", res);
  }
};

//GetSpotDetails thunk

export const thunkGetSpotDetails = (spotId) => async (dispatch) => {
  // console.log('entered thunk')
  const res = await csrfFetch(`/api/spots/${spotId}`);
  if (res.ok) {
    const data = await res.json();
    // console.log('before array', data.Owner)
    const spotImageArr = data.SpotImages
    const normalizedSpotDetails = {};
    for (let i = 1; i < spotImageArr.length; i++) {
      let spotObj = spotImageArr[i]
      normalizedSpotDetails[spotObj.id] = spotObj
    }
    normalizedSpotDetails.owner = data.Owner
    normalizedSpotDetails.description = data.description
    normalizedSpotDetails.reviews = data.numReviews
    normalizedSpotDetails.avgStarRating = data.avgStarRating
    normalizedSpotDetails.price = data.price
    normalizedSpotDetails.city = data.city
    normalizedSpotDetails.state = data.state
    normalizedSpotDetails.country = data.country
    normalizedSpotDetails.name = data.name
    dispatch(actionGetSpotDetails(normalizedSpotDetails));


    return normalizedSpotDetails
    // console.log('data??', data)

  } else {
    console.warn("error: ", res);
  }
};



//GetAllSpots normalizer

function normalizerSpots(spots) {
  const normalSpotObj = {};
  spots.Spots.forEach((spot) => (normalSpotObj[spot.id] = spot));
  return normalSpotObj;
}

//GetSpotDetails normalizer

// function normalizerGetSpotDetails(spot) {


  // }

  //reducer


  export const thunkGetReviewsBySpotId = (spotId) => async (dispatch) => {
    // console.log("entered review thunk");
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
      const data = await res.json();
      dispatch(actionGetReviewsBySpotId(data));
      // console.log("data from thunk: ", data);
      return data;
    }
  };




  let initialState = { allSpots: {}, singleSpot: {}, spot: {}, user: {} };
  export default function spotReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GETALLSPOTS:
      newState = { ...state, allSpots: {} };
      newState.allSpots = action.spots;
      return newState;
    case GETSPOTDETAILS:
      newState = { ...state, singleSpot: {} };
      newState.singleSpot = action.spot;
      return newState;
      case GETREVIEWSBYSPOTID:
        newState = { ...state, spot: {} };
        newState.spot = action.reviews;
        return newState;
    default:
      return state;
  }
}
