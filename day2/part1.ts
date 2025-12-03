import * as fs from "fs";
import * as path from "path";

function enumerateRange(startId: number, endId: number) {
    console.log(`Enumerating IDs from ${startId} to ${endId}`);
    for (let idx = startId; idx <= endId; idx++) {
        const id = idx.toString();

        const firstHalf = id.substring(0, id.length / 2);
        const secondHalf = id.substring(id.length / 2);

        if (firstHalf === secondHalf) {
            console.log(`Invalid ID found: ${id}`);
            invalidSum += idx;
        }
    }
}

const inputFile = path.join(__dirname, "input.txt");
const inputText = fs.readFileSync(inputFile, "utf8");

let invalidSum = 0;
const ranges = inputText.split(',');
for (const range of ranges) {
    console.log(`Range: ${range}`);
    const [startId, endId] = range.split('-').map(id => parseInt(id.trim(), 10));
    enumerateRange(startId, endId);
}

console.log(`Sum of invalid IDs: ${invalidSum}`);
