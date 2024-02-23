

const mysql2 = require("mysql2");

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password:"",
  database:"student",
});

db.connect((error) => {
  if (error) {
    console.log(error);
  }
  console.log("Connected to database");
});

module.exports = db





  


module.exports = db;