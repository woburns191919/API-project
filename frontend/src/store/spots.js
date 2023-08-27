import { csrfFetch } from "./csrf";
import { getState } from 'react-redux'




//types

const GETALLSPOTS = "/spots/get_all_spots";

const GETSPOTDETAILS = "/spots/get_spot_details";

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

//GetSpotDetails thunk for small images

export const thunkGetSpotDetails = (spotId) => async (dispatch, getState) => {

  const res = await csrfFetch(`/api/spots/${spotId}`);
  if (res.ok) {
    const data = await res.json();
    const spotImageArr = data.SpotImages
    const normalizedSpotDetails = {};
    for (let i = 1; i < spotImageArr.length; i++) {
      let spotObj = spotImageArr[i]
      normalizedSpotDetails[spotObj.id] = spotObj
    }
    dispatch(actionGetSpotDetails(normalizedSpotDetails));
    console.log(normalizedSpotDetails)
    return normalizedSpotDetails
    // console.log('data??', data)

  } else {
    console.warn("error: ", res);
  }
};

// export const thunkGetSpotDetailsBelowImg = (spotId) => async (dispatch)  => {
//   console.log('entered thunk 2')
//   const res = await csrfFetch(`/api/spots/${spotId}`);
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(actionGetSpotDetails(data))
//     console.log('data from thunk', data)
//   }
// }


let initialState = { allSpots: {}, singleSpot: {} };

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
    default:
      return state;
  }
}
