const fs = require('fs');
const csv = require('csvtojson');
const { json } = require('stream/consumers');

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
        // console.log(addedMissingFieldToJson);

        const investorNamesSet = new Set();
        let namesOfAllInvestors
        for (i = 0; i < addedMissingFieldToJson.length; i++) {
            namesOfAllInvestors = addedMissingFieldToJson[i].InvestorName;
            investorNamesSet.add(namesOfAllInvestors);
        }

        const finalData = {};
        for (const uniqueinvestor of Array.from(investorNamesSet)) {

            const forSingleInvestor = addedMissingFieldToJson.filter(jsObject => jsObject.InvestorName === uniqueinvestor)

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

            const FirstObjRanks1 = modifiedObjCompany[0];
            const months = Object.keys(Object.values(FirstObjRanks1)[0].percents);

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

            finalData[uniqueinvestor] = rankingForIndividualMonth

        }
        console.log(JSON.stringify(finalData, null, 2));

    })