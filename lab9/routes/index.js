//Here you will import route files and export them as used in previous labs.
import arraySortRoutes from "./arraySort.js";

const constructorMethod = (app) => {
    app.use("/", arraySortRoutes);

    app.use(/(.*)/, (req, res) => {
        res.status(404).json({ error: "Route Not Found" });
    });
};

export default constructorMethod;