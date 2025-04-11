/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import people from "./people.js");

async function main(){
    try{
        const peopledata = await people.getPeople();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
}

call main
main();
*/
import {
  getPersonById,
  sameJobTitle,
  getPostalCodes,
  sameCityAndState,
} from "./people.js";
import { listEmployees, sameIndustry, getCompanyById } from "./companies.js";

async function main() {
  try {
    const peopledata = await getPersonById(
      "fa36544d-bf92-4ed6-aa84-7085c6cb0440"
    );
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await getPersonById(-1);
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await getPersonById(1001);
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await getPersonById();
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await getPersonById(
      "989fa5e-5617-43f7-a931-46036f9dbcff"
    );
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameJobTitle("Help Desk Operator");
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await await sameJobTitle();
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameJobTitle("Staff Accountant IV");
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameJobTitle(123);
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameJobTitle(["Help Desk Operator"]);
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameJobTitle(true);
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await getPostalCodes("Salt Lake City", "Utah");
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await getPostalCodes();
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await getPostalCodes(13, 25);
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await getPostalCodes("Bayside", "New York");
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameCityAndState("Salt Lake City ", "Utah");
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameCityAndState();
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameCityAndState("      ", "         ");
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameCityAndState(2, 29);
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameCityAndState("Bayside", "New York");
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  //Companies

  try {
    const peopledata = await listEmployees("Yost, Harris and Cormier");
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await listEmployees("Kemmer-Mohr");
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await listEmployees("Will-Harvey");
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await listEmployees("foobar");
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await listEmployees(123);
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameIndustry("Auto Parts:O.E.M.");
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameIndustry(43);
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameIndustry(" ");
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameIndustry("Foobar Industry");
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await sameIndustry();
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await getCompanyById(
      "fb90892a-f7b9-4687-b497-d3b4606faddf"
    );
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await getCompanyById(-1);
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await getCompanyById(1001);
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await getCompanyById();
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }

  try {
    const peopledata = await getCompanyById(
      "7989fa5e-5617-43f7-a931-46036f9dbcff"
    );
    console.log(peopledata);
  } catch (e) {
    console.error("Error:", e.message);
  }
}
main();
