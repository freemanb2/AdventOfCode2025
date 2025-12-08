import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";

const inputFile = path.join(__dirname, "input.txt");
const inputText = fs.readFileSync(inputFile, "utf8");
const inputs = inputText.split(/\r?\n/);

const entrance = inputs[0].indexOf('S');

function getNextSplit(remainingPath: Array<string>, beamPosition: number): number {
    for (let i = 0; i < remainingPath.length; i++) {
        if (remainingPath[i].charAt(beamPosition) === '^') return i;
    }
    return -1;
}

let possibleTimelines = 1;
function parseTimeline(beamPositions: Array<boolean>, remainingPath: Array<string>, beamPosition: number) {
    beamPositions[beamPosition] = false;
    if (!beamPositions[beamPosition - 1]) {
        const nextSplit = getNextSplit(remainingPath, beamPosition - 1);
        if (nextSplit > -1) {
            const leftBeamPositions = beamPositions.slice();
            leftBeamPositions[beamPosition - 1] = true;
            parseTimeline(leftBeamPositions, remainingPath.slice(nextSplit), beamPosition - 1);
        }
    }

    if (!beamPositions[beamPosition + 1]) {
        possibleTimelines++;
        if (possibleTimelines % 10000000 === 0) console.log(possibleTimelines);
        const nextSplit = getNextSplit(remainingPath, beamPosition + 1);
        if (nextSplit > -1) {
            const rightBeamPositions = beamPositions.slice();
            rightBeamPositions[beamPosition + 1] = true;
            parseTimeline(rightBeamPositions, remainingPath.slice(nextSplit), beamPosition + 1);
        }
    }
}

const initialBeamPositions = new Array<boolean>(inputs[0].length).fill(false);
initialBeamPositions[entrance] = true;
const nextSplit = getNextSplit(inputs, entrance);
parseTimeline(initialBeamPositions.slice(), inputs.slice(nextSplit), entrance);

console.log(possibleTimelines);