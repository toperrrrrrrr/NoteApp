const express = require("express");
const router = express.Router();
const database = require("../database");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router
   .get("/", (req, res) => {
      res.render("index");
   })
   .post("/", (req, res) => {
      const { noteTitle, noteBody } = req.body;
      database.createNote(noteTitle, noteBody, (error, result) => {
         if (error) {
            res.status(500).send("Error Saving Data, ERROR: " + error);
            return;
         }
         console.log("Data saved");
         res.status(201).redirect("/");
      });
   });

module.exports = router;
