/*Here, you can export the data functions
to get the stocks, people, getStockById, getPersonById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/
import { getAllPeople, getAllStocks } from "../helpers.js";

const getStocks = async () => {
  return await getAllStocks();
};

const getPeople = async () => {
  return await getAllPeople();
};

const getStockById = async (id) => {
  if (!id.trim()) throw new Error("No Stock ID provided");
  const stocks = await getAllStocks();
  const stock = stocks.find((s) => s.id === id);
  return stock;
};

const getPersonById = async (id) => {
  if (!id.trim()) throw new Error("No Person Id Provided");
  const People = await getAllPeople();
  const person = People.find((p) => p.id === id);
  return person;
};

export { getStocks, getPeople, getStockById, getPersonById };
