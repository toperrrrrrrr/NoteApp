const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE,
});

connection.connect((error) => {
   if (error) {
      console.log("Something went wrong: " + error.stack);
      return;
   }
   console.log("connected to the database;" + connection.threadId);
});

function executeQuery(query, params, callback) {
   connection.query(query, params, (error, result) => {
      if (error) {
         console.log("Error Executing The Query");
         callback(error, null);
         return;
      }
      callback(null, result);
   });
}

function createNote(title, notes, callback) {
   const query = "INSERT INTO NOTES (note_title, note_body) values (?,?)";
   executeQuery(query, [title, notes], callback);
}

module.exports = { createNote };
