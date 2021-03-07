var wins = [
    [ [2006,13],[2007,11],[2008,15],[2009,15],
      [2010,18],[2011,21],[2012,28]
    ]
];

window.onload = function () {
    Flotr.draw(
        document.getElementById("chart"),
        wins,
        {
            bars: {
                show: true
            }
        }
    );
};

Flotr.draw(document.getElementById("chart"), wins, {
    bars: {
        show: true
    },
    yaxis: {
        min: 0,
        tickDecimals: 0
    }
});

Flotr.draw(document.getElementById("chart"), wins, {
    bars: {
        show: true,
        barWidth: 0.5
    },
    yaxis: {
        min: 0,
        tickDecimals: 0
    },
    xaxis: {
        ticks: years
    }
});