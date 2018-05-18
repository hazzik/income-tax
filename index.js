

function parseQueryString(queryString) {
    var params = {};
    var queries = queryString.split('&');
    for (var i = 0, l = queries.length; i < queries.length; i++) {
        var temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
}

function setRates(data) {
    for (var key in data.rates) {
        if (data.rates.hasOwnProperty(key)) {
            var rate = data.rates[key];
            window[key] = 1 / rate;
        }
    }
    window.UY_BPC = 3848 * UYU;
    window.CL_UTA = 570456 * CLP;
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
        //[150 * CL_UTA, 0.400], // This rate is only for "el Presidente de la Republica, los Ministros de Estado, los Subsecretarios, los Senadores y Diputados"
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

    //https://www.emta.ee/eng/business-client/income-expenses-supply-profits/tax-rates
    var ee = [
        [0 * EUR, 0.2]
    ];

    //https://www.gov.hk/en/residents/taxes/taxfiling/taxrates/salariesrates.htm
    var hk = [
        [200000 * HKD, 0.17],
        [150000 * HKD, 0.14],
        [100000 * HKD, 0.10],
        [50000 * HKD, 0.06],
        [0 * HKD, 0.02]
    ];

    //https://nl.wikipedia.org/wiki/Box_1#Schijventarief_2018
    var nl = [
        [68507 * EUR, 0.5195],
        [33994 * EUR, 0.4085],
        [20142 * EUR, 0.132 + 0.2765],
        [0 * EUR, 0.089 + 0.2765]
    ];

    var sg = [
        [320000 * SGD, 0.22],
        [280000 * SGD, 0.20],
        [240000 * SGD, 0.195],
        [200000 * SGD, 0.190],
        [160000 * SGD, 0.180],
        [120000 * SGD, 0.150],
        [80000 * SGD, 0.115],
        [40000 * SGD, 0.070],
        [30000 * SGD, 0.035],
        [20000 * SGD, 0.020]
    ];

    //http://taxsummaries.pwc.com/ID/Thailand-Individual-Taxes-on-personal-income
    var th = [
        [5000000 * THB, 0.35],
        [2000000 * THB, 0.30],
        [1000000 * THB, 0.25],
        [750000 * THB, 0.20],
        [500000 * THB, 0.15],
        [300000 * THB, 0.10],
        [150000 * THB, 0.05]
    ];

    //http://www.taxsummaries.pwc.com/ID/Indonesia-Individual-Taxes-on-personal-income
    var id = [
        [500000000 * IDR, 0.30],
        [250000000 * IDR, 0.25],
        [50000000 * IDR, 0.15],
        [0 * IDR, 0.05],
    ];

    //http://www.taxsummaries.pwc.com/ID/Argentina-Individual-Taxes-on-personal-income
    //Based on the numbers it seems that this is based on some sort of "minimal income" or similar
    var ar = [
        [412064 * ARS, 0.35],
        [309048 * ARS, 0.31],
        [206032 * ARS, 0.27],
        [154524 * ARS, 0.23],
        [103016 * ARS, 0.19],
        [77262 * ARS, 0.15],
        [51508 * ARS, 0.12],
        [25754 * ARS, 0.09],
        [0 * ARS, 0.05],
    ];

    //http://taxsummaries.pwc.com/uk/taxsummaries/wwts.nsf/ID/Slovenia-Individual-Taxes-on-personal-income
    var sl = [
        [70907.20 * EUR, 0.50],
        [48000.00 * EUR, 0.39],
        [20400.00 * EUR, 0.34],
        [8021.34 * EUR, 0.27],
        [0 * EUR, 0.16]
    ];

    //http://taxsummaries.pwc.com/ID/Malaysia-Individual-Taxes-on-personal-income
    var my = [
        [1000000 * MYR, 0.28],
        [600000 * MYR, 0.26],
        [400000 * MYR, 0.25],
        [250000 * MYR, 0.245],
        [100000 * MYR, 0.24],
        [70000 * MYR, 0.21],
        [50000 * MYR, 0.16],
        [35000 * MYR, 0.10],
        [20000 * MYR, 0.05],
        [5000 * MYR, 0.01],
    ];

    var from = Math.max(parseInt(params['f']) || 0, 0);
    var to = parseInt(params['t']) || (from + 100000);
    var step = Math.max((to - from) / 50, 1);

    var labels = [];
    for (var l = from; l <= to; l += step) {
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
            data: [],
            fill: false
        },
        {
            label: "Chile",
            function: function (x) {
                return tax(x, cl);
            },
            data: [],
            fill: false
        },
        {
            label: "Uruguay",
            function: function (x) {
                return tax(x, uy);
            },
            data: [],
            fill: false
        },
        {
            label: "Australia",
            function: function (x) {
                return tax(x, au);
            },
            data: [],
            fill: false
        },
        {
            label: "Canada (Ontario)",
            function: function (x) {
                return tax(x, ca) + tax(x, ca_ontario);
            },
            data: [],
            fill: false
        },
        {
            label: "Switzerland (Zurich, Couple with Kids)",
            function: function (x) {
                return tax(x, ch) + 1.19 * tax(x, ch_zurich);
            },
            data: [],
            fill: false
        },
        {
            label: "Netherlands (including AOW-min)",
            function: function (x) {
                return tax(x, nl);
            },
            data: [],
            fill: false
        },
        {
            label: "Estonia",
            function: function (x) {
                // https://www.emta.ee/eng/private-client/declaration-income/amount-tax-free-income-beginning-1-january-2018
                var exemption;
                var xEUR = x / EUR;
                if (xEUR < 14400) {
                    exemption = 6000;
                } else if (xEUR < 25200) {
                    exemption = 6000 - 6000 / 10800 * (xEUR - 14400);
                } else {
                    exemption = 0;
                }
                return tax(x - exemption * EUR, ee);
            },
            data: [],
            fill: false
        },
        {
            label: "Hong Kong",
            function: function (x) {
                return tax(x, hk);
            },
            data: [],
            fill: false
        },
        {
            label: "Singapore",
            function: function (x) {
                var t = tax(x, sg);
                return t - Math.min(t * 0.2, 500 / SGD);
            },
            data: [],
            fill: false
        },
        {
            label: "Thailand",
            function: function (x) {
                return tax(x, th);
            },
            data: [],
            fill: false
        },
        {
            label: "Indonesia",
            function: function (x) {
                return tax(x, id);
            },
            data: [],
            fill: false
        },
        {
            label: "Argentina",
            function: function (x) {
                return tax(x, ar);
            },
            data: [],
            fill: false
        },
        {
            label: "Slovenia",
            function: function (x) {
                //http://taxsummaries.pwc.com/ID/Slovenia-Individual-Deductions
                var xEUR = x / EUR;
                var allowance;
                if (xEUR < 11166.37) {
                    allowance = 6519.82;
                } else if (xEUR < 12570.89) {
                    allowance = 4418.64;
                } else {
                    allowance = 3302.70;
                }
                return tax(x - allowance * EUR, sl);
            },
            data: [],
            fill: false
        },
        {
            label: "Malaysia",
            function: function (x) {
                return tax(x, my);
            },
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

    Chart.pluginService.register({
        beforeInit: function (chart) {
            var datasets = chart.config.data.datasets;
            var colors = palette('mpn65', datasets.length);
            for (var i = 0; i < datasets.length; i++) {
                datasets[i].borderColor = '#' + colors[i];
            }
        }
    });

    var myBarChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            legend: {
                display: true,
                position: 'bottom'
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        var xLabel = data.labels[tooltipItem.index];
                        if (label) {
                            label += ': ';
                        }
                        label += formatCurrency(tooltipItem.yLabel) + ' (' + (100 * tooltipItem.yLabel / xLabel).toFixed(2) + '%)';
                        return label;
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (label, index, labels) {
                            return formatCurrency(label);
                        }
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (label, index, labels) {
                            return formatCurrency(label);
                        }
                    }
                }]
            }
        }
    });
};
