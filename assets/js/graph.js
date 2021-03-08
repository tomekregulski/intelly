var wins = [[[0,13],[1,11],[2,15],[3,15],[4,18],[5,21],[6,28]]];
var wins2 = [[[0,28]],[[1,28]],[[2,21]],[[3,20]],[[4,19]]];
var teams = [
    [0, "MCI"],
    [1, "MUN"],
    [2, "ARS"],
    [3, "TOT"],
    [4, "NEW"]
];

var unitSales = [
    {
        products: "SALSA CHIPOTLE ROASTED MEDIUM",
        units: 50
    },
    {
        products: "SALSA CLASSIC ROJA MEDIUM",
        units: 134
    },
    {
        products: "SALSA CLASSIC VERDE MEDIUM",
        units: 132
    },
    {
        products: "SALSA GARLIC TOMATO MILD",
        units: 53
    },
    {
        products: "SAUCE 3 PEPPER TOMATILLO",
        units: 26
    },
    {
        products: "SAUCE CHILI PEQUIN PEPPER",
        units: 9
    },
    {
        products: "SAUCE HOT ORIGINAL",
        units: 32
    },
    {
        products: "SAUCE PEPPER AVOCADO LIME",
        units: 26
    },
    {
        products: "SAUCE PEPPER ROASTED TOMATILLO",
        units: 28
    },
    {
        products: "SAUCE PEPPER SMOKEY CHIPOTLE",
        units: 31
    },
    {
        products: "SAUCE RED PEPPER CHIPOTLE",
        units: 28
    },
    {
        products: "SAUCE SRIRACHA THAI",
        units: 25
    }
];

var productNest = [];
var salesNest = [];

createSales();

function createSales() {
    var salesTest = [];
    console.log('hello');
    for (var i = 0; i < unitSales.length; i++) {
        // console.log(unitSales[i].units);
        var units = unitSales[i].units;
        salesTest.push([i, units]);
    }
    // console.log(salesTest);
    salesNest.push(salesTest);
    console.log(salesNest);

    for (var i = 0; i < unitSales.length; i++) {
        // console.log(unitSales[i].products);
        var products = unitSales[i].products;
        productNest.push([i, products]);
    }
    console.log(productNest);
    createGraph();
};

var sales = [[[0, 145],[1, 80],[2, 40],[3, 850]]];
var product = [[0, "salsa"], [1, "sauce"]];

function createGraph() {
    Flotr.draw(
        document.getElementById("chart"), salesNest, {
            title: "Sales Data Test",
            colors: ["#89AFD2"],
            bars: {
                show: true,
                barWidth: 0.5,
                shadowSize: 0,
                fillOpacity: 1,
                lineWidth: 0
            },
            yaxis: {
                min: 0,
                tickDecimals: 0
            },
            xaxis: {
                ticks: productNest
            },
            grid: {
                horizontalLines: false,
                verticalLines: false
            }
    })
};
console.log(sales);
console.log(salesNest[0][0][0]);
console.log(salesNest[0][0][1]);
// console.log(salesNest[0][1][1]);
console.log(productNest[0][1]);
console.log(productNest[1][1]);