import {
  calculatePersent,
  copyTables,
  downloadFormAndTable,
  saveDataToLocalStorage,
  renderTable,
  updateArrows,
} from "./src/scripts/functions.js";

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
document.addEventListener("DOMContentLoaded", function () {
  const resultsBody = document.getElementById("resultsBody");

  resultsBody.addEventListener("input", function (event) {
    if (event.target.classList.contains("realAmountInput")) {
      saveDataToLocalStorage();
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const tableData = JSON.parse(localStorage.getItem("tableData"));
  if (tableData) {
    renderTable(tableData);
    updateArrows(tableData);
  }
  const initialData = JSON.parse(localStorage.getItem("initialData"));
  if (initialData) {
    document.getElementById("initialAmount").value = initialData.initialAmount;
    document.getElementById("interestRate").value = initialData.interestRate;
    document.getElementById("numberOfDays").value = initialData.numberOfDays;
  }
});
