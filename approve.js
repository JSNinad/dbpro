import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Approve() {
  const [approvedList, setApprovedList] = useState([]);
  const [messagePosition, setMessagePosition] = useState(0);

  useEffect(() => {
    // Fetch approved student data
    axios.get('http://localhost:8081/approval')
      .then(response => {
        setApprovedList(response.data);
      })
      .catch(error => {
        console.error('Error fetching approved students:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessagePosition(prevPosition => prevPosition + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const renderMessage = () => {
    return (
      <div
        className="position-absolute start-0"
        style={{ top: '50px', left: `${messagePosition}px`, zIndex: '1000' }}
      >
        {/* <div className="alert alert-info" role="alert">
          Please check the approval list from the below list. All the best!
        </div> */}
      </div>
    );
  };

  return (
    <div className="container py-4">
      {renderMessage()}
      <h2 className="mb-4">Approved Students List</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Student Name</th>
            <th scope="col">USN</th>
          </tr>
        </thead>
        <tbody>
          {approvedList.map(student => (
            <tr key={student.id}>
              <td>{student.stdname}</td>
              <td>{student.usn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Approve;
