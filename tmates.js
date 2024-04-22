import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from './images/sahadriimage.jpg'; // Import the image

function Teammates() {
  const { studentId } = useParams();
  const [values, setValues] = useState({
    std_id: studentId,
    Name: '',
    USN: '',
    DEPT: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:8081/mates/${studentId}`, values)
      .then((res) => {
        console.log('Teammate added successfully:', res.data);
        navigate(`/contact/${studentId}`);
      })
      .catch((err) => {
        console.log('Failed to add teammate:', err);
      });
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
              <div className="card-body">
                <h2 className="text-center mb-4">Add Teammates</h2>
                <form onSubmit={handleSubmit}>
                  {/* <div className="mb-3">
                    <label htmlFor="std_id" className="form-label">Student ID:</label>
                    <input type="text" id="std_id" name="std_id" value={values.std_id} onChange={handleChange} className="form-control" />
                  </div> */}
                  <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name:</label>
                    <input type="text" id="Name" name="Name" value={values.Name} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="USN" className="form-label">USN:</label>
                    <input type="text" id="USN" name="USN" value={values.USN} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="DEPT" className="form-label">Department:</label>
                    <input type="text" id="DEPT" name="DEPT" value={values.DEPT} onChange={handleChange} className="form-control" />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">NEXT</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teammates;
