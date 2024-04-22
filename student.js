import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './images/sahadriimage.jpg'; // Import the image

function Student() {
  const [values, setValues] = useState({
    name: '',
    usn: '',
    dept: '',
    sem: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/student', values)
      .then((res) => {
        console.log('Student added successfully:', res.data);
        const studentID = res.data.id;
        navigate(`/add-event/${studentID}`);
      })
      .catch((err) => {
        console.log('Failed to add student:', err);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the imported image as background
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <div className="card-body">
                <h2 className="text-center mb-4">Student</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" id="name" name="name" value={values.name} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="usn" className="form-label">USN:</label>
                    <input type="text" id="usn" name="usn" value={values.usn} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dept" className="form-label">Department:</label>
                    <input type="text" id="dept" name="dept" value={values.dept} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sem" className="form-label">Semester:</label>
                    <input type="text" id="sem" name="sem" value={values.sem} onChange={handleChange} className="form-control" />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Next</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
