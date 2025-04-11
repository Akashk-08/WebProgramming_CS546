import { movies } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

//export the following functions using ES6 syntax
const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  if (
    !title ||
    typeof title !== "string" ||
    title.trim().length < 2 ||
    !/^[a-zA-Z0-9 ]+$/.test(title.trim())
  )
    throw new Error("Invalid title");
  if (!plot || typeof plot !== "string" || plot.trim().length === 0)
    throw new Error("Invalid plot");
  if (
    !studio ||
    typeof studio !== "string" ||
    studio.trim().length < 5 ||
    !/^[a-zA-Z ]+$/.test(studio.trim())
  )
    throw new Error("Invalid Studio");
  if (
    !director ||
    typeof director !== "string" ||
    !/^[a-zA-Z]{3,} [a-zA-Z]{3,}$/.test(director.trim())
  )
    throw new Error("Invalid director");
  if (
    !rating ||
    typeof rating !== "string" ||
    !["G", "PG", "PG-13", "R", "NC-17"].includes(rating)
  )
    throw new Error("Invalid rating");
  if (
    !Array.isArray(genres) ||
    genres.length === 0 ||
    !genres.every(
      (g) =>
        typeof g === "string" &&
        g.trim().length >= 5 &&
        /^[a-zA-Z ]+$/.test(g.trim())
    )
  )
    throw new Error("Invalid genres");
  if (
    !Array.isArray(castMembers) ||
    castMembers.length === 0 ||
    !castMembers.every(
      (c) =>
        typeof c === "string" && /^[a-zA-Z]{3,} [a-zA-Z]{3,}$/.test(c.trim())
    )
  )
    throw new Error("Invalid cast members");
  if (
    !/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/([1-9][0-9]{3})$/.test(
      dateReleased
    )
  )
    throw new Error("Invalid date format");
  const [month, day, year] = dateReleased.split("/").map(Number);
  const releaseDate = new Date(year, month - 1, day);
  const currentYear = new Date().getFullYear();
  if (
    releaseDate.getFullYear() < 1900 ||
    releaseDate.getFullYear() > currentYear + 2
  )
    throw new Error("Invalid date range");
  if (
    !/^\d+h \d{1,2}min$/.test(runtime) ||
    parseInt(runtime.match(/\d+min/)[0]) > 59 ||
    parseInt(runtime.match(/^\d+/)[0]) < 1 ||
    (parseInt(runtime.match(/^\d+/)[0]) === 1 &&
      parseInt(runtime.match(/\d+min/)[0]) < 31)
  )
    throw new Error("Invalid runtime");

  const movieCollection = await movies();
  const newMovie = {
    title: title.trim(),
    plot: plot.trim(),
    genres: genres.map((g) => g.trim()),
    rating: rating.trim(),
    studio: studio.trim(),
    director: director.trim(),
    castMembers: castMembers.map((c) => c.trim()),
    dateReleased: dateReleased.trim(),
    runtime: runtime.trim(),
  };
  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw new Error("Could not add movie");
  const newId = insertInfo.insertedId.toString();
  const product = await getMovieById(newId);
  return product;
};

const getAllMovies = async () => {
  const movieCollection = await movies();
  let allMovieArr = await movieCollection.find({}).toArray();
  allMovieArr = allMovieArr.map((movie) => {
    movie._id = movie._id.toString();
    return movie;
  });
  return allMovieArr;
};

const getMovieById = async (id) => {
  if (!id) throw new Error("Id must be provided");
  if (typeof id !== "string" || id.trim().length === 0)
    throw new Error("Id must be a non-empty string");
  id = id.trim();
  if (!ObjectId.isValid(id)) throw new Error("Invalid ObjectId");

  const movieCollection = await movies();
  const movie = await movieCollection.findOne({ _id: new ObjectId(id) });
  if (!movie) throw new Error("Movie not found.");

  movie._id = movie._id.toString();
  return movie;
};

const removeMovie = async (id) => {
  if (!id) throw new Error("Id must be provided");
  if (typeof id !== "string" || id.trim().length === 0)
    throw new Error("Id must be a nonempty string");
  id = id.trim();
  if (!ObjectId.isValid(id)) throw new Error("Invalid ObjectId");

  const movieCollection = await movies();
  const movie = await movieCollection.findOne({ _id: new ObjectId(id) });
  if (!movie) throw new Error("movie name not found");
  const deletionInfo = await movieCollection.deleteOne({
    _id: new ObjectId(id),
  });

  if (!deletionInfo) {
    throw new Error(`Could not delete movie with id: ${id}`);
  }
  return `${movie.title} has been successfully deleted!`;
};

const renameMovie = async (id, newName) => {
  if (!id) throw new Error("Id must be provided");
  if (typeof id !== "string" || id.trim().length === 0)
    throw new Error("Id must be non-empty string");
  id = id.trim();
  if (!ObjectId.isValid(id)) throw new Error("Invalid ObjectId");
  if (!newName) throw new Error("no new name provided");
  if (typeof newName !== "string" || newName.trim().length === 0)
    throw new Error("new name must be non-empty string");
  newName = newName.trim();

  const movieCollection = await movies();

  const movie = await movieCollection.findOne({ _id: new ObjectId(id) });
  if (!movie) throw new Error("movie name not found");
  if (!movie.title === newName)
    throw new Error("new name is same as current title");

  const updateInfo = await movieCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { title: newName } }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw new Error("Movie Update failed ");
  const updatedMovie = await movieCollection.findOne({ _id: new ObjectId(id) });
  updatedMovie._id = updatedMovie._id.toString();

  return updatedMovie;
};
export { createMovie, getAllMovies, getMovieById, removeMovie, renameMovie };
