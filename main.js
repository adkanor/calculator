import { calculatePersent } from "./src/scripts/functions.js";
import { copyTables } from "./src/scripts/functions.js";
import { downloadFormAndTable } from "./src/scripts/functions.js";
import { saveDataToLocalStorage } from "./src/scripts/functions.js";
document.getElementById("calculator").addEventListener("submit", (event) => {
  event.preventDefault();
  calculatePersent();
  saveDataToLocalStorage();
});

document.getElementById("copyButton").addEventListener("click", function () {
  copyTables();
});

document
  .getElementById("downloadButton")
  .addEventListener("click", function () {
    downloadFormAndTable();
  });
document.addEventListener("DOMContentLoaded", () => {
  const savedData = localStorage.getItem("calculatorData");

  if (savedData) {
    const { initialAmount, interestRate, numberOfDays } = JSON.parse(savedData);
    document.getElementById("initialAmount").value = initialAmount;
    document.getElementById("interestRate").value = interestRate;
    document.getElementById("numberOfDays").value = numberOfDays;
    calculatePersent();
  }
});
// Forbidden negative numbers
// document.querySelectorAll(`input[type="number"]`).forEach((input) => {
//   input.addEventListener("input", function () {
//     if (parseFloat(this.value) < 0) {
//       this.value = "";
//     }
//   });
// });
