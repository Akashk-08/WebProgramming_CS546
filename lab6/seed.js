import { createMovie } from "./data/movies.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js"

const seed = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

  try {
    await createMovie(
      "The Dark Knight",
      "Batman raises the stakes in his war on crime.",
      ["Action", "Crime", "Drama"],
      "PG-13",
      "Warner Bros",
      "Christopher Nolan",
      ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      "07/18/2008",
      "2h 32min"
    );

    await createMovie(
      "A Silent Voice",
      "A young boy seeks redemption after bullying a deaf girl.",
      ["Animation", "Drama", "Romance"],
      "PG-13",
      "Kyoto Animation",
      "Naoko Yamada",
      ["Miyu Irino", "Saori Hayami", "Aoii Yuki"],
      "09/17/2016",
      "2h 10min"
    );

    await createMovie(
        "Dangal 2016",
        "Former wrestler trains his daughters to become world-class wrestlers.",
        ["Sports Drama", "Biographical"],
        "PG",
        "Aamir Khan Productions",
        "Nitesh Tiwari",
        ["Aamir Khan", "Sakshi Tanwar", "Fatima Shaikh"],
        "12/21/2016",
        "2h 41min"
    );


     console.log("Movies successfully seeded!");
  } catch (e) {
    console.error("Error seeding movies:", e);
  }

  await closeConnection();
};

seed();
