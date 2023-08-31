import { thunkPutEditSpot, thunkGetSpotDetails } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const SpotEdit = () => {
  console.log("rendering spot edit");
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { spotId } = useParams();

  console.log("spot id***", spotId);

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  console.log("current user", user);

  if (!user) {
    alert("You must be logged in to edit a spot!");
    history.push("/");
  }

  useEffect(() => {
    dispatch(thunkGetSpotDetails(spotId)).then((data) => {
      console.log("data from before", data);
      setCountry(data.country);
      setAddress(data.address);
      setCity(data.city);
      setState(data.state);
      setLat(data.lat)
      setLng(data.lng);
      setDescription(data.description);
      setTitle(data.title);
      setPrice(data.price)
      setName(data.name);
    });
  }, [dispatch, spotId]);

  console.log("country", country);

  // useEffect(() => {
  //   dispatch(thunkPutEditSpot(spotId))
  // }, [dispatch])

  // const foundSpot = useSelector((state) =>
  // console.log("state from edit get", state)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSpot = {
      spotId,
      country,
      address,
      city,
      state,
      lat,
      lng,
      description,
      title,
      price,
      name,
    };
    // const hasData = await dispatch(thunkPutEditSpot(updatedSpot))
    // if (hasData.id) history.push(`/spots/${spotId}`)

    if (!updatedSpot.spotId) return null;
    const editedSpot = await dispatch(thunkPutEditSpot(updatedSpot, spotId));
    if (editedSpot.id) {
      history.push(`/spots/${editedSpot.id}`);
    } else {
      return null;
    }
  };

  return (
    <main className="form-wrapper">
      <form className="spot-form" onSubmit={handleSubmit}>
        <h4>Create a new Spot</h4>
        <label>
          Country <br></br>
          <input
            type="text"
            required={true}
            // name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <div>
          <label>
            Street Address <br></br>
            <input
              type="text"
              required={true}
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            City <br></br>
            <input
              required={true}
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            State <br></br>
            <input
              required={true}
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Latitude <br></br>
            <input
              required={true}
              type="text"
              name="latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Longitude <br></br>
            <input
              required={true}
              type="text"
              name="longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Name <br></br>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Describe your place to guests <br></br>
            <input
              required={true}
              minLength="30"
              type="textarea"
              value={description}
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </label>
        </div>

        <div>
          <label>
            Create a title for your spot <br></br>
            <input
              required={true}
              type="text"
              value={title}
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Set a base price for your spot <br></br>
            <input
              required={true}
              type="number"
              name="base price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            ></input>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default SpotEdit;
