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
    // console.log(JSON.stringify(addedMissingFieldToJson, null, 2));


    // console.log(addedMissingFieldToJson);

    const investorNamesSet = new Set();

    let namesOfAllInvestors


    for (i = 0; i < addedMissingFieldToJson.length; i++) {

      namesOfAllInvestors = addedMissingFieldToJson[i].InvestorName;

      // console.log("names+", namesOfAllInvestors)

      investorNamesSet.add(namesOfAllInvestors);


    }

    // console.log("uniquenames", investorNamesSet)
    // console.log("names+", namesOfAllInvestors)

    //  Follow the code on 25th line on 07-02-2025
    //  Extract all the names of investors from addedMissingFieldToJson and add it to investorNamesSet and then modify the code in line 27

    const finalData = {};
    for (const uniqueinvestor of Array.from(investorNamesSet)) {

      // console.log("unique", uniqueinvestor);

      const forSingleInvestor = addedMissingFieldToJson.filter(jsObject => jsObject.InvestorName === uniqueinvestor)

      // console.log("fsi", forSingleInvestor);



      let sorted = forSingleInvestor.sort((a, b) => {

        //let sorted = forSingleInvestor.sort((a, b) => {

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

      finalData[uniqueinvestor] = rankingForIndividualMonth

    }
    console.log(JSON.stringify(finalData, null, 2));

  })