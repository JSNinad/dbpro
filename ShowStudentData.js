import React, { useState } from 'react';
import axios from 'axios';

const ShowStudentData = () => {
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`http://localhost:8081/swo/${studentId}`);
      setStudentData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Failed to fetch student data');
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchStudentData();
  };

  return (
    <div>
      <h2>Show Student Data</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={studentId} onChange={handleInputChange} placeholder="Enter student ID" />
        <button type="submit">Fetch Data</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {studentData && (
        <div>
          <h3>Student Details</h3>
          <p>Name: {studentData[0].Name}</p>
          <p>USN: {studentData[0].USN}</p>
          <p>Department: {studentData[0].Dept}</p>
          <h3>Events</h3>
          {studentData[1].map((event, index) => (
            <div key={index}>
              <p>Event Name: {event.eventName}</p>
              <p>Event College: {event.eventCollege}</p>
              <p>Event Date: {event.eventDate}</p>
              <p>Event Location: {event.eventLocation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowStudentData;
