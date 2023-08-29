import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { createSpot } from '../../store/spots';
import { useDispatch } from "react-redux";
import { thunkCreateSpot } from "../../store/spots";
import "./GetAllSpots.css";

const SpotForm = () => {
  const history = useHistory();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [name, setName] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [smallImage1, setSmallImage1] = useState("");
  const [smallImage2, setSmallImage2] = useState("");
  const [smallImage3, setSmallImage3] = useState("");
  const [smallImage4, setSmallImage4] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(thunkCreateSpot())
  // }, [dispatch])

  useEffect(() => {
    const errors = {};
    setValidationErrors(errors);
  }, []);

  const handleSubmit = (e) => {
    console.log("in handle submit");
    e.preventDefault();
    const payload = {
      country,
      address,
      city,
      state,
      latitude,
      longitude,
      description,
      name,
      basePrice,
      title,
      previewImage,
      smallImage1,
      smallImage2,
      smallImage3,
      smallImage4,
    };

    try {
      const createdSpot = dispatch(thunkCreateSpot(payload));

      console.log("payload****", payload);
      history.push("/"); //    /spot/:spotId
      if (createdSpot.id) {
        setValidationErrors();
        history.push(`/spots/${createdSpot.id}`);
      }
    } catch (error) {
      console.log(error);
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
              type="text"
              name="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Longitude <br></br>
            <input
              type="text"
              name="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
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
              type="number"
              name="base price"
              value={basePrice}
              onChange={(e) => {
                setBasePrice(e.target.value);
              }}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Liven up your spot with photos <br></br>
            <input
              type="url"
              name="priview image URL"
              value={previewImage}
              onChange={(e) => {
                setPreviewImage(e.target.value);
              }}
            ></input>
          </label>
        </div>
        <div>
          <input
            type="url"
            name="image URL"
            value={smallImage1}
            onChange={(e) => {
              setSmallImage1(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            type="url"
            name="image URL"
            value={smallImage2}
            onChange={(e) => {
              setSmallImage2(e.target.value);
            }}
          ></input>
        </div>
        <input
          type="url"
          name="image URL"
          value={smallImage3}
          onChange={(e) => {
            setSmallImage3(e.target.value);
          }}
        ></input>
        <div>
          <input
            type="url"
            name="priview image URL"
            value={smallImage4}
            onChange={(e) => {
              setSmallImage4(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <button type="submit">Create Spot</button>
        </div>
      </form>
    </main>
  );
};

export default SpotForm;
