//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getStocks() function in the /data/data.js file 3 to return the list of stocks and call it in the /stocks route.  You can also import your getStockById(id) function and call it in the :/id route.

import express from "express";
import { getStocks, getStockById } from "../data/data.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const stockList = await getStocks();
    return res.json(stockList);
  } catch (e) {
    return res.status(500).send();
  }
});
// Implement GET Request Method and send a JSON response See lecture code!

router.route("/:id").get(async (req, res) => {
  try {
    const stock = await getStockById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: "Stock Id not found!" });
    } else {
      return res.json(stock);
    }
  } catch (e) {
    return res.status(500).send();
  }
});
//Implement GET Request Method and send a JSON response See lecture code!

export default router;
