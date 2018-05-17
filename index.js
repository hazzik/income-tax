var NZD = 0.69;
var AUD = 0.75;
var CLP = 1 / 631.19; var CL_UTA = 570456 * CLP;
var UYU = 1 / 31.13; var UY_BPC = 3848 * UYU;
var CAD = 0.78;
var EUR = 1.18;

function parseQueryString(queryString) {
    var params = {};
    var queries = queryString.split('&');
    for (var i = 0, l = queries.length; i < queries.length; i++) {
        var temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
}

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
    return t;
}

function formatCurrency(c) {
    return '$' + c.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var params = parseQueryString(window.location.search.substring(1));

window.onload = function () {
    var nz = [
        [70000 * NZD, 0.330],
        [48000 * NZD, 0.300],
        [14000 * NZD, 0.170],
        [0 * NZD, 0.105]
    ];
    //http://www.sii.cl/aprenda_sobre_impuestos/impuestos/imp_directos.htm#o2p3
    var cl = [
        [150 * CL_UTA, 0.400],
        [120 * CL_UTA, 0.355],
        [90 * CL_UTA, 0.304],
        [70 * CL_UTA, 0.230],
        [50 * CL_UTA, 0.135],
        [30 * CL_UTA, 0.080],
        [13.5 * CL_UTA, 0.040]
    ];
    //http://www.dgi.gub.uy/wdgi/page?2,personas,personas-irpf--rentas-de-trabajo-dependiente-escalas-y-alicuotas,O,es,0,
    var uy = [
        [1380 * UY_BPC, 0.36],
        [900 * UY_BPC, 0.31],
        [600 * UY_BPC, 0.27],
        [360 * UY_BPC, 0.25],
        [180 * UY_BPC, 0.24],
        [120 * UY_BPC, 0.15],
        [84 * UY_BPC, 0.10],
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

    //https://nl.wikipedia.org/wiki/Box_1#Schijventarief_2018
    var nl = [
        [68507 * EUR, 0.5195],
        [33994 * EUR, 0.4085],
        [20142 * EUR, 0.132 + 0.2765],
        [0 * EUR, 0.089 + 0.2765]
    ];

    var from = parseInt(params['f']) || 0;
    var to = parseInt(params['t']) || 100000;
    var step = parseInt(params['s']) || 2000;

    var labels = [];
    for (var l = from; l < to; l += step) {
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
            label: "Switzerland (Zurich, Couple with Kids)",
            function: function (x) {
                return tax(x, ch) + 1.19 * tax(x, ch_zurich);
            },
            borderColor: "red",
            data: [],
            fill: false
        },
        {
            label: "Netherlands (including AOW-min)",
            function: function (x) {
                return tax(x, nl);
            },
            borderColor: "#EFBEFA",
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
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        var xLabel = data.labels[tooltipItem.index];
                        if (label) {
                            label += ': ';
                        }
                        label += formatCurrency(tooltipItem.yLabel) + ' (' + (100*tooltipItem.yLabel/xLabel).toFixed(2) + '%)';
                        return label;
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(label, index, labels) {
                            return formatCurrency(label);
                        }
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(label, index, labels) {
                            return formatCurrency(label);
                        }
                    }
                }]
            }
        }
    });
};
