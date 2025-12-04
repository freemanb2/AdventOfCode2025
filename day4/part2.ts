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
        if (['@', 'x'].includes(rows[row - 1][col])) rollCount++;
        if (col > 0) {
            if (['@', 'x'].includes(rows[row - 1][col - 1])) rollCount++;
        }
        if (col < colCount - 1) {
            if (['@', 'x'].includes(rows[row - 1][col + 1])) rollCount++;
        }
    }
    if (row < rowCount - 1) {
        if (['@', 'x'].includes(rows[row + 1][col])) rollCount++;
        if (col > 0) {
            if (['@', 'x'].includes(rows[row + 1][col - 1])) rollCount++;
        }
        if (col < colCount - 1) {
            if (['@', 'x'].includes(rows[row + 1][col + 1])) rollCount++;
        }
    }
    if (col > 0) {
        if (['@', 'x'].includes(rows[row][col - 1])) rollCount++;
    }
    if (col < colCount - 1) {
        if (['@', 'x'].includes(rows[row][col + 1])) rollCount++;
    }

    return rollCount < 4;
}

function updateMark(row: number, col: number, mark: string) {
    const updatedRow = [...rows[row]];
    updatedRow[col] = mark;
    rows[row] = updatedRow.join('');
}

let rollsRemoved = 0;
function removeMarkedRolls() {
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (rows[row][col] === 'x') {
                updateMark(row, col, '.')
                rollsRemoved++;
            }
        }
    }
}

while (true) {
    let rollsMarked = 0;
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (rows[row][col] === '@' && checkAccessible(row, col)) {
                updateMark(row, col, 'x')
                rollsMarked++;
            }
        }
    }

    if (rollsMarked === 0) break;
    removeMarkedRolls();
}

console.log(`Rolls removed: ${rollsRemoved}`);