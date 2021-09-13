export const fetchProductData = (testData, region) => {
  let skus = [];
  let filteredData;
  if (region !== 'all regions') {
    filteredData = testData.filter((item) => item.region === region);
  } else {
    filteredData = testData;
  }
  if (filteredData.length) {
    filteredData.map((item) => {
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

  for (var i = 0; i < filteredData.length; i++) {
    for (var j = 0; j < skus.length; j++) {
      if (filteredData[i].sku === skus[j].name) {
        skus[j].stores = skus[j].stores + 1;
        skus[j].salesWeek = skus[j].salesWeek + filteredData[i].salesWeek;
        skus[j].salesWeek2 = skus[j].salesWeek2 + filteredData[i].salesWeek2;
        skus[j].salesWeek3 = skus[j].salesWeek3 + filteredData[i].salesWeek3;
        skus[j].salesWeek4 = skus[j].salesWeek4 + filteredData[i].salesWeek4;
        skus[j].sales4W =
          skus[j].sales4W +
          filteredData[i].salesWeek +
          filteredData[i].salesWeek2 +
          filteredData[i].salesWeek3 +
          filteredData[i].salesWeek4;
        skus[j].sales12W = skus[j].sales12W + filteredData[i].sales12W;
        skus[j].sales52W = skus[j].sales52W + filteredData[i].sales52W;
        skus[j].price = filteredData[i].price;
      }
    }
  }
  return skus;
};

export const fetchStoreData = (testData, region) => {
  let stores = [];
  let filteredData;
  if (region !== 'all regions') {
    filteredData = testData.filter((item) => item.region === region);
  } else {
    filteredData = testData;
  }
  if (filteredData.length) {
    filteredData.map((item) => {
      if (!stores.find((o) => o.name === item.store)) {
        stores.push({
          name: item.store,
          sales: {},
        });
      }
    });
  }

  for (var i = 0; i < filteredData.length; i++) {
    for (var j = 0; j < stores.length; j++) {
      if (filteredData[i].store === stores[j].name) {
        let sku = filteredData[i].sku;
        if (!(sku in stores[j].sales)) {
          stores[j].sales[sku] = {};
        }
        stores[j].sales[sku]['week1'] = filteredData[i].salesWeek;
        stores[j].sales[sku]['week2'] = filteredData[i].salesWeek2;
        stores[j].sales[sku]['week3'] = filteredData[i].salesWeek3;
        stores[j].sales[sku]['week4'] = filteredData[i].salesWeek4;
      }
    }
  }

  return stores;
};

export const fetchStoreByProductData = (testData, region) => {
  let stores = [];
  let filteredData;
  if (region !== 'all regions') {
    filteredData = testData.filter((item) => item.region === region);
  } else {
    filteredData = testData;
  }
  if (filteredData.length) {
    filteredData.map((item) => {
      if (!stores.find((o) => o.name === item.store)) {
        stores.push({
          name: item.store,
          sales: {},
        });
      }
    });
  }

  //   for (var i = 0; i < filteredData.length; i++) {
  //     for (var j = 0; j < stores.length; j++) {
  //       if (filteredData[i].store === stores[j].name) {
  //         let sku = filteredData[i].sku;
  //         if (!(sku in stores[j].sales)) {
  //           stores[j].sales[sku] = {};
  //         }
  //         stores[j].sales[sku]['week1'] = filteredData[i].salesWeek;
  //         stores[j].sales[sku]['week2'] = filteredData[i].salesWeek2;
  //         stores[j].sales[sku]['week3'] = filteredData[i].salesWeek3;
  //         stores[j].sales[sku]['week4'] = filteredData[i].salesWeek4;
  //       }
  //     }
  //   }

  return stores;
};
