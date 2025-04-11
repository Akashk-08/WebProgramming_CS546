/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/
import {
  createMovie,
  getAllMovies,
  getMovieById,
  renameMovie,
  removeMovie,
} from "./data/movies.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";

async function main() {
  let one, three, five;
  const db = await dbConnection();
  await db.dropDatabase();

  try {
    // 1. Create a Movie of your choice.
    one = await createMovie(
      "Hackers",
      "Hackers are blamed for making a virus that will capsize five oil tankers.",
      ["Crime", "Drama", "Romance"],
      "PG-13",
      "United Artists",
      "Iain Softley",
      ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
      "09/15/1995",
      "1h 45min"
    );

    // 2. Log the newly created Movie.
    console.log(one);

    // 3. Create another movie of your choice.
    three = await createMovie(
      "The Breakfast Club",
      "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.",
      ["Comedy", "Drama"],
      "R",
      "Universal Pictures",
      "John Hughes",
      [
        "Judd Nelson",
        "Molly Ringwald",
        "Ally Sheedy",
        "Anthony Hall",
        "Emilio Estevez",
      ],
      "02/07/1985",
      "1h 37min"
    );

    // 4. Query all movies, and log them all.
    const allMovies = await getAllMovies();
    console.log(allMovies);

    // 5. Create the 3rd movie of your choice.
    five = await createMovie(
      "War Dogs",
      "Loosely based on the true story of two young men, David Packouz and Efraim Diveroli, who won a three hundred million dollar contract from the Pentagon to arm America's allies in Afghanistan.",
      ["Crime", "Dark comedy"],
      "PG-13",
      "Paramount Pictures",
      "Todd Phillips",
      ["Stephen Chin", "David packouz", "Daniel Berson"],
      "12/19/2014",
      "2h 30min"
    );

    // 6. Log the newly created 3rd movie.
    console.log(five);

    // 7. Rename the first movie (Hackers).
    const updatedHackers = await renameMovie(
      one._id.toString(),
      "Hackers: The Next Generation"
    );

    // 8. Log the first movie with the updated name.
    console.log(updatedHackers);

    // 9. Remove the second movie (three).
    const nine = await removeMovie(three._id.toString());
    console.log(nine);

    // 10. Query all movies and log them all.
    const remainingMovies = await getAllMovies();
    console.log(remainingMovies);
  } catch (error) {
    console.error(error);
  }

  // 11. Try to create a movie with bad input parameters to make sure it throws errors.
  try {
    const eleven = await createMovie(
      "Bad Movie",
      "",
      "Bad Genre",
      "Bad Rating",
      "Short",
      "Invalid",
      ["Short"],
      "32/15/2025",
      "3h 120min"
    );
  } catch (error) {
    console.log(error);
  }

  // 12. Try to remove a movie that does not exist to make sure it throws errors.
  try {
    const twelve = await removeMovie("507f1f77bcf86cd799439012");
  } catch (error) {
    console.log(error);
  }

  // 13. Try to rename a movie that does not exist to make sure it throws errors.
  try {
    const thirteen = await renameMovie("507f1f77bcf86cd799439012", "Forty Two");
  } catch (error) {
    console.log(error);
  }

  // 14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
  try {
    const fourteen = await renameMovie(one._id.toString(), "");
  } catch (error) {
    console.log(error);
  }

  // 15. Try getting a movie by ID that does not exist to make sure it throws errors.
  try {
    const fifteen = await getMovieById("507f1f77bcf86cd799439012");
  } catch (error) {
    console.log(error);
  } finally {
    await closeConnection();
    console.log("Done!");
  }
}
main();
