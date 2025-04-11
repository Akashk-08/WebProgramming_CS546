//here is where you'll set up your server as shown in lecture code.
import express from "express";
const app = express();
import configRoutesFunction from "./routes/index.js";
app.use(express.json());
configRoutesFunction(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Server is running on http://localhost:3000");
});