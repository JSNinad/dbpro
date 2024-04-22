import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './images/sahadriimage.jpg'; // Import the image


function Contact() {
    const { studentId } = useParams();
  const [values, setValues] = useState({
    std_id: studentId,
    Fname: '',
    fnumber: '',
    fdept: '',
    pname: '',
    pnum: '',
    ecname: '',
    ecno: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:8081/contact/${studentId}`, values)
      .then((res) => {
        console.log('Data added successfully:', res.data);
        navigate(`/travel/${studentId}`);
      })
      .catch((err) => {
        console.log('Failed to add data:', err);
        // Optionally, you can show an error message
      });
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
              <div className="card-body">
                <h2 className="text-center mb-4">Contact Details</h2>
                <form onSubmit={handleSubmit}>
                  {/* <div className="mb-3">
                    <label htmlFor="std_id" className="form-label">Student ID:</label>
                    <input type="text" id="std_id" name="std_id" value={values.std_id} onChange={handleChange} className="form-control" />
                  </div> */}
                  <div className="mb-3">
                    <label htmlFor="Fname" className="form-label">Faculty's Name:</label>
                    <input type="text" id="Fname" name="Fname" value={values.Fname} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fnumber" className="form-label">Faculty's Phone Number:</label>
                    <input type="text" id="fnumber" name="fnumber" value={values.fnumber} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fdept" className="form-label">Faculty's Department:</label>
                    <input type="text" id="fdept" name="fdept" value={values.fdept} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pname" className="form-label">Parent's Name:</label>
                    <input type="text" id="pname" name="pname" value={values.pname} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pnum" className="form-label">Parent's Phone Number:</label>
                    <input type="text" id="pnum" name="pnum" value={values.pnum} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ecname" className="form-label">Event coordinator Name:</label>
                    <input type="text" id="ecname" name="ecname" value={values.ecname} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ecno" className="form-label">Event coordinator:</label>
                    <input type="text" id="ecno" name="ecno" value={values.ecno} onChange={handleChange} className="form-control" />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
