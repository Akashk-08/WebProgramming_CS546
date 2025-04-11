//Export the following functions using ES6 Syntax
import axios from "axios";

const validatePeople = (param, paramName) => {
  if (param === undefined)
    throw new Error(`${paramName} parameter is required.`);
  if (typeof param !== "string")
    throw new Error(`${paramName} must be a string.`);

  const trimmedParam = param.trim();
  if (trimmedParam === "") throw new Error(`${paramName} cannot be empty.`);

  return trimmedParam;
};

const ValidateCityAndState = (city, state) => {
  if (city === undefined || state === undefined)
    throw new Error("city and state parameter is required");
  if (typeof city !== "string" || typeof state != "string")
    throw new Error("city and state must be a string.");

  const trimmedCity = city.trim();
  const trimmedState = state.trim();

  if (trimmedCity === "" || trimmedState === "")
    throw new Error("City and state cannot be empty.");
  return { trimmedCity, trimmedState };
};

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json"
  );
  return data;
}

export const getPersonById = async (id) => {
  const trimId = validatePeople(id, "ID");
  const people = await getPeople();
  const person = people.find((p) => p.id === trimId);

  if (!person) throw new Error("Person not found.");

  return person;
};

export const sameJobTitle = async (jobTitle) => {
  const trimJobTitle = validatePeople(jobTitle, "Job title");
  const people = await getPeople();

  const normalizedJobTitle = trimJobTitle.toLowerCase();
  const samePeople = people.filter(
    (p) => p.job_title.toLowerCase() === normalizedJobTitle
  );

  if (samePeople.length < 2)
    throw new Error("since there are not two people with that job title");

  return samePeople;
};

export const getPostalCodes = async (city, state) => {
  const { trimmedCity, trimmedState } = ValidateCityAndState(city, state);
  const people = await getPeople();

  const postalCodes = people
    .filter(
      (p) =>
        p.city.toLowerCase() === trimmedCity.toLowerCase() &&
        p.state.toLowerCase() === trimmedState.toLowerCase()
    )
    .map((p) => p.postal_code);

  if (postalCodes.length === 0)
    throw new Error(
      "There are no postal_codes for the given city and state combination."
    );

  return postalCodes.sort((a, b) => parseInt(a) - parseInt(b));
};

export const sameCityAndState = async (city, state) => {
  const { trimmedCity, trimmedState } = ValidateCityAndState(city, state);

  const people = await getPeople();
  const Citizens = people
    .filter(
      (p) =>
        p.city.toLowerCase() === trimmedCity.toLowerCase() &&
        p.state.toLowerCase() === trimmedState.toLowerCase()
    )
    .map((p) => `${p.first_name} ${p.last_name}`);

  if (Citizens.length < 2)
    throw new Error(
      "There are not two people who live in the same city and state."
    );

  return Citizens.sort((a, b) => {
    const lastNameA = a.split(" ")[1].toLowerCase();
    const lastNameB = b.split(" ")[1].toLowerCase();
    return lastNameA.localeCompare(lastNameB);
  });
};
