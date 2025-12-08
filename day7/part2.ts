import * as fs from "fs";
import * as path from "path";

const inputFile = path.join(__dirname, "input.txt");
const inputText = fs.readFileSync(inputFile, "utf8");
const inputs = inputText.split(/\r?\n/);

function calculateTimeline(depth: number, beam: number): number {
    if (depth >= inputs.length - 1) {
        return 1;
    }

    if (memo[depth][beam] > -1) {
        return memo[depth][beam];
    }

    let count = 0;
    if (inputs[depth].charAt(beam) === '^') {
        count += calculateTimeline(depth + 1, beam - 1);
        count += calculateTimeline(depth + 1, beam + 1);
    } else {
        count += calculateTimeline(depth + 1, beam);
    }

    memo[depth][beam] = count;
    return count;
}

let memo = Array.from({ length: inputs.length }, () =>
    Array.from({ length: inputs[0].length }, () => -1)
);
const entrance = inputs[0].indexOf('S');
const possibleTimelines = calculateTimeline(1, entrance);

console.log(possibleTimelines);