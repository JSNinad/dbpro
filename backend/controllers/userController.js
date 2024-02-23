const express = require("express");
const db = require("../connection");
const router = express.Router();

//register admin
router.post("/users",(req, res) => {
  try {
    const { name, usn} = req.body;

    console.log(req.body)

    db.query(
      "INSERT INTO login (name,usn) VALUES(?,?)",
      [name, usn],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.json({
            status: 401,
            success: false,
            message: error,
          });
        }
        console.log(" User created successfully");
        return res.json({
          status: 201,
          success: true,
          message: result,
        });
      }
    );
  } catch (error) {
    console.log(error)
    return res.json({
      status: 500,
      success: false,
      message: "Error adding users",
    });
  }
});

module.exports = router