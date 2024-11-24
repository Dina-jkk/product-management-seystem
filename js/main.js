var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productImage = document.getElementById("productImage");
var row = document.getElementById("row");

var searchProduct = document.getElementById("searchProduct");





var nameErr = document.getElementById("nameErr");  // product name validation
var emptyErr = document.getElementById("emptyErr");  // empty name validation




var priceErr = document.getElementById("priceErr");  // product price validation
var emptyErorr = document.getElementById("emptyErorr");  // empty price validation





var productCatErr = document.getElementById("productCatErr");  // product price validation
var emptyEroor = document.getElementById("emptyEroor");  // empty price validation





var productDescErr = document.getElementById("productDescErr");  // product desccription validation
var eemptyErrrr = document.getElementById("emptyErrrr");  // empty product desccription  validation


var SearchCategory= document.getElementById("SearchCategory");



var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");




var globalIndex;
var productList;

if(localStorage.getItem("productList")) {
   productList = JSON.parse(localStorage.getItem("productList"));
   displayProduct(productList);
} else {
   productList = [];
}






// function to add product:
function addProduct() {
    if (emptyNameValidation() && emptyPriceValidation()&& emptyCatValidation()&&emptyDescValidation()) {
        if (productNameValidation() && productPricValidation() &&productCatValidation()&&productDesValidation()) {
            var product = {
                name: productName.value,
                price: productPrice.value,
                category: productCategory.value,
                desc: productDesc.value,
                Image: productImage.files[0] ? productImage.files[0].name : ''
            };
            productList.push(product);
            displayProduct(productList);
            clearInputs();
            saveToLocalStorage();
        }
    }
}









// function to display product after add:
function displayProduct(productCat, term = 0) {
    if (productCat.length > 0) {
        var cartona = "";
        for (var i = 0; i < productCat.length; i++) {
            cartona += `
            <div class="col-md-3 col-sm-6">
            <img src="./images/${productCat[i].Image}" class="w-100" alt="product image">
            <p>Product Name: ${term ? productCat[i].name.toLowerCase().replace(term, `<span class="fw-bolder fs-5 bg-warning">${term}</span>`) : productCat[i].name}</p>
            <p>Product Price: ${term ? productCat[i].price.replace(term, `<span class="fw-bolder fs-5 bg-warning">${term}</span>`) : productCat[i].price}</p>
            <p>Product Category: ${term ? productCat[i].category.replace(term, `<span class="fw-bolder fs-5 bg-warning">${term}</span>`) : productCat[i].category}</p>
             <p>Product Description: ${term ? productCat[i].desc.replace(term, `<span class="fw-bolder fs-5 bg-warning">${term}</span>`) : productCat[i].desc}</p>
                <button onclick="setFormToUpdate(${i})" class="w-100 btn btn-outline-primary my-1">Update</button>
                <button onclick="deleteProduct(${i})" class="w-100 btn btn-outline-danger my-1">Delete</button>
            </div>`;
        }
        row.innerHTML = cartona;
    } else {
        row.innerHTML = `<div class="alert alert-warning text-center py-4">No Match Found</div>`;
    }
}








// function to clear input fields after add and display:
function clearInputs() {
    productName.value = null;
    productPrice.value = null;
    productCategory.value = null;
    productDesc.value = null;
}







// function to delete product:
function deleteProduct(index) {
    productList.splice(index, 1);
    displayProduct(productList);
    saveToLocalStorage();
}







// function to save items in local storage:
function saveToLocalStorage() {
    localStorage.setItem("productList", JSON.stringify(productList));
}








// function to set form for update:
function setFormToUpdate(index) {
    globalIndex = index;
    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productCategory.value = productList[index].category;
    productDesc.value = productList[index].desc;

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}











// function to update product:
function updateProduct() {
    productList[globalIndex].name = productName.value;
    productList[globalIndex].price = productPrice.value;
    productList[globalIndex].category = productCategory.value;
    productList[globalIndex].desc = productDesc.value;
    displayProduct(productList);
    saveToLocalStorage();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
}











// function to search product:
function searchByProduct() {
    var searchList = [];
    var term = searchProduct.value;

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
            searchList.push(productList[i]);
        }
    }
    displayProduct(searchList, term);
}











// function for product name validation:
function productNameValidation() {
    var regex = /^[A-Z][a-zA-Z\s]{3,}$/;
    if (regex.test(productName.value)) {
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        emptyErr.classList.replace("d-block", "d-none");
        nameErr.classList.replace("d-block", "d-none");
        return true;
    } else {
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        nameErr.classList.replace("d-none", "d-block");
        emptyErr.classList.replace("d-block", "d-none");
        return false;
    }
}

// function for empty name validation:
function emptyNameValidation() {
    if (productName.value == "") {
        emptyErr.classList.replace("d-none", "d-block");
        nameErr.classList.replace("d-block", "d-none");
        return false;
    } else {
        emptyErr.classList.replace("d-block", "d-none");
        nameErr.classList.replace("d-block", "d-none");
        return true;
    }
}













// function for product price validation:
function productPricValidation() {
    var regex = /^(10000|[1-4][0-9]{4}|50000)$/;
    if (regex.test(productPrice.value)) {
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        emptyErorr.classList.replace("d-block", "d-none");
        priceErr.classList.replace("d-block", "d-none");
        return true;
    } else {
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        priceErr.classList.replace("d-none", "d-block");
        emptyErorr.classList.replace("d-block", "d-none");
        return false;
    }
}

// function for empty price validation:
function emptyPriceValidation() {
    if (productPrice.value == "") {
        emptyErorr.classList.replace("d-none", "d-block");
        priceErr.classList.replace("d-block", "d-none");
        return false;
    } else {
        emptyErorr.classList.replace("d-block", "d-none");
        priceErr.classList.replace("d-block", "d-none");
        return true;
    }
}















// function for product  Category validation:
function productCatValidation() {
    var regex = /^(Phone|TV|Electronic|Tablets)$/;
    if (regex.test(productCategory.value)) {
        productCategory.classList.add("is-valid");
        productCategory.classList.remove("is-invalid");
        emptyEroor.classList.replace("d-block", "d-none");
        productCatErr.classList.replace("d-block", "d-none");
        return true;
    } else {
        productCategory.classList.add("is-invalid");
        productCategory.classList.remove("is-valid");
        productCatErr.classList.replace("d-none", "d-block");
        emptyEroor.classList.replace("d-block", "d-none");
        return false;
    }
}

// function for empty product  Category validation:
function emptyCatValidation() {
    if (productName.value == "") {
        emptyEroor.classList.replace("d-none", "d-block");
        productCatErr.classList.replace("d-block", "d-none");
        return false;
    } else {
        emptyEroor.classList.replace("d-block", "d-none");
        productCatErr.classList.replace("d-block", "d-none");
        return true;
    }
}














// function for Product Description validation:
function productDesValidation() {
    var regex = /^[a-zA-Z\s]{10,50}$/;
    if (regex.test(productDesc.value)) {
        productDesc.classList.add("is-valid");
        productDesc.classList.remove("is-invalid");
        emptyErr.classList.replace("d-block", "d-none");
        productDescErr.classList.replace("d-block", "d-none");
        return true;
    } else {
        productDesc.classList.add("is-invalid");
        productDesc.classList.remove("is-valid");
        productDescErr.classList.replace("d-none", "d-block");
        emptyErr.classList.replace("d-block", "d-none");
        return false;
    }
}

// function for empty Product Description validation:
function emptyDescValidation() {
    if (productDesc.value == "") {
        emptyErr.classList.replace("d-none", "d-block");
        productDescErr.classList.replace("d-block", "d-none");
        return false;
    } else {
        emptyErr.classList.replace("d-block", "d-none");
        productDescErr.classList.replace("d-block", "d-none");
        return true;
    }
}







// function to search  by category:
function searchingCategory() {
    var searchList = [];
    var term = SearchCategory.value;

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].category.toLowerCase().includes(term.toLowerCase())) {
            searchList.push(productList[i]);
        }
        else{
            console.log("not found")
        }
        displayProduct(searchList, term);
    }
   
}







