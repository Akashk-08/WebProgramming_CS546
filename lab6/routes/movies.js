//require express and express router as shown in lecture code
import { Router } from "express";
import { movieData } from "../data/index.js";
import {validateMovieData} from "../helpers.js"

import { ObjectId } from "mongodb";

const router = Router();

const validateMovieId = (id) => {
  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    throw new Error('Invalid movie ID: must be a non-empty string');
  }
  if (!ObjectId.isValid(id.trim())) {
    throw new Error('Invalid movie ID: not a valid ObjectId');
  }
};

const validateString = (str, fieldName) => {
  if (typeof str !== 'string' || str.trim().length === 0) {
    throw new Error(`Invalid ${fieldName}: must be a non-empty string`);
  }
};

const validateGenres = (genres) => {
  if (!Array.isArray(genres) || genres.length === 0) {
    throw new Error('Genres must be a non-empty array');
  }
  for (const genre of genres) {
    if (typeof genre !== 'string' || genre.trim().length === 0) {
      throw new Error('Each genre must be a non-empty string');
    }
  }
};

const validateCastMembers = (castMembers) => {
  if (!Array.isArray(castMembers) || castMembers.length === 0) {
    throw new Error('Cast members must be a non-empty array');
  }
  for (const member of castMembers) {
    if (typeof member !== 'string' || member.trim().length === 0) {
      throw new Error('Each cast member must be a non-empty string');
    }
  }
};

const validateDate = (date) => {
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/((19|20)\d{2})$/;
  if (!dateRegex.test(date)) {
    throw new Error('Invalid date format: must be MM/DD/YYYY');
  }
  const [month, day, year] = date.split('/').map(Number);
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear + 2) {
    throw new Error(`Invalid year: must be between 1900 and ${currentYear + 2}`);
  }
};

const validateRuntime = (runtime) => {
  const runtimeRegex = /^([1-9]\d*)h (0|[1-5]\d)min$/;
  if (!runtimeRegex.test(runtime)) {
    throw new Error('Invalid runtime format: must be "#h #min"');
  }
};

const validateRating = (rating) => {
  const validRatings = ["G", "PG", "PG-13", "R", "NC-17"];
  if (!validRatings.includes(rating)) {
    throw new Error(`Invalid rating: must be one of ${validRatings.join(', ')}`);
  }
};

router
  .route('/')
  .get(async (req, res) => {
    try {
      const movies = await movieData.getAllMovies();
      const simplifiedMovies = movies.map(movies => ({
        _id: movies._id,
        title: movies.title
      }));
      return res.json(simplifiedMovies);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }  })
  .post(async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty' });
    }
    try {
      const { title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime } = req.body;
      if (!title || !plot || !genres || !rating || !studio || 
        !director || !castMembers || !dateReleased || !runtime) {
      return res.status(400).json({ error: 'All fields must be provided' });
    }
      validateString(title, 'title');
      validateString(plot, 'plot');
      validateRating(rating);
      validateString(studio, 'studio');
      validateString(director, 'director');
      validateString(dateReleased, 'date released');
      validateString(runtime, 'runtime');
      validateGenres(genres);
      validateCastMembers(castMembers);
      validateDate(dateReleased);
      validateRuntime(runtime);

      const newMovie = await movieData.createMovie(
        title.trim(),
        plot.trim(),
        genres.map(g => g.trim()),
        rating.trim(),
        studio.trim(),
        director.trim(),
        castMembers.map(c => c.trim()),
        dateReleased.trim(),
        runtime.trim()
      );

      return res.status(201).json(newMovie);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  
  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    const movieId = req.params.movieId;
    try {
      const result= await movieData.getMovieById(movieId)
      return res.status(200).json(result);
    } catch (e) {
      return res.status(404).json({ error: e });
    }  })
  .delete(async (req, res) => {
    try {
      validateMovieId(req.params.movieId);
      await movieData.removeMovie(req.params.movieId.trim());
      return res.json({ 
        movieId: req.params.movieId.trim(), 
        deleted: true 
      });
    } catch (e) {
      if (e.message.includes('not found')) {
        return res.status(404).json({ error: e.message });
      }
      return res.status(400).json({ error: e.message });
    }  })
  .put(async (req, res) => {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }
    if (!title || !plot || !genres || !rating || !studio || !director || !castMembers || !dateReleased || !runtime) {
      return res.status(400).json({ error: 'All fields must be provided' });
    }
    try {
      validateMovieId(req.params.movieId);
      validateMovieData(req.body);
      
      const updatedMovie = await movieData.updateMovie(
        req.params.movieId.trim(),
        req.body.title,
        req.body.plot,
        req.body.genres,
        req.body.rating,
        req.body.studio,
        req.body.director,
        req.body.castMembers,
        req.body.dateReleased,
        req.body.runtime
      );
      return res.json(updatedMovie);
    } catch (e) {
      if (e.message.includes('not found')) {
        return res.status(404).json({ error: e.message });
      }
      return res.status(400).json({ error: e.message });
    }  });

    export default router; 