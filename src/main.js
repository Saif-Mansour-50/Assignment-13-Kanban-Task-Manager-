var productName = document.getElementById("productInput");
var selectInput = document.getElementById("selectInput");
var dateInput = document.getElementById("dateInput");
var textareaInput = document.getElementById("textareaInput");
console.log(productName, selectInput, dateInput, textareaInput);
var productData = {
    name: productName.value,
    category: selectInput.value,
    date: dateInput.value,
    description: textareaInput.value,
};
