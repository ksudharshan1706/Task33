const fs = require("fs");

const quote = "Veerayya Walter Veerayya!!! veede na era nuvve na sora";
i = 1;
const [, , limit] = process.argv;
console.log(limit);
while (i < limit) {
  fs.writeFile(`backup/text-${i}.html`, quote, (err) => {
    console.log("Completed Writing");
  });
  i += 1;
}
