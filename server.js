const express= require('express')
const mysql=require('mysql')
const cors=require('cors')
const bcrypt = require('bcrypt');

const app=express()
app.use(cors());
app.use(express.json());



const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'signup'
})

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });


app.post('/student', (req, res) => {
    const { name, usn, dept, sem } = req.body;
    const sql = 'INSERT INTO student (name, usn, dept, sem) VALUES (?, ?, ?, ?)';
    const values = [name, usn, dept, sem];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.status(200).json({ id: result.insertId });
    });
  });

  
  
  app.post('/add-event/:studentId', (req, res) => {
    const { studentId } = req.params;
    const { eventName, eventDate, eventLocation, eventCollege } = req.body;
    const sql = `INSERT INTO addevents (std_id, eventname, eventclg, eventdate, eventplace) VALUES (?, ?, ?, ?, ?)`;
    const values = [studentId, eventName, eventCollege, eventDate, eventLocation];
    db.query(sql, values, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json({ message: "Event added successfully!" });
    });
});





  app.get('/student', (req, res) => {
    const sql = `
      SELECT student.*, 
             addevents.eventname, 
             addevents.eventclg, 
             addevents.eventdate, 
             addevents.eventplace,
             mates.Name AS mateName,
             mates.USN AS mateUSN,
             mates.DEPT AS mateDept,
             traveldetails.Place AS travelPlace,
             traveldetails.startdate AS travelStartDate,
             traveldetails.returndate AS travelReturnDate,
             traveldetails.stay AS travelStay,
             contact.Fname,
             contact.fnumber,
             contact.fdept,
             contact.pname,
             contact.pnum,
             contact.ecname,
             contact.ecno
      FROM student
      LEFT JOIN addevents ON student.id = addevents.std_id
      LEFT JOIN mates ON student.id = mates.std_id
      LEFT JOIN traveldetails ON student.id = traveldetails.std_id
      LEFT JOIN contact ON student.id = contact.std_id
    `;
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching student data:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(result);
      }
    });
  });
  
  



  app.post('/traveldetails/:studentId', (req, res) => {
    const { studentId } = req.params;
  
    const { std_id, Place, startdate, returndate, stay } = req.body;
    const sql = `INSERT INTO traveldetails (std_id, Place, startdate, returndate, stay) VALUES (?, ?, ?, ?, ?)`;
    const values = [std_id, Place, startdate, returndate, stay];
    db.query(sql, values, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ message: "Travel details added successfully!" });
    });
  });
  app.post('/approve', (req, res) => {
    const { stdname, usn } = req.body;
  
    // Insert approved student details into the approved table
    const sql = 'INSERT INTO approved (stdname, usn) VALUES (?, ?)';
    const values = [stdname, usn];
    
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error approving student:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Student approved successfully:', result);
        res.status(200).send('Student approved successfully');
      }
    });
  });
  


    app.post('/approval', (req, res) => {
      const { stdname, usn, sdate, rdate } = req.body;
      const sql = `INSERT INTO approval (stdname, usn, sdate, rdate) VALUES (?, ?, ?, ?)`;
      const values = [stdname, usn, sdate, rdate];
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error approving student:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          
          res.status(200).json({ message: 'Student approved successfully' });
        }
      });
    });
    

    app.get('/approval/:usn', (req, res) => {
      const { usn } = req.params;
      const sql = 'SELECT * FROM approval WHERE usn = ?';
      db.query(sql, [usn], (err, result) => {
        if (err) {
          console.error('Error fetching student data:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.json(result);
        }
      });
    });
    
    // Define a DELETE endpoint to delete a student from the approval table by USN
    app.delete('/approval/:usn', (req, res) => {
      const { usn } = req.params;
      const sql = 'DELETE FROM approval WHERE usn = ?';
      db.query(sql, [usn], (err, result) => {
        if (err) {
          console.error('Error deleting student:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('Student deleted successfully');
        }
      });
    });

  app.get('/approval', (req, res) => {
    const sql = 'SELECT * FROM approval';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching approved students:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(result);
      }
    });
  });

  app.post('/mates/:studentId', (req, res) => {
    const { studentId } = req.params;
    
    const { std_id, Name, USN, DEPT } = req.body;
    const sql = `INSERT INTO mates (std_id, Name, USN, DEPT) VALUES (?, ?, ?, ?)`;
    const values = [std_id, Name, USN, DEPT];
    db.query(sql, values, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ message: "Teammate added successfully!" });
    });
  });

  app.post('/contact/:studentId', (req, res) => {
    const { studentId } = req.params;
    const { std_id, Fname, fnumber, fdept, pname, pnum, ecname, ecno } = req.body;
  
    const sql = `INSERT INTO contact (std_id, Fname, fnumber, fdept, pname, pnum, ecname, ecno) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [std_id, Fname, fnumber, fdept, pname, pnum, ecname, ecno];
  
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error('Error adding contact details:', err);
        return res.status(500).json({ error: 'Failed to add contact details.' });
      }
      return res.status(200).json({ message: 'Contact details added successfully.' });
    });
  });
  
  
app.listen(8081,()=>{
    console.log("its working bro chill");
})