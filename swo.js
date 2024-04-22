import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Swo() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch student data
    axios.get('http://localhost:8081/student')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  const handleApprove = () => {
    // Validate student details
    if (
      !selectedStudent.Name ||
      !selectedStudent.USN ||
      !selectedStudent.travelStartDate ||
      !selectedStudent.travelReturnDate
    ) {
      setSuccessMessage('');
      setErrorMessage('Some details have not been filled, please verify once more.');
      return; // Exit function if details are not filled properly
    }

    // Send selected student data to the backend to approve
    axios.post('http://localhost:8081/approval', {
      stdname: selectedStudent.Name,
      usn: selectedStudent.USN,
      sdate: selectedStudent.travelStartDate,
      rdate: selectedStudent.travelReturnDate
    })
    .then(response => {
      console.log('Student approved successfully:', response.data);
      setSuccessMessage('Student approved successfully.');
      setErrorMessage('');
      // Optionally, you can handle success behavior such as updating UI or showing a message
    })
    .catch(error => {
      console.error('Error approving student:', error);
      // Optionally, you can handle error behavior such as showing an error message
    });
  };

  const handleReject = () => {
    setShowDetails(false); // Hide student details
    setSelectedStudent(null); // Clear selected student
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Details</h2>
      {!showDetails && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {students.map(student => (
            <div key={student.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => handleStudentSelect(student)}
                  >
                    {student.Name} - {student.eventname}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showDetails && selectedStudent && (
        <div className="mt-4">
          <h3>Selected Student Details</h3>
          <p><strong>Name:</strong> {selectedStudent.Name}</p>
          <p><strong>USN:</strong> {selectedStudent.USN}</p>
          <p><strong>Department:</strong> {selectedStudent.Dept}</p>
          <p><strong>Semester:</strong> {selectedStudent.Sem}</p>
          <p><strong>Event Name:</strong> {selectedStudent.eventname}</p>
          <p><strong>Event College:</strong> {selectedStudent.eventclg}</p>
          <p><strong>Event Date:</strong> {selectedStudent.eventdate}</p>
          <p><strong>Event Place:</strong> {selectedStudent.eventplace}</p>
          <p><strong>Team mate Name:</strong> {selectedStudent.mateName}</p>
          <p><strong>team mate USN:</strong> {selectedStudent.mateUSN}</p>
          <p><strong>team mate Department:</strong> {selectedStudent.mateDept}</p>
          <p><strong>Travel Place:</strong> {selectedStudent.travelPlace}</p>
          <p><strong>Travel Start Date:</strong> {selectedStudent.travelStartDate}</p>
          <p><strong>Travel Return Date:</strong> {selectedStudent.travelReturnDate}</p>
          <p><strong>Travel Stay:</strong> {selectedStudent.travelStay}</p>
          {/* Extra lines for displaying contact details */}
          <p><strong>Father's Name:</strong> {selectedStudent.Fname}</p>
          <p><strong>Father's Number:</strong> {selectedStudent.fnumber}</p>
          <p><strong>Father's Department:</strong> {selectedStudent.fdept}</p>
          <p><strong>Parent's Name:</strong> {selectedStudent.pname}</p>
          <p><strong>Parent's Number:</strong> {selectedStudent.pnum}</p>
          <p><strong>Emergency Contact Name:</strong> {selectedStudent.ecname}</p>
          <p><strong>Emergency Contact Number:</strong> {selectedStudent.ecno}</p>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}
          <div className="mt-3">
            <button className="btn btn-success me-3" onClick={handleApprove}>Approve</button>
            <button className="btn btn-danger" onClick={handleReject}>Reject</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Swo;
