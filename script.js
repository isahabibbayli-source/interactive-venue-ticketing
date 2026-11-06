
const sections = [
    { name: "VIP", price: 45, rows: 4, seatsPerRow: 12 },
    { name: "Standard", price: 30, rows: 4, seatsPerRow: 12 },
    { name: "Economy", price: 20, rows: 4, seatsPerRow: 12 }
];

let seats = [];

sections.forEach(function(section) {
    for (let row = 1; row <= section.rows; row++) {
        for (let number = 1; number <= section.seatsPerRow; number++) {

            let seat = {
                id: section.name + "-" + row + "-" + number,
                section: section.name,
                row: row,
                number: number,
                price: section.price,
                available: true
            };

            seats.push(seat);
        }
    }
});

console.log("Total seats:", seats.length);
console.log(seats);
