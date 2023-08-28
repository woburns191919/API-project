import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as spotActions from "./store/spots";
import Navigation from "./components/Navigation";
import SpotsIndexPage from "./components/Spots/SpotsIndexPage";
import SpotShow from "./components/Spots/SpotShow"
import ProfileButton from "./components/Navigation/ProfileButton";
import SpotForm from "./components/Spots/SpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Switch>
            <Route exact path = "/spots">
            <SpotForm />
            </Route>
            <Route exact path="/">
              <SpotsIndexPage />
            </Route>
            <Route exact path = "/spots/:spotId">
              <SpotShow />
            </Route>
          </Switch>
        </Switch>
      )}
    </>
  );
}

export default App;
