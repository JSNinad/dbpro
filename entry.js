import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './images/sahadriimage.jpg'; // Import the image

function MorphedDisplay() {
  
  const afyaraInfo = (
    <div className=" bg-light p-4 rounded ">
      <h2 className="text-dark">About Us </h2>
    
      <div className="container" style={{ maxWidth: '600px' }}>
  <p className="text-dark">Welcome to Sahyadri College's Student Extracurricular Event Registration Platform!</p>

  <p className="text-dark">Our platform simplifies event registration for students, offering a seamless experience to explore and sign up for a variety of extracurricular activities. Whether it's sports, cultural festivals, technical competitions, or community service, we're here to help you make the most of your college experience.</p>

  <p className="text-dark">We believe that involvement in extracurricular activities is key to holistic student development. Our user-friendly system allows you to browse upcoming events and sign up with ease. Join us in celebrating talent, passion, and camaraderie as we embrace the vibrant extracurricular scene at Sahyadri.</p>
</div>


    </div>
  );

  return (
    <div className="position-absolute start-0 top-50 translate-middle-y ms-5">
      {afyaraInfo}
    </div>
  );
}

function Entry() {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', position: 'relative' }}>
      <MorphedDisplay />
      <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-end">
        <h1 className="display-1 position-absolute top-0 start-50 translate-middle-x mt-5" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Event Registration Form</h1>
        <div className="text-center mb-5">
          <div className=" text-primary" role="status"></div>
        </div>
        <div className="d-grid gap-4 me-5">

        <span className="visually px-5 text-danger fw-bold fs-5">Please select your position</span>

          <Link to="/std" className="btn btn-primary btn-lg px-5">Student</Link>
          <Link to="/secretlogin" className="btn btn-secondary btn-lg px-5">Faculty</Link>
          <Link to="/secret" className="btn btn-success btn-lg px-5">SWO</Link>
          <Link to="/approve" className="btn btn-info btn-lg px-5">Check approved list</Link>
        </div>
      </div>
    </div>
  );
}

export default Entry;
