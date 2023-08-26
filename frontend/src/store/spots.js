import { csrfFetch } from "./csrf";


const GETALLSPOTS = "/spots/get_all_spots";

const actionGetSpots = (spots) => ({
  type: GETALLSPOTS,
  spots,
});


//getAllSpots thunk
export const thunkGetAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
  const data  = await res.json();
  // console.log("data from thunk: ", data);
  dispatch(actionGetSpots(normalizerSpots(data)));
  return data;
  } else {
    console.warn('error: ', res)
  }
};

let initialState = { allSpots: {}, singleSpot: {} };

//normalizer

function normalizerSpots (spots) {
  const normalSpotObj = {};
  // console.log('spots****', spots.Spots)
  spots.Spots.forEach((spot) => (
    normalSpotObj[spot.id] = spot
  ));
  return normalSpotObj
};

//reducer

export default function spotReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GETALLSPOTS:
      newState = {...state, allSpots: {} }
      newState.allSpots = action.spots
      return newState;
    default:
      return state;
  }
}
