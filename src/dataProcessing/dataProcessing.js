// export const fetchProductData = (testData, region) => {
//   let skus = [];
//   let filteredData;
//   if (region !== 'all regions') {
//     filteredData = testData.filter((item) => item.region === region);
//   } else {
//     filteredData = testData;
//   }
//   if (filteredData.length) {
//     filteredData.map((item) => {
//       if (!skus.find((o) => o.name === item.sku)) {
//         skus.push({
//           name: item.sku,
//           stores: 0,
//           salesWeek: 0,
//           salesWeek2: 0,
//           salesWeek3: 0,
//           salesWeek4: 0,
//           sales4W: 0,
//           sales12W: 0,
//           sales52W: 0,
//           price: 0,
//         });
//       }
//     });
//   }

//   for (var i = 0; i < filteredData.length; i++) {
//     for (var j = 0; j < skus.length; j++) {
//       if (filteredData[i].sku === skus[j].name) {
//         skus[j].stores = skus[j].stores + 1;
//         skus[j].salesWeek = skus[j].salesWeek + filteredData[i].salesWeek;
//         skus[j].salesWeek2 = skus[j].salesWeek2 + filteredData[i].salesWeek2;
//         skus[j].salesWeek3 = skus[j].salesWeek3 + filteredData[i].salesWeek3;
//         skus[j].salesWeek4 = skus[j].salesWeek4 + filteredData[i].salesWeek4;
//         skus[j].sales4W =
//           skus[j].sales4W +
//           filteredData[i].salesWeek +
//           filteredData[i].salesWeek2 +
//           filteredData[i].salesWeek3 +
//           filteredData[i].salesWeek4;
//         skus[j].sales12W = skus[j].sales12W + filteredData[i].sales12W;
//         skus[j].sales52W = skus[j].sales52W + filteredData[i].sales52W;
//         skus[j].price = filteredData[i].price;
//       }
//     }
//   }
//   return skus;
// };

export const fetchTimeframeProductData = (
  data,
  region,
  skuList,
  timeframes,
  currentTimeframe
) => {
  let skus = [];
  let filteredData;
  if (region !== 'all regions') {
    filteredData = data.filter((item) => item.region === region);
  } else {
    filteredData = data;
  }
  if (filteredData.length) {
    filteredData.map((item) => {
      if (!skus.find((o) => o.name === item.sku_name)) {
        skus.push({
          name: item.sku_name,
          storesLW: 0,
          stores4W: 0,
          stores12W: 0,
          stores52W: 0,
          netSalesLW: 0,
          netSales4W: 0,
          netSales12W: 0,
          netSales52W: 0,
          unitSalesLW: 0,
          unitSalesWeek2: 0,
          unitSalesWeek3: 0,
          unitSalesWeek4: 0,
          unitSales4W: 0,
          unitSales12W: 0,
          unitSales52W: 0,
        });
      }
    });
  }

  for (var i = 0; i < filteredData.length; i++) {
    for (var j = 0; j < skus.length; j++) {
      if (
        filteredData[i].sku_name === skus[j].name &&
        filteredData[i].timeframe === currentTimeframe
      ) {
        skus[j].storesLW = skus[j].storesLW + 1;
        skus[j].netSalesLW =
          skus[j].netSalesLW + parseInt(filteredData[i].net_sales);
        skus[j].unitSalesLW =
          skus[j].unitSalesLW + parseInt(filteredData[i].unit_sales);
      }
      if (
        filteredData[i].sku_name === skus[j].name &&
        filteredData[i].timeframe === `${currentTimeframe}_04_weeks`
      ) {
        skus[j].stores4W = skus[j].stores4W + 1;
        skus[j].netSales4W =
          skus[j].netSales4W + parseInt(filteredData[i].net_sales);
        skus[j].unitSales4W =
          skus[j].unitSales4W + parseInt(filteredData[i].unit_sales);
      }
      if (
        filteredData[i].sku_name === skus[j].name &&
        filteredData[i].timeframe === `${currentTimeframe}_12_weeks`
      ) {
        skus[j].stores12W = skus[j].stores12W + 1;
        skus[j].netSales12W =
          skus[j].netSales12W + parseInt(filteredData[i].net_sales);
        skus[j].unitSales12W =
          skus[j].unitSales12W + parseInt(filteredData[i].unit_sales);
      }
      if (
        filteredData[i].sku_name === skus[j].name &&
        filteredData[i].timeframe === `${currentTimeframe}_52_weeks`
      ) {
        skus[j].stores52W = skus[j].stores52W + 1;
        skus[j].netSales52W =
          skus[j].netSales52W + parseInt(filteredData[i].net_sales);
        skus[j].unitSales52W =
          skus[j].unitSales52W + parseInt(filteredData[i].unit_sales);
      }
      if (
        filteredData[i].sku_name === skus[j].name &&
        filteredData[i].timeframe === timeframes[1]
      ) {
        skus[j].unitSalesWeek2 =
          skus[j].unitSalesWeek2 + parseInt(filteredData[i].unit_sales);
      }
      if (
        filteredData[i].sku_name === skus[j].name &&
        filteredData[i].timeframe === timeframes[2]
      ) {
        skus[j].unitSalesWeek3 =
          skus[j].unitSalesWeek3 + parseInt(filteredData[i].unit_sales);
      }
      if (
        filteredData[i].sku_name === skus[j].name &&
        filteredData[i].timeframe === timeframes[3]
      ) {
        skus[j].unitSalesWeek4 =
          skus[j].unitSalesWeek4 + parseInt(filteredData[i].unit_sales);
      }
    }
  }
  return skus;
};

export const fetchTimeframeStoreData = (
  data,
  region,
  skuList,
  timeframes,
  currentTimeframe
) => {
  let stores = [];
  let filteredData;
  if (region !== 'all regions') {
    filteredData = data.filter((item) => item.region === region);
  } else {
    filteredData = data;
  }
  if (filteredData.length) {
    filteredData.map((item) => {
      if (!stores.find((o) => o.name === item.store_name)) {
        stores.push({
          name: item.store_name,
          sales: {},
        });
      }
    });
  }

  for (var i = 0; i < filteredData.length; i++) {
    for (var j = 0; j < stores.length; j++) {
      if (
        filteredData[i].store_name === stores[j].name &&
        filteredData[i].timeframe.length === 8
      ) {
        let sku = filteredData[i].sku_name;
        if (!(sku in stores[j].sales)) {
          stores[j].sales[sku] = {};
        }
        if (filteredData[i].timeframe === timeframes[0]) {
          stores[j].sales[sku]['week1'] = parseInt(filteredData[i].unit_sales);
        }
        if (filteredData[i].timeframe === timeframes[1]) {
          stores[j].sales[sku]['week2'] = parseInt(filteredData[i].unit_sales);
        }
        if (filteredData[i].timeframe === timeframes[2]) {
          stores[j].sales[sku]['week3'] = parseInt(filteredData[i].unit_sales);
        }
        if (filteredData[i].timeframe === timeframes[3]) {
          stores[j].sales[sku]['week4'] = parseInt(filteredData[i].unit_sales);
        }
      }
    }
  }
  return stores;
};

// export const fetchStoreData = (testData, region) => {
//   let stores = [];
//   let filteredData;
//   if (region !== 'all regions') {
//     filteredData = testData.filter((item) => item.region === region);
//   } else {
//     filteredData = testData;
//   }
//   if (filteredData.length) {
//     filteredData.map((item) => {
//       if (!stores.find((o) => o.name === item.store)) {
//         stores.push({
//           name: item.store,
//           sales: {},
//         });
//       }
//     });
//   }

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

//   return stores;
// };
