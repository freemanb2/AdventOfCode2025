import * as fs from "fs";
import * as path from "path";

const inputFile = path.join(__dirname, "input.txt");
const inputText = fs.readFileSync(inputFile, "utf8");
const inputs = inputText.split(/\r?\n/);

const entrance = inputs[0].indexOf('S');
const beamPositions = new Array<boolean>(inputs[0].length).fill(false);
beamPositions[entrance] = true;

let splits = 0;
for (let i = 1; i < inputs.length; i++) {
    for (let j = 0; j < inputs[i].length; j++) {
        if (inputs[i].charAt(j) === '^') {
            if (beamPositions[j]) {
                splits++;
                beamPositions[j] = false;
                beamPositions[j - 1] = true;
                beamPositions[j + 1] = true;
            }
        }
    }
}

console.log(splits);