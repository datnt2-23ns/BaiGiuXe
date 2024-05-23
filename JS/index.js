var table = document.querySelector("table");
var tableBody = table.querySelector("tbody");
var rowCount = table.rows.length;

// document.getElementById("btnThem").addEventListener("click", function () {
//   addRow();
// });

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

  for (var i = 0; i < 8; i++) {
    var cell = newRow.insertCell(i);
    cell.contentEditable = true;

    // if (i === 3) {
    //   var select = document.createElement("select");
    //   select.innerHTML =
    //     '<option value="Xe vượt">Xe vượt</option><option value="Xe tháng">Xe tháng</option>';
    //   cell.appendChild(select);
    // }
  }

  newRow.cells[0].textContent = rowCount++;
  newRow.cells[1].focus();
}

function saveData() {
  var rows = tableBody.querySelectorAll("tr");
  rows.forEach(function (row) {
    var cells = row.querySelectorAll("td");
    cells.forEach(function (cell) {
      cell.contentEditable = false;
    });
  });
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
}

function searchPlateNumber(plateNumber) {
  var rows = tableBody.querySelectorAll("tr");
  var found = false;
  rows.forEach(function (row) {
    var plateCell = row.cells[1];
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
    var plateCell = row.cells[1];
    if (plateCell.textContent.trim() === plateNumber.trim()) {
      found = true;
      row.remove();
    }
  });
  if (!found) {
    alert("Biển số không tồn tại.");
  }
}
