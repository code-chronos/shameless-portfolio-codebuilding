// // // const shamelessData = fs.readFileSync("Shameless_Cloner_Data.json");

// // // const parsedShamelessData = JSON.parse(shamelessData);

// // // parsedShamelessData.forEach(element => {

// // // });


// // const path = require('path');
// // const fs = require('fs');
// // const csv = require("csvtojson");

// // csv()
// //     .fromFile("Copy of Working Sheet - Shameless Cloner Strategy - Study Results.csv")
// //     .then(function (toJson) {
// //         // console.log("1 :" + toJson);
// //         // toJsonWithoutField();

// //         const processedData = toJsonWithoutField(toJson);
// //         fs.writeFileSync("Shameless_Cloner_Data.json", JSON.stringify(processedData, null, 4));

// //     })
// //     .catch(function (error) {
// //         console.error('Error:', error);
// //     })

// // function toJsonWithoutField(shamelessData) {
// //     // const shamelessData = fs.readFileSync("Shameless_Cloner_Data.json");

// //     // const parsedShamelessData = JSON.parse(shamelessData);

// //     // console.log(parsed_Shameless_Data);

// //     const result = shamelessData.map(function (obj) {
// //         delete obj.field6;
// //         delete obj.field9;
// //         return obj;
// //     });
// //     console.log(result);
// //     // console.log("2" + shameless_Data);

// //     return result;

// //     // fs.writeFileSync("Shameless_Cloner_Data.json", JSON.stringify(result, null, 4));
// // }





// // Sample JSON array
// const jsonArray = [
//     { "id": 1, "name": "Alice", "age": 25 },
//     { "id": 2, "name": "Bob", "age": 30 },
//     { "id": 3, "name": "Charlie", "age": 25 }
// ];

// // Function to compare a specific key (e.g., 'age') across all objects
// function compareKeyInObjects(jsonArray, key) {
//     if (jsonArray.length === 0) {
//         return true; // All values are the same if array is empty
//     }

//     const firstValue = jsonArray[0][key];

//     return jsonArray.every(obj => obj[key] === firstValue);
// }

// // Compare the 'age' key in all objects
// const allAgesEqual = compareKeyInObjects(jsonArray, 'age');

// console.log(allAgesEqual); // Output: false (since ages 25 and 30 differ)



// const a = [
//     {
//         "Dec 2023": "1.5%",
//         "rank": 1
//     },
//     {
//         "Dec 2023": "1.0%",
//         "rank": 2
//     },
//     {
//         "Dec 2023": "-",
//         "rank": 3
//     },
//     {
//         "Dec 2023": "20.9%",
//         "rank": 4
//     },
//     {
//         "Dec 2023": "1.3%",
//         "rank": 5
//     },
//     {
//         "Dec 2023": "2.6%",
//         "rank": 6
//     },
//     {
//         "Dec 2023": "1.7%",
//         "rank": 7
//     },
//     {
//         "Dec 2023": "6.3%",
//         "rank": 8
//     },
//     {
//         "Dec 2023": "1.1%",
//         "rank": 9
//     },
//     {
//         "Dec 2023": "1.4%",
//         "rank": 10
//     },
//     {
//         "Dec 2023": "2.0%",
//         "rank": 11
//     },
//     {
//         "Dec 2023": "1.2%",
//         "rank": 12
//     },
//     {
//         "Dec 2023": "1.9%",
//         "rank": 13
//     },
//     {
//         "Dec 2023": "-",
//         "rank": 3
//     },
//     {
//         "Dec 2023": "-",
//         "rank": 3
//     },
//     {
//         "Dec 2023": "-",
//         "rank": 3
//     },
//     {
//         "Dec 2023": "-",
//         "rank": 3
//     },
//     {
//         "Dec 2023": "-",
//         "rank": 3
//     },
//     {
//         "Dec 2023": "10.7%",
//         "rank": 19
//     },
//     {
//         "Dec 2023": "-",
//         "rank": 3
//     }
// ]

// console.log("abc" + a);

// const b = "abc" + a;

// if (
//     b.startsWith("abc[o")
// ) {
//     console.log("works");
// }

