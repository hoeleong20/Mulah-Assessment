document.addEventListener("DOMContentLoaded", () => {
  const csvFilePath = "Table_Input.csv";

  const table1 = document.getElementById("Table1");
  const table2 = document.getElementById("Table2");

  fetch(csvFilePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load CSV file.");
      }
      return response.text();
    })
    .then((csvData) => {
      const data = parseCSV(csvData);
      displayTable1(data);
      displayTable2(data);
    })
    .catch((error) => {
      console.error("Error loading CSV:", error);
    });

  function parseCSV(csvData) {
    return csvData
      .split("\n")
      .filter((row) => row.trim() !== "")
      .map((row) => row.split(",").map((cell) => cell.trim()));
  }

  function displayTable1(data) {
    const rows = data.slice(1); // Skip the first row

    const tbody = table1.querySelector("tbody");

    rows.forEach((row) => {
      const tr = document.createElement("tr");
      row.forEach((cell) => {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  function displayTable2(data) {
    const rows = data.slice(1); // Skip the first row

    const valueMap = {};
    rows.forEach((row) => {
      const index = row[0]; 
      const value = parseInt(row[1], 10); 
      valueMap[index] = value;
    });

    const resultData = [
      { category: "Alpha", value: valueMap["A5"] + valueMap["A20"] },
      { category: "Beta", value: Math.floor(valueMap["A15"] / valueMap["A7"]) }, // Integer division
      { category: "Charlie", value: valueMap["A13"] * valueMap["A12"] },
    ];

    const tbody = table2.querySelector("tbody");

    resultData.forEach((row) => {
      const tr = document.createElement("tr");
      tbody.appendChild(tr);

      const tdCategory = document.createElement("td");
      tdCategory.textContent = row.category; 
      tr.appendChild(tdCategory);

      const tdValue = document.createElement("td");
      tdValue.textContent = row.value; 
      tr.appendChild(tdValue);
    });
  }
});
