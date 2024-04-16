const express = require("express");
const port = 8081;
const app = express();
const path = require("path");

const notes = require("./server/routes/notes");

app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
   "/bootstrap",
   express.static(path.join(__dirname, "node_modules", "bootstrap", "dist"))
);

app.set("view engine", "ejs");
app.set("views", (__dirname, "./client/views"));

app.use("/notes", notes);

app.get("/", (req, res) => {
   console.log("Main page loaded");
   res.render("index");
});

//These are for checking whether the server can connect to the PORT
const serverListen = app.listen(port, () => {
   console.log(`Server is running on port ${port}.`);
});
serverListen.on("error", (err) => {
   console.error("Server startup error:", err);
});

// Staple functions for checking connections and making sure there is no error with the Server
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send("Something broke!" + err);
});

app.use((req, res, next) => {
   res.status(404).render("./main/404"); //calls the 404.ejs on the views folder
});
