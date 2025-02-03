const path = require('path');
const fs = require('fs');
const csv = require("csvtojson");

csv()
    .fromFile("Shameless_Cloner_Strategy" + '.csv')
    .then(function (toJson) {
        // console.log("1 :" + toJson);
        // toJsonWithoutField();
        const processedData = toJsonWithoutField(toJson);
        fs.writeFileSync("Shameless_Cloner_Data.json", JSON.stringify(processedData, null, 4));

    })
    .catch(function (error) {
        console.error('Error:', error);
    })

function toJsonWithoutField(shamelessData) {
    // const shamelessData = fs.readFileSync("Shameless_Cloner_Data.json");

    // const parsedShamelessData = JSON.parse(shamelessData);

    // console.log(parsed_Shameless_Data);

    const result = shamelessData.map(function (obj) {
        delete obj.field6;
        delete obj.field9;
        return obj;
    });
    console.log(result);
    // console.log("2" + shameless_Data);
    return result;
    // fs.writeFileSync("Shameless_Cloner_Data.json", JSON.stringify(result, null, 4));
}