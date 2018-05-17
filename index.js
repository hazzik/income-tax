var NZD = 0.69;
var AUD = 0.75;
var CLP = 1 / 631.19; var CLP_UTA = 570.456 * CLP;
var UYU = 1 / 31.13;
var CAD = 0.78;

window.onload = function () {
    var nz = [
        [70000 * NZD, 0.330],
        [48000 * NZD, 0.300],
        [14000 * NZD, 0.170],
        [0 * NZD, 0.105]
    ];
    //http://www.sii.cl/aprenda_sobre_impuestos/impuestos/imp_directos.htm#o2p3
    var cl = [
        [150 * CLP_UTA, 0.400],
        [120 * CLP_UTA, 0.355],
        [90 * CLP_UTA, 0.304],
        [70 * CLP_UTA, 0.230],
        [50 * CLP_UTA, 0.135],
        [30 * CLP_UTA, 0.080],
        [13.5 * CLP_UTA, 0.040]
    ];
    //http://taxsummaries.pwc.com/uk/taxsummaries/wwts.nsf/ID/Uruguay-Individual-Taxes-on-personal-income
    var uy = [
        [4983180 * UYU, 0.36],
        [3249900 * UYU, 0.31],
        [2166600 * UYU, 0.27],
        [1299960 * UYU, 0.25],
        [649980 * UYU, 0.24],
        [433320 * UYU, 0.15],
        [303324 * UYU, 0.10],
    ];

    var au = [
        [180000 * AUD, 0.450],
        [87000 * AUD, 0.370],
        [37000 * AUD, 0.325],
        [18200 * AUD, 0.190]
    ];

    //https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html
    var ca = [
        [205842 * CAD, 0.33],
        [144489 * CAD, 0.29],
        [93208 * CAD, 0.26],
        [46605 * CAD, 0.205],
        [0 * CAD, 0.15],
    ];

    /*
    5.05% on the first $42,960 of taxable income, +
    9.15% on the next $42,963, +
    11.16% on the next $64,077, +
    12.16% on the next $70,000, +
    13.16 % on the amount over $220,000
    */
    var ca_ontario = [
        [220000 * CAD, 0.1316],
        [150000 * CAD, 0.1216],
        [85923 * CAD, 0.1116],
        [42960 * CAD, 0.0915],
        [0 * CAD, 0.0505]
    ];

    //http://taxsummaries.pwc.com/uk/taxsummaries/wwts.nsf/ID/Switzerland-Individual-Taxes-on-personal-income
    var CHF = 1.00;
    var ch = [
        [895800 * CHF, 0.115],
        [145000 * CHF, 0.13],
        [143100 * CHF, 0.12],
        [141200 * CHF, 0.11],
        [137300 * CHF, 0.10],
        [131700 * CHF, 0.09],
        [124200 * CHF, 0.08],
        [114700 * CHF, 0.07],
        [103400 * CHF, 0.06],
        [90300 * CHF, 0.05],
        [75300 * CHF, 0.04],
        [58400 * CHF, 0.03],
        [50900 * CHF, 0.02],
        [28300 * CHF, 0.01],
    ];

    var ch_zurich = [
        [354100 * CHF, 0.13],
        [284800 * CHF, 0.12],
        [224700 * CHF, 0.11],
        [169300 * CHF, 0.10],
        [122900 * CHF, 0.09],
        [92100 * CHF, 0.08],
        [61300 * CHF, 0.07],
        [47400 * CHF, 0.06],
        [36700 * CHF, 0.05],
        [27300 * CHF, 0.04],
        [19600 * CHF, 0.03],
        [13500 * CHF, 0.02]
    ];

    function tax(x, brakes) {
        var t = 0;
        var s = x;
        for (var i = 0; i < brakes.length; i++) {
            var br = brakes[i];
            if (s > br[0]) {
                t += (s - br[0]) * br[1];
                s = br[0];
            }
        }
        return Math.round(t * 100) / 100;
    }

    var labels = [];
    for (var l = 0; l < 100000; l += 2000) {
        labels.push(l);
    }

    var ctx = document.getElementById("myChart");
    var data = {
        labels: labels,
        datasets: [{
            label: "New Zealand",
            function: function (x) {
                return tax(x, nz);
            },
            borderColor: "rgba(75, 192, 192, 1)",
            data: [],
            fill: false
        },
        {
            label: "Chile",
            function: function (x) {
                return tax(x, cl);
            },
            borderColor: "rgba(153, 102, 255, 1)",
            data: [],
            fill: false
        },
        {
            label: "Uruguay",
            function: function (x) {
                return tax(x, uy);
            },
            borderColor: "blue",
            data: [],
            fill: false
        },
        {
            label: "Australia",
            function: function (x) {
                return tax(x, au);
            },
            borderColor: "green",
            data: [],
            fill: false
        },
        {
            label: "Canada (Ontario)",
            function: function (x) {
                return tax(x, ca) + tax(x, ca_ontario);
            },
            borderColor: "#ECA18D",
            data: [],
            fill: false
        },
        {
            label: "Swiss (Zurich, Couple with Kids)",
            function: function (x) {
                return tax(x, ch) + 1.19 * tax(x, ch_zurich);
            },
            borderColor: "red",
            data: [],
            fill: false
        }]
    };

    Chart.pluginService.register({
        beforeInit: function (chart) {
            var data = chart.config.data;
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                    var fct = data.datasets[i].function,
                        x = data.labels[j],
                        y = fct(x);
                    data.datasets[i].data.push(y);
                }
            }
        }
    });

    var myBarChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};
