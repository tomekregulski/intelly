export const fetchTimeframeProductData = (
  data,
  region,
  skuList,
  timeframes,
  currentTimeframe
) => {
  let skus = [];
  let filteredData;
  region !== 'all regions'
    ? (filteredData = data.filter((item) => item.region === region))
    : (filteredData = data);

  filteredData.length &&
    filteredData.forEach((item) => {
      !skus.find((o) => o.name === item.sku_name) &&
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
    });

  filteredData.forEach((entry) => {
    skus.forEach((sku) => {
      if (entry.sku_name === sku.name && entry.timeframe === currentTimeframe) {
        sku.storesLW = sku.storesLW + 1;
        sku.netSalesLW = sku.netSalesLW + parseInt(entry.net_sales);
        sku.unitSalesLW = sku.unitSalesLW + parseInt(entry.unit_sales);
      }
      if (
        entry.sku_name === sku.name &&
        entry.timeframe === `${currentTimeframe}_04_weeks`
      ) {
        sku.stores4W = sku.stores4W + 1;
        sku.netSales4W = sku.netSales4W + parseInt(entry.net_sales);
        sku.unitSales4W = sku.unitSales4W + parseInt(entry.unit_sales);
      }
      if (
        entry.sku_name === sku.name &&
        entry.timeframe === `${currentTimeframe}_12_weeks`
      ) {
        sku.stores12W = sku.stores12W + 1;
        sku.netSales12W = sku.netSales12W + parseInt(entry.net_sales);
        sku.unitSales12W = sku.unitSales12W + parseInt(entry.unit_sales);
      }
      if (
        entry.sku_name === sku.name &&
        entry.timeframe === `${currentTimeframe}_52_weeks`
      ) {
        sku.stores52W = sku.stores52W + 1;
        sku.netSales52W = sku.netSales52W + parseInt(entry.net_sales);
        sku.unitSales52W = sku.unitSales52W + parseInt(entry.unit_sales);
      }
      if (entry.sku_name === sku.name && entry.timeframe === timeframes[1]) {
        sku.unitSalesWeek2 = sku.unitSalesWeek2 + parseInt(entry.unit_sales);
      }
      if (entry.sku_name === sku.name && entry.timeframe === timeframes[2]) {
        sku.unitSalesWeek3 = sku.unitSalesWeek3 + parseInt(entry.unit_sales);
      }
      if (entry.sku_name === sku.name && entry.timeframe === timeframes[3]) {
        sku.unitSalesWeek4 = sku.unitSalesWeek4 + parseInt(entry.unit_sales);
      }
    });
  });

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
  region !== 'all regions'
    ? (filteredData = data.filter((item) => item.region === region))
    : (filteredData = data);

  filteredData.length &&
    filteredData.forEach((item) => {
      !stores.find((o) => o.name === item.store_name) &&
        stores.push({
          name: item.store_name,
          totalSalesWeek1: 0,
          totalSalesWeek2: 0,
          totalSalesWeek3: 0,
          totalSalesWeek4: 0,
          sales: {},
        });
    });

  filteredData.forEach((entry) => {
    stores.forEach((store) => {
      if (entry.store_name === store.name && entry.timeframe.length === 8) {
        let sku = entry.sku_name;
        if (!(sku in store.sales)) {
          store.sales[sku] = {};
        }
        if (entry.timeframe === timeframes[0]) {
          store.sales[sku]['week1'] = parseInt(entry.unit_sales);
          store.totalSalesWeek1 =
            store.totalSalesWeek1 + parseInt(entry.unit_sales);
        }
        if (entry.timeframe === timeframes[1]) {
          store.sales[sku]['week2'] = parseInt(entry.unit_sales);
          store.totalSalesWeek2 =
            store.totalSalesWeek2 + parseInt(entry.unit_sales);
        }
        if (entry.timeframe === timeframes[2]) {
          store.sales[sku]['week3'] = parseInt(entry.unit_sales);
          store.totalSalesWeek3 =
            store.totalSalesWeek3 + parseInt(entry.unit_sales);
        }
        if (entry.timeframe === timeframes[3]) {
          store.sales[sku]['week4'] = parseInt(entry.unit_sales);
          store.totalSalesWeek4 =
            store.totalSalesWeek4 + parseInt(entry.unit_sales);
        }
      }
    });
  });
  stores.sort((a, b) => (a.totalSalesWeek1 > b.totalSalesWeek1 ? -1 : 1));

  return stores;
};

export const fetchWeeklyProductData = (
  data,
  region,
  skuList,
  timeframes,
  currentTimeframe
) => {
  let skus = [];
  let filteredData;
  region !== 'all regions'
    ? (filteredData = data.filter((item) => item.region === region))
    : (filteredData = data);

  filteredData.length &&
    filteredData.forEach((item) => {
      !skus.find((o) => o.name === item.sku_name) &&
        skus.push({
          name: item.sku_name,
          unitSalesLW: 0,
          unitSalesWeek2: 0,
          unitSalesWeek3: 0,
          unitSalesWeek4: 0,
        });
    });

  filteredData.forEach((entry) => {
    skus.forEach((sku) => {
      if (entry.sku_name === sku.name && entry.timeframe === currentTimeframe) {
        sku.unitSalesLW = sku.unitSalesLW + parseInt(entry.unit_sales);
      }
      if (entry.sku_name === sku.name && entry.timeframe === timeframes[1]) {
        sku.unitSalesWeek2 = sku.unitSalesWeek2 + parseInt(entry.unit_sales);
      }
      if (entry.sku_name === sku.name && entry.timeframe === timeframes[2]) {
        sku.unitSalesWeek3 = sku.unitSalesWeek3 + parseInt(entry.unit_sales);
      }
      if (entry.sku_name === sku.name && entry.timeframe === timeframes[3]) {
        sku.unitSalesWeek4 = sku.unitSalesWeek4 + parseInt(entry.unit_sales);
      }
    });
  });

  return skus;
};

export const fetchMonthlyProducts = (
  data,
  region,
  skuList,
  timeframes,
  currentTimeframe
) => {
  let skus = [];
  let filteredData;
  region !== 'all regions'
    ? (filteredData = data.filter((item) => item.region === region))
    : (filteredData = data);

  filteredData.length &&
    filteredData.forEach((item) => {
      !skus.find((o) => o.name === item.sku_name) &&
        skus.push({
          name: item.sku_name,
        });
    });

  skus.forEach((sku) => {
    for (let j = 0; j < timeframes.length; j++) {
      const storesKey = `stores${(j + 1) * 4}W`;
      const netSalesKey = `netSales${(j + 1) * 4}W`;
      const unitSalesKey = `unitSales${(j + 1) * 4}W`;
      sku[storesKey] = 0;
      sku[netSalesKey] = 0;
      sku[unitSalesKey] = 0;
    }
  });

  filteredData.forEach((data) => {
    for (let j = 0; j < timeframes.length; j++) {
      let storeKey;
      let unitSalesKey;
      let netSalesKey;
      let week;
      let sku;
      let netSales;
      let unitSales;
      if (timeframes[j] === data.timeframe) {
        week = (j + 1) * 4;
        storeKey = `stores${week}W`;
        unitSalesKey = `unitSales${week}W`;
        netSalesKey = `netSales${week}W`;
        sku = data.sku_name;
        netSales = data.net_sales;
        unitSales = data.unit_sales;
      }
      skus.forEach((item) => {
        if (item.name === sku) {
          item[storeKey] = item[storeKey] + 1;
          item[unitSalesKey] = item[unitSalesKey] + parseInt(unitSales);
          item[netSalesKey] = item[netSalesKey] + parseInt(netSales);
        }
      });
    }
  });

  return skus;
};
