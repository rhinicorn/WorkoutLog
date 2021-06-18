const express = require("express");
const app = express();

const db= require("./db");
const controllers = require("./controllers");


app.use(require("./middleware/headers"));
//app.use(express.json());

db.authenticate()
  .then(() => db.sync()) // => {force: true}
  .then(() => {
    app.listen(3000, () =>
      console.log(`[Server:workout-server ] App is listening on Port ${3000}`)
    );
  })
  .catch((err) => {
    console.log("[Server:workout-server ] Server Crashed");
    console.error(err);
  });
















app.use("/user", controllers.usercontroller);
app.use("/log", controllers.logcontroller);



db.authenticate()
  .then(() => db.sync()) // => {force: true}
  .then(() => {
    app.listen(3000, () =>
      console.log(`[Server:workout-server ] App is listening on Port ${3000}`)
    );
  })
  .catch((err) => {
    console.log("[Server:workout-server ] Server Crashed");
    console.error(err);
  });
