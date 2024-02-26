export const getDataFromTables = () => {
  const initialAmount = parseFloat(
    document.getElementById("initialAmount").value
  );
  const interestRate = parseFloat(
    document.getElementById("interestRate").value
  );
  const numberOfDays = parseFloat(
    document.getElementById("numberOfDays").value
  );
  return { initialAmount, interestRate, numberOfDays };
};

export const calculatePersent = () => {
  const { initialAmount, interestRate, numberOfDays } = getDataFromTables();
  let result = initialAmount;
  const tableData = [];
  for (let i = 1; i <= numberOfDays; i++) {
    result += result * (interestRate / 100);
    tableData.push({
      day: i,
      expectedAmount: result.toFixed(2),
      actualAmount: result.toFixed(2),
      difference: "",
    });
  }
  renderTable(tableData);
};

export const renderTable = (tableData) => {
  const resultsBody = document.getElementById("resultsBody");
  resultsBody.innerHTML = "";
  tableData.forEach((rowData) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${rowData.day}</td>
      <td>${rowData.expectedAmount}</td>
      <td><input value=${rowData.actualAmount} type="number" class="realAmountInput" placeholder="Введите сумму" /></td>
      <td class="differenceCell">${rowData.difference}</td>
    `;
    resultsBody.appendChild(newRow);
    handleActualAmountInput(newRow.querySelector(".realAmountInput"), newRow);
  });
};

const arrowUpImageUrl = "src/icons/arrowUpImageUrl.png";
const arrowDownImageUrl = "src/icons/arrowDownImageUrl.png";

const handleActualAmountInput = (input, row) => {
  input.addEventListener("input", function () {
    const realAmount = parseFloat(this.value);
    const differenceCell = row.querySelector(".differenceCell");
    if (!isNaN(realAmount)) {
      const expectedAmount = parseFloat(
        row.querySelector("td:nth-child(2)").textContent
      );
      const difference = ((realAmount - expectedAmount) / expectedAmount) * 100;
      differenceCell.textContent = difference.toFixed(2) + "%";
      if (difference > 0) {
        setCellStyles(differenceCell, "green", `url(${arrowUpImageUrl})`);
      } else if (difference < 0) {
        setCellStyles(differenceCell, "red", `url(${arrowDownImageUrl})`);
      } else {
        setCellStyles(differenceCell, "black", "");
      }
    } else {
      differenceCell.textContent = "";
    }
  });
};
export const updateArrows = (tableData) => {
  const differenceCells = document.querySelectorAll(".differenceCell");
  differenceCells.forEach((cell, index) => {
    const difference = parseFloat(tableData[index].difference);
    if (!isNaN(difference)) {
      if (difference > 0) {
        setCellStyles(cell, "green", `url(${arrowUpImageUrl})`);
      } else if (difference < 0) {
        setCellStyles(cell, "red", `url(${arrowDownImageUrl})`);
      } else {
        setCellStyles(cell, "black", "");
      }
    }
  });
};
export const copyTables = () => {
  const { initialAmount, interestRate, numberOfDays } = getDataFromTables();
  if (isNaN(initialAmount) || isNaN(interestRate) || isNaN(numberOfDays)) {
    renderToast("Нету данных", "negative");
    return;
  }
  const container = document.createElement("div");
  container.innerHTML = ` <p>Начальная сумма: ${initialAmount}</p>
  <p>Процентная ставка (%): ${interestRate}</p>
  <p>Количество дней: ${numberOfDays}</p>
  `;

  const resultsTable = document.getElementById("resultsTable").cloneNode(true);
  container.appendChild(resultsTable);

  document.body.appendChild(container);

  const range = document.createRange();
  range.selectNode(container);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();

  container.remove();
  renderToast("Успешно скопировано", "positive");
};

export const downloadFormAndTable = () => {
  const { initialAmount, interestRate, numberOfDays } = getDataFromTables();
  const formData = `Начальная сумма: ${initialAmount}, Процентная ставка (%): ${interestRate}, Количество дней: ${numberOfDays}`;

  if (isNaN(initialAmount) || isNaN(interestRate) || isNaN(numberOfDays)) {
    renderToast("Пустая таблица.", "negative");
    return;
  }

  const mainTable = document.getElementById("resultsTable");
  const mainTableContent = createCSVContent(mainTable);

  const csvContent = formData + "\n\n" + mainTableContent;

  const blob = new Blob([csvContent], { type: "text/csv" });

  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = "form_and_table.csv";

  downloadLink.click();
  renderToast("Успешно скачано", "positive");
};

function createCSVContent(table) {
  let csvContent = "";

  table.querySelectorAll("tr").forEach((row) => {
    const rowData = [];

    row.querySelectorAll("th, td").forEach((cell) => {
      rowData.push(cell.innerText);
    });
    csvContent += rowData.join(" ") + "\n";
  });

  return csvContent;
}

export const saveDataToLocalStorage = () => {
  const resultsBody = document.getElementById("resultsBody");
  const data = [];

  resultsBody.querySelectorAll("tr").forEach((row) => {
    const rowData = {};
    const cells = row.querySelectorAll("td");
    rowData.day = cells[0].textContent;
    rowData.expectedAmount = cells[1].textContent;
    rowData.actualAmount = cells[2].querySelector("input").value; // Значение из инпута
    rowData.difference = cells[3].textContent;
    data.push(rowData);
  });
  localStorage.setItem("tableData", JSON.stringify(data));
};

const setCellStyles = (cell, color, backgroundImage) => {
  cell.style.color = color;
  cell.style.paddingRight = "21px";
  cell.style.backgroundImage = backgroundImage;
  cell.style.backgroundRepeat = "no-repeat";
  cell.style.backgroundSize = "25px 25px";
  cell.style.backgroundPositionX = "right";
  cell.style.backgroundPositionY = "6px";
};

const renderToast = (
  message,
  type,
  duration = 3000,
  gravity = "top",
  position = "left"
) => {
  let backgroundGradient;
  if (type === "positive") {
    backgroundGradient = "linear-gradient(to right, #00b09b, #96c93d)";
  } else if (type === "negative") {
    backgroundGradient = "linear-gradient(to right, #ff0040, #803470)";
  }
  Toastify({
    text: message,
    duration: duration,
    close: true,
    gravity: gravity,
    position: position,
    stopOnFocus: true,
    style: {
      background: backgroundGradient,
    },
  }).showToast();
};
