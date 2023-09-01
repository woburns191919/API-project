import { csrfFetch } from "./csrf";

//types

const GETALLSPOTS = "/spots/get_all_spots";

const GETSPOTDETAILS = "/spots/get_spot_details";

const GETREVIEWSBYSPOTID = "/spots/get_reviews_by_id";

const CREATESPOT = "/spots/create_spot";

const SPOTIMAGECREATESPOT = "/spots_spot_image_create_spot";

const GETCURRENTSPOTS = "/spots_get_current_spots";

const PUTEDITSPOT = "/spots/put_edit_spot";

const SPOTDELETE = "/spots/delete_spot"

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

//delete spot action

const actionSpotDelete = (spot) => ({
  type: SPOTDELETE,
  spot

})


//edit put spot action

const actionPutEditSpot = (spot) => ({
  type: PUTEDITSPOT,
  spot
})



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
    // console.log('res from current spot thunk', res)
    if (res.ok) {
      const data = await res.json();
      dispatch(actionGetCurrentSpots(normalizerSpots(data)));
      // console.log('data from cur spot thunk', data)
      if (!data) {
        return null
      }
      return data;
    } else {
      console.warn("error: ", res);
    }
  };

  //GetAllSpots thunk
  export const thunkGetAllSpots = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots");
    if (res.ok) {
      const data = await res.json();
      console.log('thunk spot all', data)
      dispatch(actionGetSpots(normalizerSpots(data)));
      return data;
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
    // console.log("data from edit thunk", data);
    dispatch(actionPutEditSpot(data.id));
    //  dispatch(thunkGetSpotDetails(spotId))
    return data;
  };


//thunk for deleting a spot

export const thunkSpotDelete = (spotId) => async (dispatch) => {
  // console.log('entered delete thunk')
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  })
  console.log('res from delete thunk', res)
  if (res.ok) {
    const data = await res.json();
    dispatch(actionSpotDelete(data))
    if (!data) {
      throw new Error('no data')
    }
    console.log('data from delete thunk', data)
    return data;
  } else {
    throw new Error('no data')
  }
}


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

//reducer

let initialState = { allSpots: {}, singleSpot: {}, spot: {}, user: {} };
export default function spotReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GETALLSPOTS:
      // console.log("current dot spots payload***", action.spots);
      newState = { ...state, allSpots: {} }; //box
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
      // dont forget normalizer again
      newState = { ...state, allSpots: {} };
      newState.allSpots = action.spots;
      return newState;
    case PUTEDITSPOT:
      // console.log('action from put edit', action)
      newState = { ...state, singleSpot: {} };
      newState.singleSpot = action.spot
    case SPOTDELETE:
      newState = { ...state, allSpots: { ...state.allSpots }}
      console.log('newstate allspots', newState.allSpots)
      delete newState.allSpots
      return newState;
    default:
      return state;
  }
}
