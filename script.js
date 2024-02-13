document.getElementById("calculator").addEventListener("submit", (event) => {
  event.preventDefault();
  const initialAmount = parseFloat(
    document.getElementById("initialAmount").value
  );
  const interestRate = parseFloat(
    document.getElementById("interestRate").value
  );
  const numberOfDays = parseInt(document.getElementById("numberOfDays").value);

  let result = initialAmount;
  const resultsBody = document.getElementById("resultsBody");
  resultsBody.innerHTML = "";

  for (let i = 1; i <= numberOfDays; i++) {
    result += result * (interestRate / 100);
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td>${i}</td>
            <td>${result.toFixed(2)}</td>
        `;
    resultsBody.appendChild(newRow);
  }
});
