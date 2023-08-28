import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import "./GetAllSpots.css";


const SpotForm = () => {

  const history = useHistory()

  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [previewImage, setPreviewImage] = useState('')
  const [smallImage1, setSmallImage1] = useState('')
  const [smallImage2, setSmallImage2] = useState('')
  const [smallImage3, setSmallImage3] = useState('')
  const [smallImage4, setSmallImage4] = useState('')
  const [validationErrors, setValidationErrors] = useState({})


  useEffect(() => {
    const errors = {}
    setValidationErrors(errors)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const submittedForm = {
     country,
     address,
     city,
     state,
     description,
     title,
     basePrice,
     previewImage,
     smallImage1,
     smallImage2,
     smallImage3,
     smallImage4
    }
    console.log(submittedForm)
    history.push('/')  //    /spot/:spotId
    setCountry('')
    setAddress('')
    setCity('')
    setState('')
    setDescription('')
    setTitle('')
    setBasePrice('')
    setPreviewImage('')
    setSmallImage1('')
    setSmallImage2('')
    setSmallImage3('')
    setSmallImage4('')
    setValidationErrors({})
  }



  return (
    <form
      className="spot-form"
      // onSubmit={handleSubmit}
    >
      <h4>Country</h4>
      <label>
       Country
        <input
          type="text"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      {/* {validationErrors.name && <p className='errors'>{validationErrors.name} </p>} */}
      <label>
        Street Address
        <input
        type="text"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        >
        </input>
      </label>
      <label>
        City
        <input
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      {/* {validationErrors.sweetness && <p className='errors'>{validationErrors.sweetness} </p>} */}
      <label>
        Describe your place to guests
        <input
          type="textarea"
          value={description}
          name="seeds"
          onChange={(e) => {
            setDescription(e.target.value)
          }}
        />
      </label>
        Create a title for your spot
      <label>
        <input
          type="text"
          value={title}
          name="title"
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
      </label>
      Set a base price for your spot
      <input
        type="number"
        name="base price"
        value={setBasePrice}
        onChange={(e) => {
          setBasePrice(e.target.value)
        }}
      >
      </input>
      Liven up your spot with photos
      <input
        type="url"
        name="priview image URL"
        value={previewImage}
        onChange={(e) => {
          setPreviewImage(e.target.value)
        }}
      >
      </input>
      <input
        type="url"
        name="image URL"
        value={smallImage1}
        onChange={(e) => {
          setSmallImage1(e.target.value)
        }}
      >
      </input>
      <input
        type="url"
        name="image URL"
        value={smallImage2}
        onChange={(e) => {
          setSmallImage2(e.target.value)
        }}
      >
      </input>
      <input
        type="url"
        name="image URL"
        value={smallImage3}
        onChange={(e) => {
          setSmallImage3(e.target.value)
        }}
      >
      </input>
      <input
        type="url"
        name="priview image URL"
        value={smallImage4}
        onChange={(e) => {
          setSmallImage4(e.target.value)
        }}
      >
      </input>
      <button
        type="submit"
      >
        Create Spot
      </button>
    </form>
  );
}



export default SpotForm
