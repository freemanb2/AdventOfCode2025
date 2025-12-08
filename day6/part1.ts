import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";

const inputFile = path.join(__dirname, "input.txt");
const inputText = fs.readFileSync(inputFile, "utf8");
const inputs = inputText.split(/\r?\n/);

const operations = inputs[inputs.length - 1].split(' ').filter((i) => i !== '')
const problems = new Array<Array<string>>();

for (let line = 0; line < inputs.length - 1; line++) {
    const filteredLine = inputs[line].split(' ').filter((input) => input !== '');
    for (let nomial = 0; nomial < filteredLine.length; nomial++) {
        problems[nomial] = problems[nomial]?.concat(filteredLine[nomial]) ?? [filteredLine[nomial]];
    }
};

let grandTotal = 0;
for (let i = 0; i < problems.length; i++) {
    let total = operations[i] === '+' ? 0 : 1;
    for (const nomial of problems[i]) {
        let num = parseInt(nomial, 10);
        if (operations[i] === '+') {
            total += num
        } else {
            total *= num;
        }
    }
    grandTotal += total;
}

console.log('Grand Total:', grandTotal);