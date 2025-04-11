//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import { ObjectId } from "mongodb";

export const validateMovieId = (id) => {
  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    throw new Error('Invalid movie ID: must be a non-empty string');
  }
  if (!ObjectId.isValid(id.trim())) {
    throw new Error("movie ID: not a valid ObjectId");
  }
};

export const validateMovieData = (movieData) => {
  const requiredFields = ['title', 'plot', 'genres', 'rating', 'studio', 'director', 'castMembers', 'dateReleased', 'runtime'];
  const stringFields = ['title', 'plot', 'rating', 'studio', 'director', 'dateReleased', 'runtime'];

  for (const field of requiredFields) {
    if (movieData[field] === undefined) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  for (const field of stringFields) {
    if (typeof movieData[field] !== 'string' || movieData[field].trim().length === 0) {
      throw new Error(`Invalid ${field}: must be a non-empty string`);
    }
  }

  if (!Array.isArray(movieData.genres) || movieData.genres.length === 0) {
    throw new Error('Genres must be a non-empty array');
  }
  for (const genre of movieData.genres) {
    if (typeof genre !== 'string' || genre.trim().length === 0) {
      throw new Error('Each genre must be a non-empty string');
    }
  }

  if (!Array.isArray(movieData.castMembers) || movieData.castMembers.length === 0) {
    throw new Error('Cast members must be a non-empty array');
  }
  for (const member of movieData.castMembers) {
    if (typeof member !== 'string' || member.trim().length === 0) {
      throw new Error('Each cast member must be a non-empty string');
    }
  }

  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/((19|20)\d{2})$/;
  if (!dateRegex.test(movieData.dateReleased)) {
    throw new Error('Invalid date format: must be MM/DD/YYYY');
  }

  const [month, day, year] = movieData.dateReleased.split('/').map(Number);
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear + 2) {
    throw new Error(`Invalid year: must be between 1900 and ${currentYear + 2}`);
  }

  const runtimeRegex = /^([1-9]\d*)h (0|[1-5]\d)min$/;
  if (!runtimeRegex.test(movieData.runtime)) {
    throw new Error('Invalid runtime format: must be "#h #min"');
  }

  // Example validation functions (you may already have these)
};
