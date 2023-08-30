import { csrfFetch } from "./csrf";

//types

const GETALLSPOTS = "/spots/get_all_spots";

const GETSPOTDETAILS = "/spots/get_spot_details";

const GETREVIEWSBYSPOTID = "/spots/get_reviews_by_id";

const CREATESPOT = "/spots/create_spot";

const SPOTIMAGECREATESPOT = "/spots_spot_image_create_spot";

const GETCURRENTSPOTS = "/spots_get_current_spots";

const GETEDITSPOT = "/spots/get_edit_spot"

const PUTEDITSPOT = "/spots/put_edit_spot"

const actionGetReviewsBySpotId = (reviews) => ({
  type: GETREVIEWSBYSPOTID,
  reviews,
});

//actions

const actionSpotImageCreateSpot = (images) => ({
  type: SPOTIMAGECREATESPOT,
  images,
});
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

//create spot action

const actionCreateSpot = (form) => ({
  type: CREATESPOT,
  form,
});

// get current spots action

const actionGetCurrentSpots = (spots) => ({
  type: GETCURRENTSPOTS,
  spots,
});


//edit get spot action

const actionGetEditSpot = (spot) => ({
  type: GETEDITSPOT,
  spot
})

//edit put spot action

const actionPutEditSpot = (spot) => ({
  type: PUTEDITSPOT,
  spot
})


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
    dispatch(actionGetSpotDetails(data));
    return data;
  } else {
    console.warn("error: ", res);
  }
};

//thunk for create spot

export const thunkSpotCreateSpot = (payload) => async (dispatch) => {
  if (!payload) return null;
  console.log("form***", payload);
  console.log("entered create spot thunk");

  const res = await csrfFetch("/api/spots", {
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
  dispatch(actionCreateSpot(data));
  console.log("data at bottom of thunk 1", data);
  return data;
};

// thunk for create spot image

export const thunkSpotImageCreateSpot =
  (imageData, spotId) => async (dispatch) => {
    console.log("entering thunk 2");
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageData),
    });
    if (!res.ok) {
      throw new Error();
    }
    const data = await res.json();
    console.log("data from thunk 2", data);
    dispatch(actionSpotImageCreateSpot(data));
    return data;
  };

//thunk for get current spots

export const thunkGetCurrentSpots = () => async (dispatch) => {
  // console.log("entering thunk for get current spots");
  const res = await csrfFetch(`/api/spots/current`);
  if (res.ok) {
    const data = await res.json();
    dispatch(actionGetCurrentSpots(data));
    return data;
  } else {
    console.warn("error: ", res);
  }
};

//thunk GET for edit spot

// export const thunkGetEditSpot = () => async (dispatch) => {
//   const res = await csrfFetch('/api/spots/id');
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(actionGetEditSpot(data));
//     return data
//   } else {
//     console.warn("error: ", res)
//   }
// }


//thunk PUT for edit spot

export const thunkPutEditSpot = (spotData, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spotData),
    });
    if (!res.ok) {
      throw new Error();
    }
    const data = await res.json();
    console.log("data from edit thunk", data);
    dispatch(actionPutEditSpot(data));
    return data;
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
    case CREATESPOT:
      newState = { ...state, [action.form.id]: action.form };
    case SPOTIMAGECREATESPOT:
      newState = { ...state, singleSpot: {} };
    case GETCURRENTSPOTS:
      // console.log("current spots payload***", action);
      newState = { ...state, allSpots: {} };
      newState.allSpots = action.spots;
    // case GETEDITSPOT:
    //   console.log('action from get edit', action)
    //   newState = { ...state, singleSpot: {} };
    //   newState.singleSpot = action.spot
      return newState;
    case PUTEDITSPOT:
      console.log('action from put edit', action)
      newState = { ...state, [action.form.id]: action.form };
      newState.singleSpot = action.spot
      return newState;
    default:
      return state;
  }
}
