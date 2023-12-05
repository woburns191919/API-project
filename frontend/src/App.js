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
import BookingEdit from "./components/Spots/BookingEdit";

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
          <Route exact path="/" component={SpotsIndexPage} />
          <Route exact path="/spots/new" component={SpotForm} />
          <Route exact path="/spots/edit/:spotId" component={SpotEdit} />
          <Route exact path="/spots/delete/:spotId" component={SpotDelete} />
          <Route exact path="/spots/current" component={SpotsManage} />
          <Route exact path="/spots/:spotId" component={SpotShow} />
          <Route exact path="/bookings/manage" component={BookingManage} />
          <Route path="/bookings/edit/:bookingId" component={BookingEdit} />

        </Switch>
      )}
    </>
  );
}

export default App;
