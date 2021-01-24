const csv = require("csv-parser");
const fs = require("fs");

function filterData(a) {
  fs.unlink(`${a}.txt`, (err) => {
    if (err) {
    } else {
      console.log(`${a}.txt successfully deleted`);
    }
  });

  const result = [];
  fs.createReadStream("input_countries.csv")
    .pipe(csv())
    .on("data", (row) => {
      const headers = Object.keys(row);
      if (row[headers[0]] == a) result.push(row);
    })
    .on("end", () => {
      fs.writeFile(`${a}.txt`, JSON.stringify(result), (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
    });
}

filterData("Canada");
filterData("United States");
