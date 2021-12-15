//
// Object Destructuring
//

// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday",
//   publisher: {
//     // name: "",
//   },
// };
// console.log(`1. the publisher is ${book.publisher.name}`);

// const { name: publisherName = "Self-Published" } = book.publisher;
// console.log(`2. the publisher is ${publisherName}`);

//
// Array Destructuring
//

const item = [, "$2.00", "$2.50", "$2.75"];
const [purchase = "Pepsi", smallPrice, mediumPrice, largePrice] = item;
console.log(`A medium ${purchase} costs ${mediumPrice}.`);
