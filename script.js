let item_Count = 0;

function itemCount(input){
    item_Count += input;
    document.getElementById('item-count').innerHTML= item_Count;
    alert('Item has been added into the cart')
}
console.log(item_Count)

function resetCart(){
    document.getElementById('item-count').innerHTML= item_Count;

}

document.addEventListener('DOMContentLoaded', function() {
    let total = 0;
    const cartItemsDiv = document.getElementById('cart-items');
    const cart = {}; // Object to store product quantities

    // Populate product buttons with event listeners
    const buttons = document.getElementsByTagName('button');
    for (let button of buttons) {
        if (button.classList.contains('add-to-cart')) {
            button.addEventListener('click', function() {
                // Get the product name and price from the product elements
                const productName = this.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
                const productPrice = parseFloat(this.previousElementSibling.getAttribute('data-price'));
                console.log("price", productPrice)
                // Update quantity and total price
                if (cart[productName]) {
                    cart[productName].quantity += 1; // Increase quantity
                } else {
                    cart[productName] = { price: productPrice, quantity: 1 }; // Add new product
                }
                total += productPrice; // Update total price
                updateTotalPrice();

                // Update cart display
                updateCartDisplay();
            });
        }
    }

    // Function to update the total price display
    function updateTotalPrice() {
        document.getElementById('total-price').textContent = total.toFixed(2);
    }

    // Function to update the cart display
    function updateCartDisplay() {
        cartItemsDiv.innerHTML = ''; // Clear the existing cart display
        for (const name in cart) {
            const { price, quantity } = cart[name];
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `<span>${name}</span> <span>${quantity}</span> <span>$${(price * quantity).toFixed(2)}  </span> `;
            cartItemsDiv.appendChild(itemDiv);
        }
    }

    // Add event listener to the clear cart button
    document.getElementById('clear-cart').addEventListener('click', function() {
        total = 0; // Reset the total
        item_Count = 0;
        resetCart();
        updateTotalPrice();
        cartItemsDiv.innerHTML = ''; // Clear the cart items
        for (const key in cart) {
            delete cart[key]; // Clear the cart object
        }
    });
});