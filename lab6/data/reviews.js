import { ObjectId } from "mongodb";
import { movies } from "../config/mongoCollections.js";

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  if (!movieId || !reviewTitle || !reviewerName || !review || !rating) throw new Error("All Fields need to have valid values");
  if (typeof movieId !== "string" || movieId.trim().length === 0) throw new Error("Movie ID must be a non-empty string");
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw new Error("Invalid movie ID");


  const movie = await movieCollection.findOne({ _id: new ObjectId(movieId) });
  if (!movie) throw new Error("Movie not found");

  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const year = today.getFullYear();
  const reviewDate = `${month}/${day}/${year}`;

  const newReview = {
    _id: new ObjectId(),
    reviewTitle: reviewTitle.trim(),
    reviewDate,
    reviewerName: reviewerName.trim(),
    review: review.trim(),
    rating: parseFloat(rating.toFixed(1))
  };

  const updateInfo = await movieCollection.updateOne(
    { _id: new ObjectId(movieId) },
    { $push: { reviews: newReview } }
  );

  if (updateInfo.modifiedCount === 0)
    throw new Error("Could not add review to movie");

  const updatedMovie = await movieCollection.findOne({ _id: new ObjectId(movieId) });
  const reviews = updatedMovie.reviews;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = parseFloat((totalRating / reviews.length).toFixed(1));

  await movieCollection.updateOne(
    { _id: new ObjectId(movieId) },
    { $set: { overallRating: averageRating } }
  );

  return newReview;
};

const getAllReviews = async (movieId) => {
  if (!movieId) throw new Error("Movie Id must be provided");
  if (typeof movieId !== "string" || movieId.trim().length === 0) throw new Error("Movie Id must be non-empty string");
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw new Error("Invalid movie Id");

  const movieCollection = await movies();
  const movie = await movieCollection.findOne({ _id: new ObjectId(movieId) });

  if (!movie) throw new Error("Movie not found");

  if (!movie.reviews || movie.reviews.length === 0) return [];

  return movie.reviews.map(review => ({
    ...review,
    _id: review._id.toString(),
    movieId: movieId
  }));
};

const getReview = async (reviewId) => {
  if (!reviewId) throw new Error("reviewId must be provided");
  if (typeof reviewId !== "string" || reviewId.trim().length === 0) throw new Error("reviewId must be non-empty string");
  reviewId = reviewId.trim();
  if (!ObjectId.isValid(reviewId)) throw new Error("Invalid reviewId");
  
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({ "reviews._id": new ObjectId(reviewId) });
  
  if (!movie) throw new Error("Review not found");
  
  const review = movie.reviews.find(r => r._id.toString() === reviewId);
  if (!review) throw new Error("Review not found");

  return {
    _id: review._id.toString(),
    reviewTitle: review.reviewTitle,
    reviewDate: review.reviewDate,
    reviewerName: review.reviewerName,
    review: review.review,
    rating: review.rating
  };
};

const removeReview = async (reviewId) => {
  if (!reviewId) throw new Error("reviewId must be provided");
  if (typeof reviewId !== "string" || reviewId.trim().length === 0) throw new Error("reviewId must be non-empty string");
  reviewId = reviewId.trim();
  if (!ObjectId.isValid(reviewId)) throw new Error("Invalid reviewId");
  
  const movieCollection = await movies();
  
  const movie = await movieCollection.findOne({ "reviews._id": new ObjectId(reviewId) });
  if (!movie) throw new Error("Review not found");

  const updateResult = await movieCollection.updateOne(
    { "reviews._id": new ObjectId(reviewId) },
    { $pull: { reviews: { _id: new ObjectId(reviewId) } } }
  );

  if (updateResult.modifiedCount === 0) throw new Error("Could not remove review");

  const updatedMovie = await movieCollection.findOne({ _id: movie._id });
  let newAverage = 0;
  
  if (updatedMovie.reviews && updatedMovie.reviews.length > 0) {
    const total = updatedMovie.reviews.reduce((sum, r) => sum + r.rating, 0);
    newAverage = parseFloat((total / updatedMovie.reviews.length).toFixed(1));
  }

  await movieCollection.updateOne(
    { _id: movie._id },
    { $set: { overallRating: newAverage } }
  );

  return { reviewId, deleted: true };
};

export { createReview, getAllReviews, getReview, removeReview }