let Dec2023RanksForSingleInvestor = sorted.map((jsObject, index) => {
    let updatedJsobject = jsObject;
    if (updatedJsobject.ranks) {
        updatedJsobject.ranks['Dec 2023'] = index + 1;
    } else {
        updatedJsobject.ranks = {};
        updatedJsobject.ranks['Dec 2023'] = index + 1;
    }
    return updatedJsobject;
})

let Sep2023Sorted = Dec2023RanksForSingleInvestor.sort((a, b) => {
    const aParsed = parseFloat(a["Sep 2023"].replace("%", "").replace("-", "0"));
    const bParsed = parseFloat(b["Sep 2023"].replace("%", "").replace("-", "0"));
    return bParsed - aParsed;

})
// console.log(Sep2023Sorted);


let Sep2023RanksForSingleInvestor = Sep2023Sorted.map((jsObject, index) => {
    let updatedJsobject = jsObject;

    if (updatedJsobject.ranks) {
        updatedJsobject.ranks['Sep 2023'] = index + 1;
    } else {
        updatedJsobject.ranks = {};
        updatedJsobject.ranks['Sep 2023'] = index + 1;
    }
    return updatedJsobject;
})

// THE ABOVE CODE IS FOR WHEN THE DATA WAS USED AS IT IS FROM THE EXCEL SHEET OF SHANKAR NATH. NOW THE DATA IS GOING TO BE MODIFIED FOR THE NEXT PART

// console.log(Sep2023RanksForSingleInvestor);


////////////////////////////////////////////////////


const fs = require('fs');
const csv = require('csvtojson');

csv()
    .fromFile("shameless_cloning_datadump" + '.csv')
    .then((toJson) => {

        //r console.log("a+", toJson[0]);

        const addedMissingFieldToJson = toJson.map(json => {
            const { field1, ...rest } = json;
            return {
                InvestorName: field1,
                ...rest
            };
        });

        const forSingleInvestor = addedMissingFieldToJson.filter(jsObject => jsObject.InvestorName === "Vijay Kishanlal Kedia")

        //r console.log("1+", forSingleInvestor);

        // fs.writeFileSync("shameless_cloning_datadump.json", JSON.stringify(correctedToJson, null, 4));
        let sorted = forSingleInvestor.sort((a, b) => {
            const aParsed = parseFloat(a["Dec 2023"].replace("%", "").replace("-", "0"));
            const bParsed = parseFloat(b["Dec 2023"].replace("%", "").replace("-", "0"));
            return bParsed - aParsed;

        })

        //r console.log("sort", sorted);

        let sortedForUnnecessaryFields = sorted.map(function (obj) {
            delete obj.InvestorName;
            delete obj['Holding Value in crores'];
            return obj;
        })
        // console.log("UnnecessaryFields", sortedForUnnecessaryFields);

        const modifiedObjCompany = sortedForUnnecessaryFields.map(obj => {

            // let companyName = obj['Name of Company'];

            // console.log('3+', companyName);

            const { ['Name of Company']: keyValue, ...rest } = obj;

            // const { ['Name of Company']: keyValue, ...rest, [keyValue]: percents } = obj;

            // return {
            //     percents: { ...rest }
            // }
            //r console.log("rest+", rest)
            return {
                // [keyValue]: { ...rest }
                [keyValue]: {
                    // 'percents': { ...rest }
                    'percents': rest

                }

            }



            // const sortedForPercents = {
            //     'Name of Company': {
            //         percents: { ...obj['Name of Company'] }
            //     }

            // }




            // modifiedObj = obj['Name of Company'];

            // let modifiedObj = { ['Name of Company']: { ...rest } };



            // let i = 0;
            // obj['Name of Company'];
            // console.log(obj['Name of Company']);
            // const { obj['Name of Company'], ...rest } = obj;
            // return {
            //     obj['Name of Company'],
            //     ...rest
            // }
            // return obj;
        });

        //r console.log('ModObjComp' + JSON.stringify(modifiedObjCompany, null, 2));



        const modifiedObjCompanyRanks1 = modifiedObjCompany.map(obj => {



            const objKey = Object.keys(obj)[0];

            obj[objKey].ranks = {};

            //r console.log("percents \n", percentsObj);

            //r console.log(Object.keys(percentsObj));


            // console.log(JSON.stringify(obj, null, 2));
            return obj;
        })

        // console.log('temp' + JSON.stringify(modifiedObjCompanyRanks1, null, 2));

        // console.log('new' + JSON.stringify(modifiedObjCompanyRanks1[0], null, 2));

        const FirstObjRanks1 = modifiedObjCompanyRanks1[0];

        // console.log("newK", FirstObjRanks1);

        const months = Object.keys(Object.values(FirstObjRanks1)[0].ranks);

        // console.log("mon", months);


        let rankingForIndividualMonth

        for (const month of months) {
            // console.log("month", month);
            const sortedPercForMonth = modifiedObjCompanyRanks1.sort((company1, company2) => {

                const com1PercValue = parseFloat(Object.values(company1)[0].ranks[month].replace("%", "").replace("-", "0"));

                // console.log("com1P", com1PercValue);

                const com2PercValue = parseFloat(Object.values(company2)[0].ranks[month].replace("%", "").replace("-", "0"));

                return com2PercValue - com1PercValue;
            });

            rankingForIndividualMonth = sortedPercForMonth.map((obj, i) => {
                const keyContent = Object.keys(obj)[0];
                obj[keyContent].ranks[month] = i + 1;
                return obj;
            }
            )
        }

        console.log(JSON.stringify(rankingForIndividualMonth, null, 2));



        // console.log(JSON.stringify(, null, 2));


        // const modifiedObjCompanyRanks = modifiedObjCompany

        // function modifiedObjCompanyRanks(modifiedObjCompany) {
        //     for (key in modifiedObjCompany) {
        //         if (modifiedObjCompany[key].percents) {
        //             modifiedObjCompany[key].ranks = { ...modifiedObjCompany[key].percents };
        //             modifiedObjCompany[key].ranks = modifiedObjCompany[key].percents;
        //         }
        //     }

        // }
        // modifiedObjCompanyRanks();
        // // modifiedObjCompanyRanks(modifiedObjCompany);

        // console.log('modObjComRanks' + JSON.stringify(modifiedObjCompanyRanks, null, 2));


        // for (let i = 0; i < modifiedObjCompany.length; i++) {

        //     // const modifiedObjCompanyStr = JSON.stringify(Object.values(Object.values(modifiedObjCompany[i])[0].percents), null, 2);

        //     const modifiedObjCompanyStr = JSON.stringify(Object.keys(Object.values(modifiedObjCompany[i])[0].percents), null, 2);
        //     console.log("ModObjComStr", modifiedObjCompanyStr);


        // } 

        // Above for loop is useful

        // const modifiedObjCompanyStr = JSON.stringify(Object.keys(Object.values(modifiedObjCompany[0])[0].percents), null, 2);

        // const modifiedObjCompanyStr = modifiedObjCompany.forEach(element => {
        //     JSON.stringify(Object.keys(Object.values(element)[0].percents), null, 2);
        // });






        // const modifiedObjPercents = {

        // }

        // console.log("test", Object.values(modifiedObjCompany));

        // const modifiedObjPercents = modifiedObjCompany.map(obj => {



        // })



        // let Dec2023RanksForSingleInvestor = sorted.map((jsObject, index) => {
        //     let updatedJsobject = jsObject
        //     if (updatedJsobject.ranks) {
        //         updatedJsobject.ranks['Dec 2023'] = index + 1;
        //     } else {
        //         updatedJsobject.ranks = {};
        //         updatedJsobject.ranks['Dec 2023'] = index + 1;
        //     }
        //     return updatedJsobject;
        // }
        // );



    })

// const evenOrOdd = num => {
//     if(num mod 2 == 0 ){
//         return true
//     } else {
//         return false
//     }
// }

// function evenOrOdd1(num){
//     if(num mod 2 == 0 ){
//         return true
//     } else {
//         return false
//     }
// }

// const alwaysTrue = (arg) => {
//     return true
// }

// const alwaysTrue1  = arg => true


// const JsonString = [
//   `{
//  "Atul Auto Ltd.": {
//       "percents": {
//         "Dec 2023": "20.9%",
//         "Sep 2023": "20.9%",
//         "Jun 2023": "14.9%",
//         "Mar 2023": "8.4%",
//         "Dec 2022": "1.5%",
//         "Sep 2022": "1.5%",
//         "Jun 2022": "1.5%",
//         "Mar 2022": "1.5%",
//         "Dec 2021": "1.5%"

//     }

//     "ranks": {
//         "Dec 2023": "20.9%",
//         "Sep 2023": "20.9%",
//         "Jun 2023": "14.9%",
//         "Mar 2023": "8.4%",
//         "Dec 2022": "1.5%",
//         "Sep 2022": "1.5%",
//         "Jun 2022": "1.5%",
//         "Mar 2022": "1.5%",
//         "Dec 2021": "1.5%"

//     }
//   }
// }`
// ]

// const testing = Object.values(JsonString);

// console.log(JSON.stringify(testing, null, 2));




// // a = {
// //   key1: 120,
// //   key2: 140,
// //   key25: 160
// // }

// // console.log(a.key1)

// // console.log(a["key 25"])
