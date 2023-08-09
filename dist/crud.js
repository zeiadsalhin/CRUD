let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("create");
let searchbtn = document.getElementById("searchbtn");
let mood = "create";
let temp;

// total

function gettotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// Create
let dataproducts;
if (localStorage.products != null) {
  dataproducts = JSON.parse(localStorage.products);
} else {
  dataproducts = [];
}

function submitdata() {
  let newproduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    discount: discount.value,
    count: count.value,
    category: category.value,
    total: total.innerHTML,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    taxes.value != "" &&
    count.value != "" &&
    count.value <= 100 &&
    category.value != ""
  ) {
    if (mood === "create") {
      if (newproduct.count > 1) {
        for (let i = 0; i < newproduct.count; i++) {
          dataproducts.push(newproduct);
        }
      } else {
        dataproducts.push(newproduct);
      }
    } else {
      dataproducts[temp] = newproduct;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "inline-block";
    }
    cleardata();
  }

  localStorage.setItem("products", JSON.stringify(dataproducts));
  showdata();
}

// clear

function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

// read

function showdata() {
  gettotal();
  let table = "";

  for (let i = 0; i < dataproducts.length; i++) {
    table += `
    <tr>
        <td>${i + 1}</td>
        <td>${dataproducts[i].title}</td>
        <td>${dataproducts[i].price}</td>
        <td>${dataproducts[i].taxes}</td>
        <td>${dataproducts[i].discount}</td>
        <td>${dataproducts[i].count}</td>
        <td>${dataproducts[i].category}</td>
        <td>${dataproducts[i].total}</td>
        <td><button onclick="update(${i})" id="update">Update</button></td>
        <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
    </tr>`;
  }

  document.getElementById("tbody").innerHTML = table;
}
showdata();

// delete

function deletedata(i) {
  dataproducts.splice(i, 1);
  localStorage.products = JSON.stringify(dataproducts);
  showdata();
}

// delete all

let deleteallbtn = document.getElementById("deleteall");
function deleteallbtnremove() {
  if (dataproducts.length > 0) {
    deleteallbtn.classList.remove("hidden");
  } else {
    deleteallbtn.classList.add("hidden");
  }
  let itemsno = document.getElementById("items");
  itemsno.innerHTML = `(${dataproducts.length})`;
}
window.addEventListener("click", deleteallbtnremove);
window.onload(deleteallbtnremove());
function deleteall() {
  localStorage.clear();
  dataproducts.splice(0);
  showdata();
  title.value = "";
  price.value = "";
  taxes.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  submit.innerHTML = "Create";
  count.style.display = "inline-block";
}

// update

function update(i) {
  title.value = dataproducts[i].title;
  price.value = dataproducts[i].price;
  taxes.value = dataproducts[i].taxes;
  discount.value = dataproducts[i].discount;
  count.value = dataproducts[i].count;
  category.value = dataproducts[i].category;
  gettotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search

function search(value) {
  let table = "";
  for (let i = 0; i < dataproducts.length; i++) {
    if (dataproducts[i].title.toLowerCase().includes(value)) {
      table += `
    <tr>
        <td>${i}</td>
        <td>${dataproducts[i].title}</td>
        <td>${dataproducts[i].price}</td>
        <td>${dataproducts[i].taxes}</td>
        <td>${dataproducts[i].discount}</td>
        <td>${dataproducts[i].count}</td>
        <td>${dataproducts[i].category}</td>
        <td>${dataproducts[i].total}</td>
        <td><button onclick="update(${i})" id="update">Update</button></td>
        <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
    </tr>`;
    } else {
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
