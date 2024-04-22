import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import backgroundImage from './images/sahadriimage.jpg'; // Import the image

function Travel() {
    const { studentId } = useParams();
    const [values, setValues] = useState({
      std_id: studentId,
      Place:'',
      startdate: '',
      returndate: '',
      stay : ''
    });
  

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8081/traveldetails/${studentId}`, values)
          .then((res) => {
            console.log(' added successfully:', res.data);
            toast.success('Thank you for submitting. Please visit Check approved list by Tomorrow.'); // Show success message
            
          })
          .catch((err) => {
            console.log('Failed to add:', err);
            toast.error('Failed to submit. Please try again.'); // Show error message
          });
      };

      return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card mt-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                  <div className="card-body">
                    <h2 className="text-center mb-4">Add Travel details</h2>
                    <form onSubmit={handleSubmit}>
                      {/* <div className="mb-3">
                        <label htmlFor="std_id" className="form-label">Student ID:</label>
                        <input type="text" id="std_id" name="std_id" value={values.std_id} onChange={handleChange} className="form-control" />
                      </div> */}
                        <div className="mb-3">
                        <label htmlFor="Place" className="form-label">Place:</label>
                        <input type="text" id="Place" name="Place" value={values.Place} onChange={handleChange} className="form-control" />
                      </div>
                      <div className="mb-3">
                         <label htmlFor="startdate" className="form-label">startdate:</label>
                        <input type="date" id="startdate" name="startdate" value={values.startdate} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                         <label htmlFor="returndate" className="form-label">returndate:</label>
                        <input type="date" id="returndate" name="returndate" value={values.returndate} onChange={handleChange} className="form-control" />
                        </div>
                      <div className="mb-3">
                        <label htmlFor="stay" className="form-label">stay:</label>
                        <input type="text" id="stay" name="stay" value={values.stay} onChange={handleChange} className="form-control" />
                      </div>
                      <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer /> {/* Add the ToastContainer */}
        </div>
      );
    }
    
    export default Travel;
