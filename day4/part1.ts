import * as fs from "fs";
import * as path from "path";

const inputFile = path.join(__dirname, "input.txt");
const inputText = fs.readFileSync(inputFile, "utf8");
const rows = inputText.split(/\r?\n/);

const rowCount = rows.length;
const colCount = rows[0].length;

function checkAccessible(row: number, col: number): boolean {
    let rollCount = 0;
    if (row > 0) {
        if (rows[row - 1][col] === '@') rollCount++;
        if (col > 0) {
            if (rows[row - 1][col - 1] === '@') rollCount++;
        }
        if (col < colCount - 1) {
            if (rows[row - 1][col + 1] === '@') rollCount++;
        }
    }
    if (row < rowCount - 1) {
        if (rows[row + 1][col] === '@') rollCount++;
        if (col > 0) {
            if (rows[row + 1][col - 1] === '@') rollCount++;
        }
        if (col < colCount - 1) {
            if (rows[row + 1][col + 1] === '@') rollCount++;
        }
    }
    if (col > 0) {
        if (rows[row][col - 1] === '@') rollCount++;
    }
    if (col < colCount - 1) {
        if (rows[row][col + 1] === '@') rollCount++;
    }

    return rollCount < 4;
}

let accessibleCount = 0;
for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
        if (rows[row][col] === '@' && checkAccessible(row, col)) accessibleCount++;
    }
}

console.log(`Accessible Rolls: ${accessibleCount}`);