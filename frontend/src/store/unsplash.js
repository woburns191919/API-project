import { csrfFetch } from "./csrf";

const LOAD_API_KEY = "unsplash/LOAD_API_KEY";

const loadApiKey = (key) => ({
  type: LOAD_API_KEY,
  payload: key,
});

export const getKey = () => async (dispatch) => {
  console.log("getKey action started");
  const res = await csrfFetch("/api/unsplash/key", {
    method: "POST",
  });

  if (res.ok) {
    const data = await res.json();
    console.log(
      "Dispatching loadApiKey action with payload: ",
      data.AIUnsplashAPIKey
    );
    dispatch(loadApiKey(data.AIUnsplashAPIKey));
  } else {
    console.error("Failed to fetch API Key");
  }
};

const initialState = { key: null };

const unsplashReducer = (state = initialState, action) => {
  // console.log("Reducer action received: ", action);
  switch (action.type) {
    case LOAD_API_KEY:
      console.log("Updating state with API key: ", action.payload);
      return { key: action.payload };
    default:
      return state;
  }
};

export default unsplashReducer;
