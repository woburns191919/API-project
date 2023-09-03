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
  // console.log('current user****', user)

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

  if (!user) {
    alert("You must be logged in to create a spot!");
    history.push("/");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

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
      imageObj.forEach((obj) => {
        obj.url && newImageArray.push(obj);
      });

    // console.log('1st new imageArr****', newImageArray)

    try {
      // console.log(' from created spotimage*******', newImageArray)
      const createdSpot = await dispatch(thunkSpotCreateSpot(payload, user));
      console.log("created spot id****", createdSpot.id);
      if (!createdSpot.id) return null;
      else {
        // const spot = await dispatch(thunkSpotImageCreateSpot(imageObj, createdSpot.id))
        // imageObj.forEach(async (el) => await thunkSpotImageCreateSpot(el, createdSpot.id))
        for (let el of imageObj) {
          await dispatch(thunkSpotImageCreateSpot(el, createdSpot.id));
        }

        // setValidationErrors();
        history.push(`/spots/${createdSpot.id}`);
      }

      // } else if (createdSpot) {
      //   throw new Error('spot exists');
      // }
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //   const errors = {};
  //   setValidationErrors(errors);
  // }, []);

  // if (!createdSpot) return null;

  return (
    <main className="form-wrapper">
      <form className="spot-form" onSubmit={handleSubmit}>
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
                required={true}
                type="text"
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
                required={true}
                type="text"
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
            </p>
            <div className="textareadiv">
            <textarea
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
              className="most-boxes"
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
        <div className="basepricebox">
       <label>
            <h4>Set a base price for your spot </h4>
            <br></br>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>

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
              name="priview image URL"
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
            className="most-boxes"
            required={true}
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
          <button type="submit">Create Spot</button>
        </div>
      </form>
    </main>
  );
};

export default SpotForm;
