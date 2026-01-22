let productName = document.getElementById("productInput");
let selectInput = document.getElementById("selectInput");
let dateInput = document.getElementById("dateInput");
let textareaInput = document.getElementById("textareaInput");
//btn
let addBtn = document.getElementById("addBtn");
let deleteButton = document.getElementById("deleteButton");
let updateBtn = document.getElementById("updateBtn");
//
let productList = [];
let currentIndex;
//localStorge
if (localStorage.getItem("productList") != null) {
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProduct(productList);
}
//
console.log(productName, selectInput, dateInput, textareaInput);
function addProduct(e) {
    e.preventDefault();
    let productData = {
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
    const seconds = Math.floor((Date.now() - time) / 1000);
    if (seconds < 60)
        return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60)
        return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24)
        return `${hours} hours ago`;
    return "More than a day ago";
}
setInterval(() => {
    displayProduct(productList);
}, 60000);
function displayProduct(list) {
    let cartona = ``;
    for (let i = 0; i < list.length; i++) {
        let serialNumber = (i + 1).toString().padStart(3, "0");
        cartona += `
    
     <div class="mb-3 bg-hov shadow-hover p-2 mt-3 rounded-3">
              <div class="d-flex justify-content-between align-items-center ">
                <div>
                  <span><i  style="font-size: 10px;" class="fa-solid fa-circle me-1 text-black-50"></i></span>
                  <span class="text-black-50">#${serialNumber}</span>
                </div>
                <div class="d-flex gap-2">
                  <span
              aria-current="page"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
            title="Edit"
            onclick="gitDataToUpdate(${i})"
            class="bg-location bg-nav bg-edit rounded-3 cursor-p  d-flex align-items-center justify-content-center me-2"
          >
            <i class="fa-solid fa-pen fa-xs "></i>
          </span>
          <span
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="delete"
            id="deleteButton"
            onclick="deleteProduct(${i})"
            class="bg-location bg-nav bg-trash rounded-3 cursor-p d-flex align-items-center trash justify-content-center"
          >
            <i class="fa-solid fa-trash fa-xs"></i>
          </span>
                </div>
              </div>
              <h3 class="fs-5 py-2">${list[i]?.name}</h3>
              <p class="text-black-50 pb-2">${list[i]?.textareaInput}</p>
              <span class="badge bg-blue-50 text-primary fw-medium p-2"> <i  style="font-size: 10px;" class="fa-solid fa-circle me-1 text-primary"></i>${list[i]?.selectInput}</span>
              <div class="d-flex align-items-center text-black-50 py-2 border-bottom gap-2" >
                <span> <i class="fa-regular fa-calendar text "></i> ${list[i]?.date}</span>
                <span> <i class="fa-regular fa-clock"></i> ${getTimeAgo(list[i]?.timestamp ?? Date.now())}</span>
              </div>
              <div class="d-flex align-items-center py-2">
                <span
                class="p-1 me-2 bg-st fw-semibold m-0 rounded-3"
                
              >
                <i class="fa-solid fa-plus fa-2lg "></i> Start
              </span>
                  <span
                class="p-1 bg-co fw-semibold m-0 rounded-3"
                
              >
                <i class="fa-solid fa-plus fa-2lg "></i> Complete
              </span>
              </div>
              

            </div>
    
    `;
    }
    document.getElementById("newcontact").innerHTML = cartona;
}
addBtn?.addEventListener("click", (e) => addProduct(e));
// delet
function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProduct(productList);
}
//edit
function gitDataToUpdate(index) {
    currentIndex = index;
    let product = productList[index];
    if (product) {
        productName.value = product.name;
        selectInput.value = product.selectInput;
        textareaInput.value = product.textareaInput;
    }
    addBtn?.classList.add("d-none");
    updateBtn?.classList.remove("d-none");
}
function updateProduct() {
    let product = productList[currentIndex];
    if (product) {
        product.name = productName.value;
        product.selectInput = selectInput.value;
        product.textareaInput = textareaInput.value;
    }
    displayProduct(productList);
    localStorage.setItem("productList", JSON.stringify(productList));
    addBtn?.classList.remove("d-none");
    updateBtn?.classList.add("d-none");
    productName.value = "";
    textareaInput.value = "";
    dateInput.value = "";
}
//# sourceMappingURL=main.js.map