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
        units: "50"
    },
    {
        products: "SALSA CLASSIC ROJA MEDIUM",
        units: "134"
    },
    {
        products: "SALSA CLASSIC VERDE MEDIUM",
        sales: "132"
    },
    {
        products: "SALSA GARLIC TOMATO MILD",
        units: "53"
    },
    {
        products: "SAUCE 3 PEPPER TOMATILLO",
        units: "26"
    },
    {
        products: "SAUCE CHILI PEQUIN PEPPER",
        units: "9"
    },
    {
        products: "SAUCE HOT ORIGINAL",
        units: "32"
    },
    {
        products: "SAUCE PEPPER AVOCADO LIME",
        units: "26"
    },
    {
        products: "SAUCE PEPPER ROASTED TOMATILLO",
        units: "28"
    },
    {
        products: "SAUCE PEPPER SMOKEY CHIPOTLE",
        units: "31"
    },
    {
        products: "SAUCE RED PEPPER CHIPOTLE",
        units: "28"
    },
    {
        products: "SAUCE SRIRACHA THAI",
        units: "25"
    }
];

var sales = [[[0, 145],[1, 80]]];
var product = [[0, "salsa"], [1, "sauce"]];

window.onload = function () {
    Flotr.draw(
        document.getElementById("chart"), sales, {
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
                ticks: product
            },
            grid: {
                horizontalLines: false,
                verticalLines: false
            }
    })
};

console.log(sales[0][0][0]);
console.log(sales[0][0][1]);
console.log(sales[0][1][1]);
console.log(product[0][1]);
console.log(product[1][1]);