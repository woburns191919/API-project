import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { createSpot } from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";
import { thunkSpotCreateSpot, thunkGetEditSpot, thunkPutEditSpot, thunkSpotImageCreateSpot  } from "../../store/spots";

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
    imageObj.forEach((obj) => {
      obj.url && newImageArray.push(obj);
    });

    // console.log('1st new imageArr****', newImageArray)

    try {
      // console.log(' from created spotimage*******', newImageArray)
      // console.log("created spot id****", createdSpot.id)
      const createdSpot = await dispatch(thunkSpotCreateSpot(payload, user));
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
        <h4>Create a new Spot</h4>
        <label>
          Country <br></br>
          <input
            type="text"
            required="true"
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
              required="true"
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
              required="true"
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
              required="true"
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
              required="true"
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
              required="true"
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
              required="true"
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
              required="true"
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
              required="true"
              type="number"
              name="base price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Liven up your spot with photos <br></br>
            <input
              required="true"
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
            required="true"
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
