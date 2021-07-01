require('dotenv').config();

const Express = require("express"); 
const app = Express();
const dbConnection = require("./db");

const controllers = require("./controllers");

app.use(Express.json());

app.use("/user", controllers.usercontroller);

app.use(require("./middleware/validate-jwt"));
app.use(require("./middleware/headers"));
app.use("/log", controllers.logcontroller);

dbConnection.authenticate()
  .then(() => dbConnection.sync()) // => {force: true}
  .then(() => {
    app.listen(3000, () => {
      console.log(`[Server:workout-server ] App is listening on Port ${3000}`);
        });
  })
  .catch((err) => {
    console.log(`[Server:workout-server ]: Server Crashed. Error=${err}`);
    //console.error(err);
  });



