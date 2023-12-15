import { csrfFetch } from "./csrf";

const GETALLSPOTS = "/spots/get_all_spots";

const GETSPOTDETAILS = "/spots/get_spot_details";

const GETREVIEWSBYSPOTID = "/spots/get_reviews_by_id";

const CREATESPOT = "/spots/create_spot";

const SPOTIMAGECREATESPOT = "/spots_spot_image_create_spot";

const GETCURRENTSPOTS = "/spots_get_current_spots";

const PUTEDITSPOT = "/spots/put_edit_spot";

const SPOTDELETE = "/spots/delete_spot";

const actionGetReviewsBySpotId = (reviews) => ({
  type: GETREVIEWSBYSPOTID,
  reviews,
});

const actionSpotImageCreateSpot = (images) => ({
  type: SPOTIMAGECREATESPOT,
  images,
});

const actionGetSpots = (spots) => ({
  type: GETALLSPOTS,
  spots,
});

const actionGetSpotDetails = (spot) => ({
  type: GETSPOTDETAILS,
  spot,
});

const actionCreateSpot = (form) => ({
  type: CREATESPOT,
  form,
});

const actionGetCurrentSpots = (spots) => ({
  type: GETCURRENTSPOTS,
  spots,
});

const actionSpotDelete = (spot) => ({
  type: SPOTDELETE,
  spot,
});

const actionPutEditSpot = (spot) => ({
  type: PUTEDITSPOT,
  spot,
});

export const thunkGetSpotDetails = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const data = await res.json();

    dispatch(actionGetSpotDetails(data));
    return data;
  } else {
    console.warn("error: ", res);
  }
};

export const thunkSpotCreateSpot = (payload) => async (dispatch) => {
  if (!payload) return null;

  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(actionCreateSpot(data));
    return data;
  } else {
    const error = await res.json();
    throw error;
  }
};

export const thunkSpotImageCreateSpot =
  (imageData, spotId) => async (dispatch) => {
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

    dispatch(actionSpotImageCreateSpot(data));
    return data;
  };

export const thunkGetCurrentSpots = () => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/current`);

  if (res.ok) {
    const data = await res.json();
    dispatch(actionGetCurrentSpots(normalizerSpots(data)));

    if (!data) {
      return null;
    }
    return data;
  } else {
    console.warn("error: ", res);
  }
};

export const thunkGetAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    const data = await res.json();

    dispatch(actionGetSpots(normalizerSpots(data)));
    return data;
  } else {
    console.warn("error: ", res);
  }
};

function normalizerSpots(spots) {
  const normalSpotObj = {};
  spots?.Spots?.forEach((spot) => (normalSpotObj[spot.id] = spot));
  return normalSpotObj;
}

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

  dispatch(actionPutEditSpot(data.id));

  return data;
};

export const thunkSpotDelete = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(actionSpotDelete(data));
    if (!data) {
      throw new Error("no data");
    }

    return data;
  } else {
    throw new Error("no data");
  }
};

export const thunkGetReviewsBySpotId = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const data = await res.json();
    dispatch(actionGetReviewsBySpotId(data));

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
      return newState;
    case SPOTIMAGECREATESPOT:
      newState = { ...state, singleSpot: {} };
      return newState;
    case GETCURRENTSPOTS:
      newState = { ...state, allSpots: {} };
      newState.allSpots = action.spots;
      return newState;
    case PUTEDITSPOT:
      newState = { ...state, singleSpot: {} };
      newState.singleSpot = action.spot;
      return newState;
    case SPOTDELETE:
      newState = { ...state, allSpots: { ...state.allSpots } };

      delete newState.allSpots[action.id];
      return newState;
    default:
      return state;
  }
}
