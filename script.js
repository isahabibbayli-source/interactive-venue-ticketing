
const sections = [
    { name: "VIP", price: 45, rows: 4, seatsPerRow: 12 },
    { name: "Standard", price: 30, rows: 4, seatsPerRow: 12 },
    { name: "Economy", price: 20, rows: 4, seatsPerRow: 12 }
];

let seats = [];

let selectedSeat = null;

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
    addButton.disabled = false;

    displaySeats();
}
