//require express and express router as shown in lecture code

import { Router } from "express";
import { movieData, reviewData } from "../data/index.js";
import { validateMovieId } from "../helpers.js";
import {
  createReview,
  getAllReviews,
  getReview,
  removeReview,
} from "../data/reviews.js";
import { ObjectId } from "mongodb";

const router = Router();

const validateReviewId = (id) => {
  function validateReviewId(id) {
    if (!id || typeof id !== 'string' || !ObjectId.isValid(id.trim())) {
        throw { status: 400, message: 'Invalid reviewId' };
    }
}
  if (!ObjectId.isValid(id.trim())) {
    throw new Error("Invalid review ID: not a valid ObjectId");
  }
};

const validateReviewData = (reviewData) => {
  const requiredFields = ["reviewTitle", "reviewerName", "review", "rating"];
  const stringFields = ["reviewTitle", "reviewerName", "review"];

  for (const field of requiredFields) {
    if (reviewData[field] === undefined) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  for (const field of stringFields) {
    if (
      typeof reviewData[field] !== "string" ||
      reviewData[field].trim().length === 0
    ) {
      throw new Error(`Invalid ${field}: must be a non-empty string`);
    }
  }

  if (typeof reviewData.rating !== "number" || isNaN(reviewData.rating)) {
    throw new Error("Rating must be a number");
  }
  if (reviewData.rating < 1 || reviewData.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  if (Math.round(reviewData.rating * 10) !== reviewData.rating * 10) {
    throw new Error("Rating can only have one decimal place");
  }
};

router
  .route("/:movieId")
  .get(async (req, res) => {
    try {
      validateMovieId(req.params.movieId);
      const movieId = req.params.movieId.trim();

      const movie = await movieData.getMovieById(movieId);

      if (!movie.reviews || movie.reviews.length === 0) {
        return res
          .status(404)
          .json({ error: "No reviews found for this movie" });
      }

      return res.json(
        movie.reviews.map((review) => ({
          _id: review._id.toString(),
          reviewTitle: review.reviewTitle,
          reviewDate: review.reviewDate,
          reviewerName: review.reviewerName,
          review: review.review,
          rating: review.rating,
        }))
      );
    } catch (e) {
      if (
        e.message.includes("not found") ||
        e.message.includes("No reviews found")
      ) {
        return res.status(404).json({ error: e.message });
      }
      return res.status(400).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    try {
      const movieId = req.params.movieId;
      validateMovieId(movieId);
      validateReviewData(req.body);

      const trimmedMovieId = movieId.trim();
      const { reviewTitle, reviewerName, review, rating } = req.body;

      const updatedMovie = await reviewData.createReview(
        trimmedMovieId,
        reviewTitle,
        reviewerName,
        review,
        rating
      );
      return res.status(200).json(updatedMovie);
    }  catch (e) {
      if (typeof e === 'string') {
        return res.status(404).json({ error: e });
      } else {
        console.error(e);
        return res.status(500).json({ error: 'Failed to add review' });
      }
    }
  });

router
  .route("/review/:reviewId")
  .get(async (req, res) => {
    try {
      const reviewId = req.params.reviewId?.trim();
      validateReviewId(reviewId);

      const review = await reviewData.getReview(reviewId);
      if (!review) {
          return res.status(404).json({ error: 'Review not found' });
      }

      return res.status(200).json({
          _id: review._id.toString(),
          reviewTitle: review.reviewTitle,
          reviewDate: review.reviewDate,
          reviewerName: review.reviewerName,
          review: review.review,
          rating: review.rating
      });
  } catch (e) {
      if (e.status === 400) {
          return res.status(400).json({ error: e.message });
      }
      return res.status(404).json({ error: 'Review not found' });
  }
  })
  .delete(async (req, res) => {
    const reviewId = req.params.reviewId;

    if (!reviewId || typeof reviewId !== 'string') {
      return res.status(400).json({ error: 'Review ID must be a non-empty string' });
    }
  
    const trimmedId = reviewId.trim();
    if (!trimmedId) {
      return res.status(400).json({ error: 'Review ID cannot be empty' });
    }
  
    if (!ObjectId.isValid(trimmedId)) {
      return res.status(400).json({ error: "Invalid Review ID" });
    }
    try {
      const updatedMovie = await reviewData.removeReview(trimmedId);
      return res.status(200).json(updatedMovie);
    } catch (e) {
      if (typeof e === 'string' && e === 'Review not found') {
        return res.status(404).json({ error: e });
      } else {
        return res.status(500).json({ error: e });
      }
    }   });
export default router;
