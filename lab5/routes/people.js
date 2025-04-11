//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getPeople() function in the /data/data.js file to return the list of people.  You can also import your getPersonById(id) function and call it in the :/id route.

import express from "express";
import { getPeople, getPersonById } from "../data/data.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const peopleList = await getPeople();
    return res.json(peopleList);
  } catch (e) {
    return res.status(500).send();
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const person = await getPersonById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Person not found!" });
    } else {
      return res.json(person);
    }
  } catch (e) {
    return res.status(500).send();
  }
});

export default router;
