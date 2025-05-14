//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.
import routesApi from "./routesApi.js";

const constructorMethod = (app) => {
  app.use("/", routesApi);

  app.use(/(.*)/, (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};
export default constructorMethod;