import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { createSpot } from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";
import {
  thunkSpotCreateSpot,
  thunkSpotImageCreateSpot,
} from "../../store/spots";
import "./form.css";
import "./GetAllSpots.css";

const SpotForm = () => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();


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
  const [previewImage, setPreviewImage] = useState("");
  const [smallImage1, setSmallImage1] = useState("");
  const [smallImage2, setSmallImage2] = useState("");
  const [smallImage3, setSmallImage3] = useState("");
  const [smallImage4, setSmallImage4] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [startDate, setStartDate] = useState('');
  const [formError, setFormError] = useState("");



  if (!user) {
    alert("You must be logged in to create a spot!");
    history.push("/");
  }


  const validateInputs = () => {
    const errors = {};
    if (!description || description.length < 30) {
      errors.description = "Description must be at least 30 characters long.";
    }
    if (!lat || lat < -90 || lat > 90) {
      errors.lat = "Latitude must be between -90 and 90.";
    }
    if (!lng || lng < -180 || lng > 180) {
      errors.lng = "Longitude must be between -180 and 180.";
    }

    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const payload = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };

    const imageObj = [
      {
        url: previewImage,
        preview: true,
      },
      {
        url: smallImage1,
        preview: false,
      },
      {
        url: smallImage2,
        preview: false,
      },
      {
        url: smallImage3,
        preview: false,
      },
      {
        url: smallImage4,
        preview: false,
      },
    ];
    const newImageArray = [];
    imageObj &&
      imageObj?.forEach((obj) => {
        obj.url && newImageArray.push(obj);
      });

    try {
      const createdSpot = await dispatch(thunkSpotCreateSpot(payload, user));
      console.log("created spot id****", createdSpot.id);
      if (!createdSpot.id) {
        return null;
      } else {
        for (let el of imageObj) {
          await dispatch(thunkSpotImageCreateSpot(el, createdSpot.id));
        }

        // setValidationErrors();
        history.push(`/spots/${createdSpot.id}`);
      }
    } catch (error) {
      setFormError(error.message || "An error occurred while creating the spot.");
    }
  };



  // if (!createdSpot) return null;

  return (
    <main className="form-wrapper">
      {formError && <div className="error-message">{formError}</div>}
      <form className="spot-form" onSubmit={handleSubmit} style={{marginTop: '70%'}}>
        <h3>Create a new Spot</h3>
        <div className="form-top-info">
          <h4>Where's your place located?</h4>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
        </div>
        <label htmlFor="Country">
          Country <br></br>
          <input
            placeholder="Country"
            className="most-boxes"
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
              placeholder="Address"
              className="most-boxes"
              type="text"
              required={true}
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </label>
        </div>

        <div className="citystatebox">
          <label className="citybox">
            City <br></br>
            <input
              placeholder="City"
              required={true}
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>

          <div className="statebox">
            <label>
              State <br></br>
              <input
                placeholder="STATE"
                required={true}
                type="text"
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="latlngbox">
          <div className="latbox">
            <label>
              Latitude <br></br>
              <input
                placeholder="Latitude"
                required={true}
                min="-90"
                max="90"
                type="number"
                name="latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </label>
          </div>
          <div className="lngbox">
            <label>
              Longitude <br></br>
              <input
                min="-180"
                max="180"
                placeholder="Longitude"
                required={true}
                type="number"
                name="longitude"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="textarea-description">
          <label>
            <h4>Describe your place to guests</h4> <br></br>
            <p>
              Mention the best features of your space, any special amentities
              like fast wifi or parking, and what you love about the
              neighborhood.
          {validationErrors.description && <div className="error-message">{validationErrors.description}</div>}
            </p>
            <div className="textareadiv">
              <textarea
                placeholder="Please write at least 30 characters"
                required={true}
                minLength="30"
                type="textarea"
                value={description}
                name="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </label>
        </div>

        <div className="titlebox">
          <label>
            <h4>Create a title for your spot</h4> <br></br>
            <p>
              Catch guests' attention with a spot title that highlights what
              makes your place special.
            </p>
            <input
              placeholder="Name of your spot"
              className="most-boxes"
              required={true}
              type="text"
              value={name}
              name="title"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="basepricebox">
          <label>
            <h4>Set a base price for your spot </h4>
            <br></br>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>

            <input
              placeholder="Price per night (USD)"
              required={true}
              type="number"
              min="0"
              name="base price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            ></input>
          </label>
        </div>
        <div className="outer-input-wrapper">
          <div>
            <label>
              <h4>Liven up your spot with photos </h4>
              <br></br>
              <p>Submit a link to at least one photo to publish your spot.</p>

              <input
                className="most-boxes"
                required={true}
                type="url"
                name="preview image URL"
                placeholder="Priview Image URL"
                value={previewImage}
                onChange={(e) => {
                  {
                    setPreviewImage(e.target.value);
                  }
                }}
              ></input>
            </label>
          </div>
          <div>
            <input
              placeholder="Image URL"
              className="most-boxes"
              // required={true}
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
              placeholder="Image URL"
              className="most-boxes"
              type="url"
              name="image URL"
              value={smallImage2}
              onChange={(e) => {
                setSmallImage2(e.target.value);
              }}
            ></input>
          </div>
          <input
            placeholder="Image URL"
            className="most-boxes"
            type="url"
            name="image URL"
            value={smallImage3}
            onChange={(e) => {
              setSmallImage3(e.target.value);
            }}
          ></input>
          <div>
            <input
              placeholder="Image URL"
              className="most-boxes"
              type="url"
              name="priview image URL"
              value={smallImage4}
              onChange={(e) => {
                setSmallImage4(e.target.value);
              }}
            ></input>
          </div>
        </div>

        <hr></hr>
        <div className="button-div">
          <button

          type="submit">Create Spot</button>
        </div>
      </form>
    </main>
  );
};

export default SpotForm;
