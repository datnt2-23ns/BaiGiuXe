var table = document.querySelector("table");
var tableBody = table.querySelector("tbody");
var rowCount = table.rows.length;
var isEditing = false;
var isDataSaved = true;

document.getElementById("btnThem").addEventListener("click", function () {
  addRow();
});

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    var activeElement = document.activeElement;
    if (
      activeElement.tagName === "TD" &&
      activeElement.parentElement.classList.contains("editable-row")
    ) {
      addRow();
    }
  }
});

document.querySelector(".saveButton").addEventListener("click", function () {
  saveData();
  disableEditing();
});

document.getElementById("btnSua").addEventListener("click", function () {
  enableEditing();
});

document.getElementById("btnTimKiem").addEventListener("click", function () {
  var searchValue = prompt("Nhập biển số cần tìm kiếm:");
  if (searchValue) {
    searchPlateNumber(searchValue);
  }
});

document.getElementById("btnXoa").addEventListener("click", function () {
  var plateNumber = prompt("Nhập biển số cần xóa:");
  if (plateNumber) {
    deleteRow(plateNumber);
  }
});

function addRow() {
  var newRow = tableBody.insertRow();
  newRow.classList.add("editable-row");

  for (var i = 0; i < 9; i++) {
    var cell = newRow.insertCell(i);
    cell.contentEditable = true;
  }

  newRow.cells[0].textContent = rowCount++;
  newRow.cells[1].focus();
  isDataSaved = false;
}

function saveData() {
  var rows = tableBody.querySelectorAll("tr");
  rows.forEach(function (row) {
    var cells = row.querySelectorAll("td");
    cells.forEach(function (cell) {
      cell.contentEditable = false;
    });
  });
  isEditing = false;
  isDataSaved = true;
}

function enableEditing() {
  var cells = tableBody.querySelectorAll("td");
  cells.forEach(function (cell) {
    cell.contentEditable = true;
  });
}

function disableEditing() {
  var cells = document.querySelectorAll("td[contentEditable='true']");
  cells.forEach(function (cell) {
    cell.contentEditable = false;
  });
  isEditing = false;
}

function searchPlateNumber(plateNumber) {
  var rows = tableBody.querySelectorAll("tr");
  var found = false;
  rows.forEach(function (row) {
    var plateCell = row.cells[2];
    if (plateCell.textContent.trim() === plateNumber.trim()) {
      found = true;
      row.scrollIntoView({ behavior: "smooth", block: "center" });
      plateCell.style.backgroundColor = "rgb(144, 202, 249)";
      setTimeout(function () {
        plateCell.style.backgroundColor = "";
      }, 3000);
    }
  });
  if (!found) {
    alert("Biển số không tồn tại.");
  }
}

function deleteRow(plateNumber) {
  var rows = tableBody.querySelectorAll("tr");
  var found = false;
  rows.forEach(function (row) {
    var plateCell = row.cells[2];
    if (plateCell.textContent.trim() === plateNumber.trim()) {
      found = true;
      row.remove();
    }
  });
  if (!found) {
    alert("Biển số không tồn tại.");
  }
}

function markSelectedRow() {
  var selectedRow = tableBody.querySelector(".selected-row");
  if (selectedRow) {
    selectedRow.classList.remove("selected-row");
  }
  var clickedCell = event.target.closest("tr");
  if (clickedCell) {
    clickedCell.classList.add("selected-row");
  }
}
