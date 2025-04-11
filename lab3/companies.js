//Export the following functions using ES6 Syntax
import axios from "axios";

async function getCompanies() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json"
  );
  return data;
}

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json"
  );
  return data;
}

const validateCompanies = (param, paramName) => {
  if (param === undefined)
    throw new Error(`${paramName} parameter is required.`);
  if (typeof param !== "string")
    throw new Error(`${paramName} should be string.`);

  const trimmedParam = param.trim();
  if (trimmedParam === "") throw new Error(`${paramName} cannot be empty.`);
  return trimmedParam;
};

export const listEmployees = async (companyName) => {
  const trimmedCompanyName = validateCompanies(companyName, "Company Name");
  const companies = await getCompanies();
  const people = await getPeople();

  const company = companies.find(
    (c) => c.name.toLowerCase() === trimmedCompanyName.toLowerCase()
  );

  if (!company) throw new Error("No company Name was found.");

  const employees = people
    .filter((people) => people.company_id === company.id)
    .map((people) => `${people.first_name} ${people.last_name}`);

  employees.sort((a, b) => {
    const lastNameA = a.split(" ")[1].toLowerCase();
    const lastNameB = b.split(" ")[1].toLowerCase();
    return lastNameA.localeCompare(lastNameB);
  });

  return {
    ...company,
    employees,
  };
};

export const sameIndustry = async (industry) => {
  const trimmedIndustry = validateCompanies(industry, "Industry");
  const companies = await getCompanies();

  const sameCompanies = companies.filter(
    (c) => c.industry.toLowerCase() === trimmedIndustry.toLowerCase()
  );
  if (sameCompanies.length === 0)
    throw new Error("No companies in that industry.");

  return sameCompanies;
};

export const getCompanyById = async (id) => {
  const trimmedId = validateCompanies(id, "ID");
  const companies = await getCompanies();

  const company = companies.find((c) => c.id === trimmedId);

  if (!company) throw new Error("No company name found.");

  return company;
};
