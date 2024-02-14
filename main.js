import { calculatePersent } from "./functions.js";
import { copyTables } from "./functions.js";
import { downloadFormAndTable } from "./functions.js";
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
