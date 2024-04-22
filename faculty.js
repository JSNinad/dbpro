import React, { useState } from 'react';
import axios from 'axios';

function Faculty() {
  const [usn, setUsn] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/approval/${usn}`);
      if (response.data.length === 0) {
        setError('Student is not approved.');
        setStudentData(null);
      } else {
        setError('');
        setStudentData(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleAttendance = async () => {
    try {
      await axios.delete(`http://localhost:8081/approval/${usn}`);
      setStudentData(null);
      setError('');
      setUsn('');
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="container py-4">
      <h2>Search for Student Approval</h2>
      <div className="mb-3">
        <label htmlFor="usnInput" className="form-label">Enter Student USN:</label>
        <input
          type="text"
          className="form-control"
          id="usnInput"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
        />
      </div>
      <button className="btn btn-primary me-3" onClick={handleSubmit}>Submit</button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {studentData && (
        <div className="mt-4">
          <h3>Student Details</h3>
          <p><strong>Student Name:</strong> {studentData.stdname}</p>
          <p><strong>Start Date:</strong> {studentData.sdate}</p>
          <p><strong>Return Date:</strong> {studentData.rdate}</p>
          <button className="btn btn-danger mt-3" onClick={handleAttendance}>Mark Attendance</button>
        </div>
      )}
    </div>
  );
}

export default Faculty;
