import * as fs from "fs";
import * as path from "path";

function validateRange(startId: number, endId: number) {
    for (let idx = startId; idx <= endId; idx++) {
        const id = idx.toString();

        const firstHalf = id.substring(0, id.length / 2);
        const secondHalf = id.substring(id.length / 2);

        if (firstHalf === secondHalf) {
            invalidSum += idx;
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
