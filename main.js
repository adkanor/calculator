import { calculatePersent } from "./src/scripts/functions.js";
import { copyTables } from "./src/scripts/functions.js";
import { downloadFormAndTable } from "./src/scripts/functions.js";
document.getElementById("calculator").addEventListener("submit", (event) => {
  event.preventDefault();
  calculatePersent();
});

document.getElementById("copyButton").addEventListener("click", function () {
  copyTables();
});

document
  .getElementById("downloadButton")
  .addEventListener("click", function () {
    downloadFormAndTable();
  });

// Forbidden negative numbers
// document.querySelectorAll(`input[type="number"]`).forEach((input) => {
//   input.addEventListener("input", function () {
//     if (parseFloat(this.value) < 0) {
//       this.value = "";
//     }
//   });
// });
