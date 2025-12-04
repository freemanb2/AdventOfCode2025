import * as fs from "fs";
import * as path from "path";

function getLargestJoltage(bank: string): number {
    let largestJoltage = 0;
    for (let idx = 0; idx < bank.length; idx++) {
        const currentJoltage = parseInt(bank.charAt(idx));
        if (currentJoltage > largestJoltage) {
            largestJoltage = currentJoltage;
        }
    }
    return largestJoltage;
}

function calculateMaxJoltage(bank: string): number {
    const largestJoltage = getLargestJoltage(bank).toString();
    if (bank.indexOf(largestJoltage) === bank.length - 1) {
        const nextLargestJoltage = getLargestJoltage(bank.replace(largestJoltage, ''))
        return parseInt(nextLargestJoltage + largestJoltage)
    } else {
        const nextLargestJoltage = getLargestJoltage(bank.substring(bank.indexOf(largestJoltage) + 1))
        return parseInt(largestJoltage + nextLargestJoltage);
    }
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