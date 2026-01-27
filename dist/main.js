//  DOM
let productName = document.getElementById("productInput");
let selectInput = document.getElementById("selectInput");
let dateInput = document.getElementById("dateInput");
// Due Date
let today = new Date();
let yyyy = today.getFullYear();
let mm = String(today.getMonth() + 1).padStart(2, "0");
let dd = String(today.getDate()).padStart(2, "0");
dateInput.min = `${yyyy}-${mm}-${dd}`;
let textareaInput = document.getElementById("textareaInput");
let count = document.querySelector(".count");
let progress = document.querySelector(".progress");
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");
let maxlength = Number(textareaInput.getAttribute("maxlength"));
function getNextSerial() {
    let used = productList.map((p) => p.serial).sort((a, b) => a - b);
    let serial = 1;
    for (let num of used) {
        if (num === serial)
            serial++;
        else
            break;
    }
    return serial;
}
//
let productList = [];
let currentId = null;
//
if (localStorage.getItem("productList")) {
    productList = JSON.parse(localStorage.getItem("productList"));
    renderByStatus();
}
// ================== Add ==================
function addProduct(e) {
    e.preventDefault();
    if (productName.value.trim().length < 3) {
        productName.focus();
        return;
    }
    let product = {
        serial: getNextSerial(),
        name: productName.value,
        selectInput: selectInput.value,
        date: dateInput.value,
        textareaInput: textareaInput.value,
        timestamp: Date.now(),
        status: "todo",
    };
    productList.push(product);
    persist();
    renderByStatus();
    resetForm();
}
addBtn?.addEventListener("click", addProduct);
//
function renderByStatus() {
    renderColumn("newcontact", productList.filter((p) => p.status === "todo"));
    renderColumn("newcontact2", productList.filter((p) => p.status === "doing"));
    renderColumn("newcontact3", productList.filter((p) => p.status === "done"));
    updateAllCounters();
}
function formatDate(dateStr) {
    if (!dateStr)
        return "";
    let date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}
function renderColumn(containerId, list) {
    let container = document.getElementById(containerId);
    container.innerHTML = "";
    list.forEach((p, i) => {
        let serial = (i + 1).toString().padStart(3, "0");
        container.innerHTML += `
      <div id="product-card-${p.timestamp}" class="mb-3 bg-hov shadow-hover p-2 mt-3 rounded-3">
        <div class="d-flex justify-content-between align-items-center">
          <span class="text-black-50">#${serial}</span>
          <div class="d-flex gap-2">
            <span onclick="gitDataToUpdate(${p.timestamp})" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
              class="bg-edit rounded-3 cursor-p d-flex align-items-center justify-content-center">
              <i class="fa-solid fa-pen fa-xs"></i>
            </span>
            <span onclick="deleteProduct(${p.timestamp})"
              class="bg-trash rounded-3 cursor-p d-flex align-items-center justify-content-center">
              <i class="fa-solid fa-trash fa-xs"></i>
            </span>
          </div>
        </div>

<h3 
  class="fs-5 py-2 ${p.status === "done" ? "text-decoration-line-through text-muted" : ""}">
  ${p.name}
</h3>        <p class="text-black-50">${p.textareaInput}</p>
        <span class="badge bg-primary">${p.selectInput}</span>

       <div class="text-black-50 py-2 border-bottom d-flex gap-3 align-items-center">
  <span>
    <i class="fa-regular fa-clock"></i>
    ${getTimeAgo(p.timestamp)}
  </span>

  <span>
    <i class="fa-regular fa-calendar"></i>
    ${formatDate(p.date)}
  </span>
</div>


        <div class="d-flex gap-2 pt-2">
          ${p.status !== "doing" ? `<span class="p-1 me-2 bg-st fw-semibold m-0 rounded-3" onclick="moveToSection2(${p.timestamp})">Start</span>` : ""}
          ${p.status !== "todo" ? `<span class="p-1 me-2 bg-todoo text-black-50 fw-semibold m-0 rounded-3  " onclick="backToSection1(${p.timestamp})">To Do</span>` : ""}
          ${p.status !== "done" ? `<span class="p-1 bg-co fw-semibold m-0 rounded-3" onclick="moveToSection3(${p.timestamp})">Complete</span>` : ""}
        </div>
      </div>
    `;
    });
}
//  Delete
function deleteProduct(timestamp) {
    productList = productList.filter((p) => p.timestamp !== timestamp);
    persist();
    renderByStatus();
}
// Edit
function gitDataToUpdate(timestamp) {
    currentId = timestamp;
    let product = productList.find((p) => p.timestamp === timestamp);
    if (!product)
        return;
    productName.value = product.name;
    selectInput.value = product.selectInput;
    textareaInput.value = product.textareaInput;
    dateInput.value = product.date;
    addBtn?.classList.add("d-none");
    updateBtn?.classList.remove("d-none");
}
function updateProduct() {
    if (currentId === null)
        return;
    let product = productList.find((p) => p.timestamp === currentId);
    if (!product)
        return;
    product.name = productName.value;
    product.selectInput = selectInput.value;
    product.textareaInput = textareaInput.value;
    product.date = dateInput.value;
    persist();
    renderByStatus();
    resetForm();
    let modalEl = document.getElementById("staticBackdrop");
    // @ts-ignore
    bootstrap.Modal.getInstance(modalEl)?.hide();
}
//
function moveToSection2(id) {
    updateStatus(id, "doing");
}
function backToSection1(id) {
    updateStatus(id, "todo");
}
function moveToSection3(id) {
    updateStatus(id, "done");
}
function updateStatus(id, status) {
    let product = productList.find((p) => p.timestamp === id);
    if (!product)
        return;
    product.status = status;
    persist();
    renderByStatus();
}
//
function persist() {
    localStorage.setItem("productList", JSON.stringify(productList));
}
function resetForm() {
    productName.value = "";
    textareaInput.value = "";
    dateInput.value = "";
    addBtn?.classList.remove("d-none");
    updateBtn?.classList.add("d-none");
    currentId = null;
}
function updateCounter(containerId, displayId) {
    let container = document.getElementById(containerId);
    let display = document.getElementById(displayId);
    if (container && display) {
        display.textContent = `${container.children.length} tasks`;
    }
}
function updateAllCounters() {
    updateCounter("newcontact", "totalDo");
    updateCounter("newcontact2", "totalDo2");
    updateCounter("newcontact3", "totalDo3");
}
function getTimeAgo(time) {
    let seconds = Math.floor((Date.now() - time) / 1000);
    if (seconds < 60)
        return "Just now";
    let minutes = Math.floor(seconds / 60);
    if (minutes < 60)
        return `${minutes} min ago`;
    let hours = Math.floor(minutes / 60);
    return `${hours} hours ago`;
}
//
window.gitDataToUpdate = gitDataToUpdate;
window.deleteProduct = deleteProduct;
window.moveToSection2 = moveToSection2;
window.moveToSection3 = moveToSection3;
window.backToSection1 = backToSection1;
window.updateProduct = updateProduct;
//
if (maxlength)
    count.textContent = maxlength.toString();
textareaInput.oninput = () => {
    let len = textareaInput.value.length;
    count.textContent = String(maxlength - len);
    progress.style.width = `${(len / maxlength) * 100}%`;
};
//# sourceMappingURL=main.js.map