import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as spotActions from "./store/spots";
import Navigation from "./components/Navigation";
import SpotsIndexPage from "./components/Spots/SpotsIndexPage";
import SpotShow from "./components/Spots/SpotShow";
import ProfileButton from "./components/Navigation/ProfileButton";
import SpotForm from "./components/Spots/SpotForm";
import ReviewForm from "./components/Reviews/ReviewForm";
import SpotsManage from "./components/Spots/SpotsManage";
import SpotEdit from "./components/Spots/SpotEdit";

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
            <Route exact path="/">
              <SpotsIndexPage />
            </Route>
            <Route exact path="/spots/new">
              <SpotForm />
            </Route>
            <Route exact path="/spots/current">
              <SpotsManage />
            </Route>
            <Route exact path="/spots/:spotId">
              <SpotShow />
            </Route>
            <Route exact path="/reviews/current">
              <ReviewForm />
            </Route>
            <Route exact path="/spots/edit">
              <SpotEdit />
            </Route>
          </Switch>
        </Switch>
      )}
    </>
  );
}

export default App;
