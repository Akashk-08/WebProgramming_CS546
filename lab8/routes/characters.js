//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import {
  searchCharactersByName,
  getCharacterById,
} from "../data/characters.js";
import { Router } from "express";
const router = Router();

router.route("/").get(async (req, res) => {
  //code here for GET will render the home handlebars file
  res.render("home", { page_title: "Marvel Character Search." });
});

router.route("/searchmarveluniverse").post(async (req, res) => {
  try {
    const searchTerm = req.body.searchByCharactersName;

    if (
      !searchTerm ||
      typeof searchTerm !== "string" ||
      searchTerm.trim().length === 0
    ) {
      return res.status(400).render("error", {
        page_title: "Search Error",
        error: "Search cannot be empty or just spaces",
        layout: "main",
      });
    }

    const trimmedSearch = searchTerm.trim();
    const characters = await searchCharactersByName(trimmedSearch);

    const processedCharacters = characters.slice(0, 20).map((character) => {
      return {
        id: character.id,
        name: character.name,
        thumbnail: {
          path: character.thumbnail.path,
          extension: character.thumbnail.extension,
        },
      };
    });

    res.render("characterSearchResults", {
      page_title: "Search Results",
      searchTerm: trimmedSearch,
      characters: processedCharacters,
      layout: "main",
    });
  } catch (e) {
    res.status(500).render("error", {
      page_title: "Search Error",
      error: "Failed to perform search: " + e.message,
      layout: "main",
    });
  }
});

router.route("/character/:id").get(async (req, res) => {
  //code here for GET a single character
  try {
    const characterId = req.params.id;

    if (!characterId || !/^\d+$/.test(characterId)) {
      return res.status(400).render("error", {
        page_title: "Invalid ID",
        error: "Invalid character ID format",
        layout: "main",
      });
    }

    const characterData = await getCharacterById(characterId);

    if (!characterData?.data?.results?.length) {
      return res.status(404).render("error", {
        page_title: "Character Not Found",
        error: `No character found with ID ${characterId}`,
        layout: "main",
      });
    }

    const character = characterData.data.results[0];
    const imageUrl = character.thumbnail
      ? `${character.thumbnail.path.replace(
          "http:",
          "https:"
        )}/portrait_uncanny.${character.thumbnail.extension}`
      : "/images/default-character.jpg";

      res.render("characterById", {
        page_title: character.name,
        character: {
          id: character.id,
          name: character.name,
          description: character.description || "No description available",
          imageUrl: imageUrl,
          comics: character.comics
        },
        layout: "main",
      });
      } catch (e) {
    const status = e.message.includes("not found") ? 404 : 500;
    res.status(status).render("error", {
      page_title: "Error",
      error: e.message,
      layout: "main",
    });
  }
});

export default router;
