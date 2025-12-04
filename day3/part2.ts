import * as fs from "fs";
import * as path from "path";

function getLargestJoltageSequence(bank: string, startIndex: number, buffer: number): string {
    if (buffer < 0) return '';
    const remainingBank = bank.substring(startIndex, bank.length - buffer);
    const largestJoltage = getLargestJoltage(remainingBank);
    return largestJoltage + getLargestJoltageSequence(bank, startIndex + remainingBank.indexOf(largestJoltage) + 1, buffer - 1);
}

function getLargestJoltage(bank: string): string {
    let largestJoltage = 0;
    for (let idx = 0; idx < bank.length; idx++) {
        const currentJoltage = parseInt(bank.charAt(idx));
        if (currentJoltage > largestJoltage) {
            largestJoltage = currentJoltage;
        }
    }
    return largestJoltage.toString();
}

function calculateMaxJoltage(bank: string): number {
    return parseInt(getLargestJoltageSequence(bank, 0, 11));
}

const inputFile = path.join(__dirname, "input.txt");
const inputText = fs.readFileSync(inputFile, "utf8");
const banks = inputText.split(/\r?\n/);

let sumMaxJoltages = 0;
for (const bank of banks) {
    const maxJoltage = calculateMaxJoltage(bank)
    sumMaxJoltages += maxJoltage;
}

console.log(`Total ouput joltage: ${sumMaxJoltages}`);