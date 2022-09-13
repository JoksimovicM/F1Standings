const axios = require("axios");
const cheerio = require("cheerio");
const ObjectToCSV = require("object-to-csv");

(async function () {
    const response = await axios('https://www.formula1.com/en/results.html/2022/drivers.html');
    const html = await response.data;
    const $ = cheerio.load(html);

    const allRows = $("table.resultsarchive-table > tbody > tr");
    allRows.each((index, element) => {
    const tds = $(element).find('td');

    var driverClean = $(tds[2]).text().replace(/\n(?:[ ]){2,}|[A-Z]{3}/g, "");
    var lastName = driverClean.replace(/[A-Z][a-z]+/, "");
    var firstName = driverClean.replace(lastName, "");
    var driver = firstName + " " + lastName;
    const nationality = $(tds[3]).text();
    const team = $(tds[4]).text().replace(/\n(?:[ ]){2,}/g, "");
    console.log(driver);
    console.log(nationality);
    console.log(team);
    });
})();
