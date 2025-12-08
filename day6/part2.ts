import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";

const inputFile = path.join(__dirname, "input.txt");
const inputText = fs.readFileSync(inputFile, "utf8");
const inputs = inputText.split(/\r?\n/);

const operations = inputs[inputs.length - 1];
let grandTotal = 0;

let currentOperation = operations.trimStart()[0];
let total = 0;
for (let i = 0; i < operations.length; i++) {
    if (_.every(inputs, (input) => input.charAt(i).trim() === '')) {
        grandTotal += total;
        total = 0;
    }
    if (operations.charAt(i).trim() !== '') {
        currentOperation = operations.charAt(i);
        total = currentOperation === '+' ? 0 : 1;
    }
    let nomial = '';
    for (let j = 0; j < inputs.length - 1; j++) {
        if (inputs[j][i].trim() === '') continue;
        nomial += inputs[j][i];
    }
    if (currentOperation === '+') {
        total += parseInt(nomial, 10);
    } else {
        total *= parseInt(nomial, 10);
    }
}
grandTotal += total;

console.log('Grand Total:', grandTotal);