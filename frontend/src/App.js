import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndexPage from "./components/Spots/SpotsIndexPage";
import SpotShow from "./components/Spots/SpotShow";
import SpotForm from "./components/Spots/SpotForm";
import SpotsManage from "./components/Spots/SpotsManage";
import SpotEdit from "./components/Spots/SpotEdit";
import SpotDelete from "./components/Spots/SpotDelete";
import BookingManage from "./components/Spots/BookingManage";

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
            <Route exact path="/spots/edit/:spotId">
              <SpotEdit />
            </Route>
            <Route exact path="/spots/delete/:spotId">
              <SpotDelete />
            </Route>
            <Route exact path="/spots/current">
              <SpotsManage />
            </Route>
            <Route exact path="/spots/:spotId">
              <SpotShow />
            </Route>
            <Route exact path="/bookings/manage">
              <BookingManage />
            </Route>
          </Switch>
        </Switch>
      )}
    </>
  );
}

export default App;
