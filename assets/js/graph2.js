
var sales = [
    {
        products: "SALSA CHIPOTLE ROASTED MEDIUM",
        sales: "50"
    },
    {
        products: "SALSA CLASSIC ROJA MEDIUM",
        sales: "134"
    },
    {
        products: "SALSA CLASSIC VERDE MEDIUM",
        sales: "132"
    },
    {
        products: "SALSA GARLIC TOMATO MILD",
        sales: "53"
    },
    {
        products: "SAUCE 3 PEPPER TOMATILLO",
        sales: "26"
    },
    {
        products: "SAUCE CHILI PEQUIN PEPPER",
        sales: "9"
    },
    {
        products: "SAUCE HOT ORIGINAL",
        sales: "32"
    },
    {
        products: "SAUCE PEPPER AVOCADO LIME",
        sales: "26"
    },
    {
        products: "SAUCE PEPPER ROASTED TOMATILLO",
        sales: "28"
    },
    {
        products: "SAUCE PEPPER SMOKEY CHIPOTLE",
        sales: "31"
    },
    {
        products: "SAUCE RED PEPPER CHIPOTLE",
        sales: "28"
    },
    {
        products: "SAUCE SRIRACHA THAI",
        sales: "25"
    }
];

addData(sales);

function addData(data) {

    var dataPoints = [];

    for (var i = 0; i < data.length; i++) {
        dataPoints.push({
            x: data[i].products,
            y: data[i].sales
        });
    }
    // chart.render()
    // plotChart(dataPoints);
}

// function plotChart(dataPoints) {
//     console.log(dataPoints);
//     var chart = new CanvasJS.Chart("chartContainer", {
//         animationEnabled: true,
//         theme: "light2",
//         title: {
//             text: "February Sales Data"
//         },
//         axisY: {
//             title: "Units",
//             titleFontSize: 24,
//             includeZero: true
//         },
//         data: [{
//             type: "column",
//             yValueFormatString: "#,### Units",
//             dataPoints: dataPoints
//         }]
//     });

//     chart.render();
// };
window.onload = function() {

    var dataPoints = [];
    
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Daily Sales Data"
        },
        axisY: {
            title: "Units",
            titleFontSize: 24,
            includeZero: true
        },
        data: [{
            type: "column",
            yValueFormatString: "",
            dataPoints: dataPoints
        }]
    });
    
    function addData(data) {
        for (var i = 0; i < data.length; i++) {
            dataPoints.push({
                x: data[i].products,
                y: data[i].sales
            });
        }
        chart.render();
        console.log(dataPoints);
    
    }
    
    addData(sales);
    
    }