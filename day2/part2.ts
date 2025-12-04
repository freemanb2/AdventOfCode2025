import * as fs from "fs";
import * as path from "path";

function validateRange(startId: number, endId: number) {
    for (let idx = startId; idx <= endId; idx++) {
        const id = idx.toString();
        for (let subLength = 1; subLength <= id.length / 2; subLength++) {
            const substr = id.substring(0, subLength);
            const repeated = substr.repeat(id.length / subLength);
            if (repeated === id) {
                invalidSum += idx;
                break;
            }
        }

    }
}

const inputFile = path.join(__dirname, "input.txt");
const inputText = fs.readFileSync(inputFile, "utf8");

let invalidSum = 0;
const ranges = inputText.split(',');
for (const range of ranges) {
    const [startId, endId] = range.split('-').map(id => parseInt(id.trim(), 10));
    validateRange(startId, endId);
}

console.log(`Sum of invalid IDs: ${invalidSum}`);
