
const sections = [
    { name: "VIP", price: 45, rows: 4, seatsPerRow: 12 },
    { name: "Standard", price: 30, rows: 4, seatsPerRow: 12 },
    { name: "Economy", price: 20, rows: 4, seatsPerRow: 12 }
];

let seats = [];

let selectedSeat = null;

let cart = [];

const unavailableSeats = [
    "VIP-1-3",
    "VIP-2-7",
    "Standard-1-5",
    "Standard-3-9",
    "Economy-2-4",
    "Economy-4-10"
];

sections.forEach(function(section) {
    for (let row = 1; row <= section.rows; row++) {
        for (let number = 1; number <= section.seatsPerRow; number++) {

            let seat = {
                id: section.name + "-" + row + "-" + number,
                section: section.name,
                row: row,
                number: number,
                price: section.price,
                available: !unavailableSeats.includes(
    section.name + "-" + row + "-" + number
)
            };

            seats.push(seat);
        }
    }
});

console.log("Total seats:", seats.length);
console.log(seats);


function displaySeats() {
    sections.forEach(function(section) {
        let container = document.getElementById(
            section.name.toLowerCase() + "-seats"
        );

        container.innerHTML = "";

        seats.forEach(function(seat) {
            if (seat.section === section.name) {
                let button = document.createElement("button");

                button.textContent = seat.number;
                button.title = seat.id;
                button.className = "seat";

                if (!seat.available) {
                    button.classList.add("unavailable");
                    button.disabled = true;
                }

                if (selectedSeat === seat) {
                    button.classList.add("selected");
                }

                if (cart.includes(seat.id)) {
                button.classList.add("in-cart");
                }

                button.addEventListener("click", function() {
                    inspectSeat(seat);
                });

                container.appendChild(button);
            }
        });
    });
}


displaySeats();


function inspectSeat(seat) {
    if (!seat.available) {
        return;
    }

    selectedSeat = seat;

    let info = document.getElementById("seat-info");

    info.innerHTML =
        "Section: " + seat.section + "<br>" +
        "Row: " + seat.row + "<br>" +
        "Seat: " + seat.number + "<br>" +
        "Price: " + seat.price + " AZN";

    let addButton = document.getElementById("add-to-cart");

    if (cart.includes(seat.id)) {
        addButton.disabled = true;
    } else {
        addButton.disabled = false;
    }

    displaySeats();
}


let zoom = 1;
let moveX = 0;
let moveY = 0;

const venueMap = document.getElementById("venue-map");

function updateMap() {
    venueMap.style.transform =
        "translate(" + moveX + "px, " + moveY + "px) " +
        "scale(" + zoom + ")";
}

document.getElementById("zoom-in").addEventListener("click", function() {
    zoom = Math.min(zoom + 0.2, 2);
    updateMap();
});

document.getElementById("zoom-out").addEventListener("click", function() {
    zoom = Math.max(zoom - 0.2, 0.6);
    updateMap();
});

document.getElementById("move-up").addEventListener("click", function() {
    moveY -= 50;
    updateMap();
});

document.getElementById("move-down").addEventListener("click", function() {
    moveY += 50;
    updateMap();
});

document.getElementById("move-left").addEventListener("click", function() {
    moveX -= 50;
    updateMap();
});

document.getElementById("move-right").addEventListener("click", function() {
    moveX += 50;
    updateMap();
});

document.getElementById("reset-view").addEventListener("click", function() {
    zoom = 1;
    moveX = 0;
    moveY = 0;
    updateMap();
});

document.getElementById("add-to-cart").addEventListener("click", function() {
    if (selectedSeat === null) {
        return;
    }

    if (!selectedSeat.available) {
        return;
    }

    if (cart.includes(selectedSeat.id)) {
        return;
    }

    cart.push(selectedSeat.id);

    document.getElementById("add-to-cart").disabled = true;

    displaySeats();
    displayCart();
});

function displayCart() {
    let cartItems = document.getElementById("cart-items");
    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach(function(id) {
        let seat = seats.find(function(item) {
            return item.id === id;
        });

        if (seat) {
            let item = document.createElement("p");
            item.textContent = seat.id + " - " + seat.price + " AZN ";

            let removeButton = document.createElement("button");
            removeButton.textContent = "Remove";

            removeButton.addEventListener("click", function() {
                removeFromCart(seat.id);
            });

            item.appendChild(removeButton);
            cartItems.appendChild(item);

            total += seat.price;
        }
    });

    document.getElementById("total").textContent = total;
}

function removeFromCart(id) {
    cart = cart.filter(function(item) {
        return item !== id;
    });

    if (selectedSeat && selectedSeat.id === id) {
        selectedSeat = null;

        document.getElementById("seat-info").textContent =
            "No seat selected";

        document.getElementById("add-to-cart").disabled = true;
    }

    displayCart();
    displaySeats();
}

displayCart();
