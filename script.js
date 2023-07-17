const totalPriceElement = document.getElementById("totalPrice");
const parentListElement = document.getElementById("list")

let totalPrice = 0;
let cart = [];

const totalPriceStorage = localStorage.getItem("totalPrice");
if (totalPriceStorage !== null) {
    totalPrice = parseInt(totalPriceStorage);
}

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

// List of objects that needs to be converted to an Item
const cartStorage = localStorage.getItem("cart");
if (cartStorage !== null) {
    cart = JSON.parse(cartStorage).map((item) => {
        return new Item(item.name, item.price);
    })
}
refreshUI();

function updateStorage() {
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function refreshUI() {
    totalPriceElement.innerText = `Total Price : $${totalPrice} | Total Items ${cart.length}`;
    parentListElement.innerHTML = "";

    cart.forEach((item, index) => {
        const listElement = document.createElement("li");
        const textNode = document.createTextNode(`${item.name} - $${item.price}`);
        listElement.appendChild(textNode);
        parentListElement.appendChild(listElement);
        listElement.classList.add("list-group-item", "d-flex", "justify-content-between");

        const deleteButton = document.createElement("button");
        const deleteTextNode = document.createTextNode("delete");
        deleteButton.appendChild(deleteTextNode);
        deleteButton.classList.add("btn", "btn-danger");
        listElement.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
            cart.splice(index, 1);
            totalPrice -= item.price;
            refreshUI();
            updateStorage();
        })
    })
}


function addItem(form) {
    const itemName = form.itemName.value
    const itemPrice = form.itemPrice.value

    if (itemPrice === "" || itemName === "") {
        alert("PLEASE PUT All ITEM COMPLETE");
        return false
    } else if (parseInt(itemPrice) === NaN) {
        alert("PLEASE PUT THE CORRECT NUMBER")
    }

    totalPrice += parseInt(itemPrice)
    const item = new Item(itemName, parseInt(itemPrice));
    cart.push(item);

    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("cart", JSON.stringify(cart));

    refreshUI();


    return false;
}
