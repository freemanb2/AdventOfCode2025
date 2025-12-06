import * as fs from "fs";
import * as path from "path";

const inputFile = path.join(__dirname, "input.txt");
const inputText = fs.readFileSync(inputFile, "utf8");
const inputs = inputText.split(/\r?\n/);

const ranges = new Array<Array<number>>();
const ingredients = new Array<number>();
let ingredientsFlag = false;
for (const input of inputs) {
    if (input === '') {
        ingredientsFlag = true;
        continue;
    }

    if (ingredientsFlag) {
        ingredients.push(parseInt(input, 10));
    }

    const bounds = input.split('-').map(bound => parseInt(bound, 10));
    ranges.push([bounds[0], bounds[1]])
}

ranges.sort((a, b) => a[0] < b[0] ? -1 : 1);

let freshCount = 0;
for (const id of ingredients) {
    for (const range of ranges) {
        if (id < range[0]) break;
        if (id >= range[0] && id <= range[1]) {
            freshCount++;
            break;
        }
    }
}

console.log(freshCount);