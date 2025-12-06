import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";

const inputFile = path.join(__dirname, "input.txt");
const inputText = fs.readFileSync(inputFile, "utf8");
const inputs = inputText.split(/\r?\n/);

const ranges = new Array<Array<number>>();
for (const input of inputs) {
    if (input === '') break;
    const bounds = input.split('-').map(bound => parseInt(bound, 10));
    ranges.push([bounds[0], bounds[1]])
}

ranges.sort((a, b) => a[0] < b[0] ? -1 : 1);

let idCount = ranges[0][1] - ranges[0][0] + 1;
const existing = new Array<Array<number>>(ranges[0]);
for (let i = 1; i < ranges.length; i++) {
    const current = ranges[i];
    const maxExistingEnd = _.max(existing.map((e) => e[1])) ?? 0;
    if (current[1] > maxExistingEnd) {
        idCount += current[0] > maxExistingEnd ? current[1] - current[0] + 1 : current[1] - maxExistingEnd;
        existing.push(current);
    }
};

console.log('fresh id count:', idCount);