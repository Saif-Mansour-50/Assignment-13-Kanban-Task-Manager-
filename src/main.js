var productName = document.getElementById("productInput");
var selectInput = document.getElementById("selectInput");
var dateInput = document.getElementById("dateInput");
var count = document.querySelector(".count");
var progress = document.querySelector(".progress");
var textareaInput = document.getElementById("textareaInput");
var maxlength = Number(textareaInput.getAttribute("maxlength"));
//btn
var addBtn = document.getElementById("addBtn");
var deleteButton = document.getElementById("deleteButton");
var updateBtn = document.getElementById("updateBtn");
//////
// count down
if (maxlength) {
    count.textContent = maxlength.toString();
}
textareaInput.oninput = function () {
    var currentLength = textareaInput.value.length;
    var max = Number(maxlength);
    count.textContent = (max - currentLength).toString();
    progress.style.width = "".concat((currentLength * 100) / max, "%");
};
//
var productList = [];
var currentIndex;
//localStorge
if (localStorage.getItem("productList") != null) {
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProduct(productList);
}
function addProduct(e) {
    e.preventDefault();
    var productData = {
        name: productName.value,
        selectInput: selectInput.value,
        date: dateInput.value,
        textareaInput: textareaInput.value,
        timestamp: Date.now(),
    };
    productList.push(productData);
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProduct(productList);
    productName.value = "";
    textareaInput.value = "";
    dateInput.value = "";
}
function getTimeAgo(time) {
    var seconds = Math.floor((Date.now() - time) / 1000);
    if (seconds < 60)
        return "Just now";
    var minutes = Math.floor(seconds / 60);
    if (minutes < 60)
        return "".concat(minutes, " min ago");
    var hours = Math.floor(minutes / 60);
    if (hours < 24)
        return "".concat(hours, " hours ago");
    return "More than a day ago";
}
setInterval(function () {
    displayProduct(productList);
}, 60000);
function displayProduct(list) {
    var _a, _b, _c, _d, _e, _f;
    var cartona = "";
    for (var i = 0; i < list.length; i++) {
        var serialNumber = (i + 1).toString().padStart(3, "0");
        cartona += "\n    \n     <div id=\"product-card-".concat(i, "\" class=\"mb-3 bg-hov shadow-hover p-2 mt-3 rounded-3\">\n              <div class=\"d-flex justify-content-between align-items-center \">\n                <div>\n                  <span><i  style=\"font-size: 10px;\" class=\"fa-solid fa-circle me-1 text-black-50\"></i></span>\n                  <span class=\"text-black-50\">#").concat(serialNumber, "</span>\n                </div>\n                <div class=\"d-flex gap-2\">\n                  <span\n              aria-current=\"page\"\n        data-bs-toggle=\"modal\"\n        data-bs-target=\"#staticBackdrop\"\n            title=\"Edit\"\n            onclick=\"gitDataToUpdate(").concat(i, ")\"\n            class=\"bg-location bg-nav bg-edit rounded-3 cursor-p  d-flex align-items-center justify-content-center me-2\"\n          >\n            <i class=\"fa-solid fa-pen fa-xs \"></i>\n          </span>\n          <span\n            data-bs-toggle=\"tooltip\"\n            data-bs-placement=\"top\"\n            title=\"delete\"\n            id=\"deleteButton\"\n            onclick=\"deleteProduct(").concat(i, ")\"\n            class=\"bg-location bg-nav bg-trash rounded-3 cursor-p d-flex align-items-center trash justify-content-center\"\n          >\n            <i class=\"fa-solid fa-trash fa-xs\"></i>\n          </span>\n                </div>\n              </div>\n              <h3 class=\"fs-5 py-2\">").concat((_a = list[i]) === null || _a === void 0 ? void 0 : _a.name, "</h3>\n              <p class=\"text-black-50 pb-2\">").concat((_b = list[i]) === null || _b === void 0 ? void 0 : _b.textareaInput, "</p>\n              <span class=\"badge bg-blue-50 text-primary fw-medium p-2\"> <i  style=\"font-size: 10px;\" class=\"fa-solid fa-circle me-1 text-primary\"></i>").concat((_c = list[i]) === null || _c === void 0 ? void 0 : _c.selectInput, "</span>\n              <div class=\"d-flex align-items-center text-black-50 py-2 border-bottom gap-2\" >\n                <span> <i class=\"fa-regular fa-calendar text \"></i> ").concat((_d = list[i]) === null || _d === void 0 ? void 0 : _d.date, "</span>\n                <span> <i class=\"fa-regular fa-clock\"></i> ").concat(getTimeAgo((_f = (_e = list[i]) === null || _e === void 0 ? void 0 : _e.timestamp) !== null && _f !== void 0 ? _f : Date.now()), "</span>\n              </div>\n              <div class=\"d-flex align-items-center py-2\">\n                <span onclick=\"moveToSection2(").concat(i, ")\"\n                class=\"p-1 me-2 bg-st fw-semibold m-0 rounded-3\"\n                \n              >\n                <i class=\"fa-solid fa-plus fa-2lg \"></i> Start\n              </span>\n                <span onclick=\"backToSection1(").concat(i, ")\" \n                class=\"p-1 me-2 bg-todoo text-black-50  fw-semibold m-0 rounded-3 d-none \"\n                \n              >\n                <i class=\"fa-solid fa-arrow-rotate-left\"></i> To Do\n              </span>\n                  <span  onclick=\"moveToSection3(").concat(i, ")\"\n                class=\"p-1 bg-co fw-semibold  m-0 rounded-3\"\n                \n              >\n                <i class=\"fa-solid fa-plus fa-2lg \"></i> Complete\n              </span>\n              </div>\n              \n\n            </div>\n    \n    ");
    }
    document.getElementById("newcontact").innerHTML = cartona;
}
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", function (e) { return addProduct(e); });
// delet
function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProduct(productList);
}
//edit
function gitDataToUpdate(index) {
    currentIndex = index;
    var product = productList[index];
    if (product) {
        productName.value = product.name;
        selectInput.value = product.selectInput;
        textareaInput.value = product.textareaInput;
        dateInput.value = product.date;
    }
    addBtn === null || addBtn === void 0 ? void 0 : addBtn.classList.add("d-none");
    updateBtn === null || updateBtn === void 0 ? void 0 : updateBtn.classList.remove("d-none");
}
function updateProduct() {
    var product = productList[currentIndex];
    if (product) {
        product.name = productName.value;
        product.selectInput = selectInput.value;
        product.textareaInput = textareaInput.value;
        product.date = dateInput.value;
    }
    displayProduct(productList);
    localStorage.setItem("productList", JSON.stringify(productList));
    addBtn === null || addBtn === void 0 ? void 0 : addBtn.classList.remove("d-none");
    updateBtn === null || updateBtn === void 0 ? void 0 : updateBtn.classList.add("d-none");
    productName.value = "";
    textareaInput.value = "";
    dateInput.value = "";
}
// start btn
function moveToSection2(index) {
    var productCard = document.getElementById("product-card-".concat(index));
    var section2Container = document.getElementById("newcontact2");
    if (productCard && section2Container) {
        section2Container.appendChild(productCard);
        var startBtn = productCard.querySelector(".bg-st");
        var todoBtn = productCard.querySelector(".bg-todoo");
        var completeBtn = productCard.querySelector(".bg-co");
        if (startBtn) {
            startBtn.style.display = "none";
        }
        if (todoBtn) {
            todoBtn.classList.remove("d-none");
            todoBtn.classList.add("d-block");
        }
        if (completeBtn) {
            completeBtn.style.display = "block";
            completeBtn.classList.remove("d-none");
        }
    }
}
// todo Btn
function backToSection1(index) {
    var productCard = document.getElementById("product-card-".concat(index));
    var section1 = document.getElementById("newcontact");
    if (productCard && section1) {
        section1.appendChild(productCard);
        var startBtn = productCard.querySelector(".bg-st");
        var completeBtn = productCard.querySelector(".bg-co");
        var todoBtn = productCard.querySelector(".bg-todoo");
        if (startBtn) {
            startBtn.style.display = "block";
            startBtn.classList.remove("d-none");
        }
        if (completeBtn) {
            completeBtn.style.display = "block";
            completeBtn.classList.remove("d-none");
        }
        if (todoBtn) {
            todoBtn.classList.add("d-none");
            todoBtn.classList.remove("d-block");
        }
    }
}
// complete Btn
function moveToSection3(index) {
    var productCard = document.getElementById("product-card-".concat(index));
    var section3 = document.getElementById("newcontact3");
    if (productCard && section3) {
        section3.appendChild(productCard);
        var startBtn = productCard.querySelector(".bg-st");
        var todoBtn = productCard.querySelector(".bg-todoo");
        var completeBtn = productCard.querySelector(".bg-co");
        if (startBtn) {
            startBtn.style.display = "block";
            startBtn.classList.remove("d-none");
        }
        if (todoBtn) {
            todoBtn.classList.remove("d-none");
            todoBtn.classList.add("d-block");
        }
        if (completeBtn) {
            completeBtn.style.display = "none";
        }
    }
}
window.moveToSection3 = moveToSection3;
window.moveToSection2 = moveToSection2;
window.backToSection1 = backToSection1;
