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
  const resultsBody = document.getElementById("resultsBody");
  resultsBody.innerHTML = "";

  for (let i = 1; i <= numberOfDays; i++) {
    result += result * (interestRate / 100);
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
                    <td>${i}</td>
                    <td>${result.toFixed(2)}</td>
                    <td><input value=${result.toFixed(
                      2
                    )} type="number" class="realAmountInput" placeholder="Введите сумму" /></td>
                    <td class="differenceCell"></td>
                `;
    resultsBody.appendChild(newRow);
    handleActualAmountInput(newRow.querySelector(".realAmountInput"), newRow);
  }
};
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
    } else {
      differenceCell.textContent = "";
    }
  });
};

export const copyTables = () => {
  const { initialAmount, interestRate, numberOfDays } = getDataFromTables();
  if (isNaN(initialAmount) || isNaN(interestRate) || isNaN(numberOfDays)) {
    showNegativeToast("Нету данных");
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
  showPositiveToast("Успешно скопировано");
};

export const downloadFormAndTable = () => {
  const { initialAmount, interestRate, numberOfDays } = getDataFromTables();
  const formData = `Начальная сумма: ${initialAmount}, Процентная ставка (%): ${interestRate}, Количество дней: ${numberOfDays}`;

  if (isNaN(initialAmount) || isNaN(interestRate) || isNaN(numberOfDays)) {
    showNegativeToast("Пустая таблица.");
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
  showPositiveToast("Успешно скачано");
};

function createCSVContent(table) {
  let csvContent = "";

  table.querySelectorAll("tr").forEach((row) => {
    const rowData = [];

    row.querySelectorAll("th, td").forEach((cell) => {
      rowData.push(cell.innerText);
    });
    csvContent += rowData.join(",") + "\n";
  });

  return csvContent;
}

export const showNegativeToast = (
  message,
  duration = 3000,
  gravity = "top",
  position = "left"
) => {
  Toastify({
    text: message,
    duration: duration,
    close: true,
    gravity: gravity,
    position: position,
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #ff0040, #803470)", // Красный до бордового фиолетового
    },
  }).showToast();
};

export const showPositiveToast = (
  message,
  duration = 3000,
  gravity = "top",
  position = "left"
) => {
  Toastify({
    text: message,
    duration: duration,
    close: true,
    gravity: gravity,
    position: position,
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
};
