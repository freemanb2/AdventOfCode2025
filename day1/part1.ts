import * as fs from "fs";
import * as path from "path";

let current = 50;
let zeroCount = 0;

const inputFile = path.join(__dirname, "input.txt");
const inputText = fs.readFileSync(inputFile, "utf8");
const rotations = inputText.split(/\r?\n/);

for (const rotation of rotations) {
    if (rotation.trim() === "") continue;
    rotate(rotation);
    console.log(`Current position: ${current}, zeroCount: ${zeroCount}`);
}

console.log(`Final zeroCount: ${zeroCount}`);

function rotate(rotation: string) {
    const direction = rotation.charAt(0) === "L" ? -1 : 1;
    const clicks = parseInt(rotation.slice(1), 10);

    current += direction * (clicks % 100);

    if (current < 0) {
        current += 100;
    } else if (current > 99) {
        current -= 100;
    }

    if (current === 0) {
        zeroCount++;
    }
}