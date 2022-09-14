const axios = require("axios");
const cheerio = require("cheerio");
const ObjectToCSV = require("objects-to-csv");

f1Table = [];

(async function () {
    const response = await axios('https://www.formula1.com/en/results.html/2022/drivers.html');
    const html = await response.data;
    const $ = cheerio.load(html);

    var counter = 1;

    const allRows = $("table.resultsarchive-table > tbody > tr");
    allRows.each((index, element) => {
        const tds = $(element).find('td');

        var driverClean = $(tds[2]).text().replace(/\n(?:[ ]){2,}|[A-Z]{3}/g, "");
        var lastName = driverClean.replace(/[A-Z][a-z]+/, "");
        var firstName = driverClean.replace(lastName, "");
        const driver = firstName + " " + lastName;
        const nationality = $(tds[3]).text();
        const team = $(tds[4]).text().replace(/\n(?:[ ]){2,}/g, "");
        const points = $(tds[5]).text();
        f1Table.push({
            'Pos': counter,
            'Driver': driver,
            'Nationality': nationality,
            'Team': team,
            'Points': points
        });
        counter++;
    });

    console.log('Saving Data');
    const csv = new ObjectToCSV(f1Table);
    await csv.toDisk('./f1Data.csv');
    console.log('Data saved');
})();
