const fs = require('fs');
const csv = require('csvtojson');

csv()
    .fromFile("shameless_cloning_datadump" + '.csv')
    .then((toJson) => {

        const addedMissingFieldToJson = toJson.map(json => {
            const { field1, ...rest } = json;
            return {
                InvestorName: field1,
                ...rest
            };
        });

        const forSingleInvestor = addedMissingFieldToJson.filter(jsObject => jsObject.InvestorName === "Vijay Kishanlal Kedia")

        let sorted = forSingleInvestor.sort((a, b) => {
            const aParsed = parseFloat(a["Dec 2023"].replace("%", "").replace("-", "0"));
            const bParsed = parseFloat(b["Dec 2023"].replace("%", "").replace("-", "0"));
            return bParsed - aParsed;

        })

        let sortedForUnnecessaryFields = sorted.map(function (obj) {
            delete obj.InvestorName;
            delete obj['Holding Value in crores'];
            return obj;
        })

        const modifiedObjCompany = sortedForUnnecessaryFields.map(obj => {
            const { ['Name of Company']: keyValue, ...rest } = obj;
            return {
                [keyValue]: {
                    'percents': { ...rest },
                    'ranks': {}
                }
            };
        });

        // console.log(JSON.stringify(modifiedObjCompany, null, 2));

        // const modifiedObjCompanyRanks1 = modifiedObjCompany.map(obj => {
        //   const objKey = Object.keys(obj)[0];
        //   obj[objKey].ranks = {};
        //   return obj;
        // })

        const FirstObjRanks1 = modifiedObjCompany[0];

        const months = Object.keys(Object.values(FirstObjRanks1)[0].percents);

        // console.log(months);

        let rankingForIndividualMonth

        for (const month of months) {
            const sortedPercForMonth = modifiedObjCompany.sort((company1, company2) => {
                const com1PercValue = parseFloat(Object.values(company1)[0].percents[month].replace("%", "").replace("-", "0"));
                const com2PercValue = parseFloat(Object.values(company2)[0].percents[month].replace("%", "").replace("-", "0"));
                return com2PercValue - com1PercValue;
            });

            rankingForIndividualMonth = sortedPercForMonth.map((obj, i) => {
                const keyContent = Object.keys(obj)[0];
                obj[keyContent].ranks[month] = i + 1;
                return obj;
            })
        }
        console.log("rank", JSON.stringify(rankingForIndividualMonth, null, 2));
    })