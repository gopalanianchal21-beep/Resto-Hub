// ===============================
// RESTAURANT HUB JAVASCRIPT
// ===============================


// ===============================
// VARIABLES
// ===============================

const restaurantCards =
    document.querySelectorAll(".restaurant-card");

const categories =
    document.querySelectorAll(".category");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const noResults =
    document.getElementById("noResults");

const resultCount =
    document.getElementById("resultCount");


// ===============================
// CATEGORY FILTER
// ===============================

categories.forEach(category => {

    category.addEventListener("click", () => {

        categories.forEach(item => {
            item.classList.remove("active");
        });

        category.classList.add("active");

        const selectedCategory =
            category.dataset.category;

        filterRestaurants(selectedCategory);

    });

});


function filterRestaurants(category) {

    let visibleCount = 0;

    restaurantCards.forEach(card => {

        const cardCategory =
            card.dataset.category;

        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display = "block";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });

    resultCount.textContent =
        visibleCount + " restaurants";

    noResults.style.display =
        visibleCount === 0
            ? "block"
            : "none";
}


// ===============================
// SEARCH
// ===============================

function searchRestaurants() {

    const searchText =
        searchInput.value
        .toLowerCase()
        .trim();

    let visibleCount = 0;

    restaurantCards.forEach(card => {

        const restaurantName =
            card.dataset.name.toLowerCase();

        const restaurantText =
            card.innerText.toLowerCase();

        if (
            restaurantName.includes(searchText) ||
            restaurantText.includes(searchText)
        ) {

            card.style.display = "block";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });

    resultCount.textContent =
        visibleCount + " restaurants";

    noResults.style.display =
        visibleCount === 0
            ? "block"
            : "none";
}


searchBtn.addEventListener(
    "click",
    searchRestaurants
);


searchInput.addEventListener(
    "keyup",
    event => {

        if (event.key === "Enter") {
            searchRestaurants();
        }

    }
);


// ===============================
// FAVORITE BUTTON
// ===============================

const favoriteButtons =
    document.querySelectorAll(".favorite");

favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {

            button.textContent = "♥";

        } else {

            button.textContent = "♡";

        }

    });

});


// ===============================
// CART
// ===============================

let cart = [];

const cartBtn =
    document.getElementById("cartBtn");

const cartSidebar =
    document.getElementById("cartSidebar");

const closeCart =
    document.getElementById("closeCart");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


// Open cart

cartBtn.addEventListener("click", () => {

    cartSidebar.classList.add("active");

    overlay.classList.add("active");

});


// Close cart

function closeCartSidebar() {

    cartSidebar.classList.remove("active");

    overlay.classList.remove("active");

}

closeCart.addEventListener(
    "click",
    closeCartSidebar
);

overlay.addEventListener(
    "click",
    closeCartSidebar
);


// ===============================
// ADD TO CART
// ===============================

const orderButtons =
    document.querySelectorAll(".order-btn");

orderButtons.forEach(button => {

    button.addEventListener("click", () => {

        const food =
            button.dataset.food;

        const price =
            Number(button.dataset.price);

        const existingItem =
            cart.find(item =>
                item.food === food
            );

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                food: food,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        cartSidebar.classList.add("active");

        overlay.classList.add("active");

    });

});


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    cartItems.innerHTML = "";

    let totalItems = 0;

    let totalPrice = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty 😋
            </p>
        `;

    }


    cart.forEach((item, index) => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div>

                <h4>${item.food}</h4>

                <p>
                    ₹${item.price}
                    ×
                    ${item.quantity}
                </p>

            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${index})"
            >
                Remove
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent =
        totalItems;

    cartTotal.textContent =
        totalPrice;

}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ===============================
// CHECKOUT
// ===============================

const checkoutBtn =
    document.getElementById("checkoutBtn");

const checkoutModal =
    document.getElementById("checkoutModal");

const closeModal =
    document.getElementById("closeModal");

const doneBtn =
    document.getElementById("doneBtn");


checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    checkoutModal.classList.add("active");

});


closeModal.addEventListener("click", () => {

    checkoutModal.classList.remove("active");

});


doneBtn.addEventListener("click", () => {

    checkoutModal.classList.remove("active");

    cart = [];

    updateCart();

    closeCartSidebar();

});


// ===============================
// DARK MODE
// ===============================

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (
        document.body.classList.contains("dark")
    ) {

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});


// ===============================
// LOAD SAVED THEME
// ===============================

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


// ===============================
// INITIAL RESULT COUNT
// ===============================

resultCount.textContent =
    restaurantCards.length +
    " restaurants";