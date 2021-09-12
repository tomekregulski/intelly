export const data = 'hello';

export const productData = (testData) => {
  let skus = [];
  if (testData.length) {
    testData.map((item) => {
      if (!skus.find((o) => o.name === item.sku)) {
        skus.push({
          name: item.sku,
          stores: 0,
          salesWeek: 0,
          salesWeek2: 0,
          salesWeek3: 0,
          salesWeek4: 0,
          sales4W: 0,
          sales12W: 0,
          sales52W: 0,
          price: 0,
        });
      }
    });
  }

  for (var i = 0; i < testData.length; i++) {
    for (var j = 0; j < skus.length; j++) {
      if (testData[i].sku === skus[j].name) {
        skus[j].stores = skus[j].stores + 1;
        skus[j].salesWeek = skus[j].salesWeek + testData[i].salesWeek;
        skus[j].salesWeek2 = skus[j].salesWeek2 + testData[i].salesWeek2;
        skus[j].salesWeek3 = skus[j].salesWeek3 + testData[i].salesWeek3;
        skus[j].salesWeek4 = skus[j].salesWeek4 + testData[i].salesWeek4;
        skus[j].sales4W =
          skus[j].sales4W +
          testData[i].salesWeek +
          testData[i].salesWeek2 +
          testData[i].salesWeek3 +
          testData[i].salesWeek4;
        skus[j].sales12W = skus[j].sales12W + testData[i].sales12W;
        skus[j].sales52W = skus[j].sales52W + testData[i].sales52W;
        skus[j].price = testData[i].price;
      }
    }
  }
  return skus;
};

export const storeData = (testData) => {
  let stores = [];
  if (testData.length) {
    testData.map((item) => {
      if (!stores.find((o) => o.name === item.store)) {
        stores.push({
          name: item.store,
          sales: {},
        });
      }
    });
  }

  for (var i = 0; i < testData.length; i++) {
    for (var j = 0; j < stores.length; j++) {
      if (testData[i].store === stores[j].name) {
        let sku = testData[i].sku;
        if (!(sku in stores[j].sales)) {
          stores[j].sales[sku] = {};
        }
        stores[j].sales[sku]['week1'] = testData[i].salesWeek;
        stores[j].sales[sku]['week2'] = testData[i].salesWeek2;
        stores[j].sales[sku]['week3'] = testData[i].salesWeek3;
        stores[j].sales[sku]['week4'] = testData[i].salesWeek4;
        // if (!('week1' in stores[j].sales[sku])) {
        //   stores[j].sales[sku]['week1'] = testData[i].salesWeek;
        // }
        // console.log(stores[j].sales[sku]);
        // let skuSales = {};
        // skuSales.week1 = testData[i].salesWeek;
        // skuSales.week2 = testData[i].salesWeek2;
        // skuSales.week3 = testData[i].salesWeek3;
        // skuSales.week4 = testData[i].salesWeek4;
        // stores[j].sales[sku] = skuSales;
        // stores[j].sales[sku].push(testData[i].salesWeek);
        // stores[j].sales[sku].push(testData[i].salesWeek2);
        // stores[j].sales[sku].push(testData[i].salesWeek3);
        // stores[j].sales[sku].push(testData[i].salesWeek4);
        // skuArray.push(testData[i].salesWeek);
        // skuArray.push(testData[i].salesWeek2);
        // skuArray.push(testData[i].salesWeek3);
        // skuArray.push(testData[i].salesWeek4);
        // stores[j].sales.sku.push(skuArray);
      }
    }
  }

  return stores;
};

// const handleChange = (event) => {
//   event.preventDefault();
//   const newRegion = event.target.value;
//   if (event.target.value === 'all regions') {
//     setFilteredData(data);
//   } else {
//     setFilteredData(data.filter((item) => item.region === newRegion));
//   }
// };
