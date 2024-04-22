import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from './images/sahadriimage.jpg'; // Import the image

function AddEvent() {
  const { studentId } = useParams();
 
  const [values, setValues] = useState({
    eventName: '',
    eventDate: '',
    eventLocation: '',
    eventCollege: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:8081/add-event/${studentId}`, values)
      .then((res) => {
        console.log('Event added successfully:', res.data);
        navigate(`/Teammates/${studentId}`);
      })
      .catch((err) => {
        console.log('Failed to add event:', err);
      });
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the imported image as background
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
      }}
    >
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Add Event</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="eventName" className="form-label">Event Name:</label>
                <input type="text" id="eventName" name="eventName" value={values.eventName} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="eventDate" className="form-label">Event Date:</label>
                <input type="date" id="eventDate" name="eventDate" value={values.eventDate} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="eventLocation" className="form-label">Event Location:</label>
                <input type="text" id="eventLocation" name="eventLocation" value={values.eventLocation} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="eventCollege" className="form-label">Event College:</label>
                <input type="text" id="eventCollege" name="eventCollege" value={values.eventCollege} onChange={handleChange} className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary w-100">Next</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
