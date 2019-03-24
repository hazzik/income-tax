

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
    window.UY_BPC = 4154 * UYU;
    //http://www.sii.cl/valores_y_fechas/utm/utm2019.htm
    window.CL_UTA = 580236 * CLP;
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

    //https://www.ato.gov.au/Rates/Individual-income-tax-rates/
    var au = [
        [180000 * AUD, 0.450],
        [90000 * AUD, 0.370],
        [37000 * AUD, 0.325],
        [18200 * AUD, 0.190]
    ];

    //https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html
    var ca = [
        [210371 * CAD, 0.33],
        [147667 * CAD, 0.29],
        [95259 * CAD, 0.26],
        [47630 * CAD, 0.205],
        [0 * CAD, 0.15],
    ];

    var ca_ontario = [
        [220000 * CAD, 0.1316],
        [150000 * CAD, 0.1216],
        [87813 * CAD, 0.1116],
        [43906 * CAD, 0.0915],
        [0 * CAD, 0.0505]
    ];

    //http://taxsummaries.pwc.com/ID/Switzerland-Individual-Taxes-on-personal-income
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

    //http://taxsummaries.pwc.com/ID/Austria-Individual-Taxes-on-personal-income
    var at = [
        [1000000 * EUR, 0.55],
        [90001 * EUR, 0.50],
        [60001 * EUR, 0.48],
        [30001 * EUR, 0.42],
        [18001 * EUR, 0.35],
        [11001 * EUR, 0.25]
    ];

    //https://www.gov.hk/en/residents/taxes/taxfiling/taxrates/salariesrates.htm
    var hk = [
        [200000 * HKD, 0.17],
        [150000 * HKD, 0.14],
        [100000 * HKD, 0.10],
        [50000 * HKD, 0.06],
        [0 * HKD, 0.02]
    ];

    //https://nl.wikipedia.org/wiki/Box_1#Schijventarief_2019
    var nl = [
        [68507 * EUR, 0.5175],
        [34300 * EUR, 0.381],
        [20384 * EUR, 0.1045 + 0.2765],
        [0 * EUR, 0.09 + 0.2765]
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
    //https://www.afip.gob.ar/genericos/guiavirtual/consultas_detalle.aspx?id=21962436
    //Based on the numbers it seems that this is based on some sort of "minimal income" or similar
    var ar = [
        [528636.91 * ARS, 0.35],
        [396477.68 * ARS, 0.31],
        [264318.45 * ARS, 0.27],
        [198238.84 * ARS, 0.23],
        [132159.23 * ARS, 0.19],
        [99119.42 * ARS, 0.15],
        [66079.61 * ARS, 0.12],
        [33039.81 * ARS, 0.09],
        [0 * ARS, 0.05],
    ];

    //http://taxsummaries.pwc.com/ID/Slovenia-Individual-Taxes-on-personal-income
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
        [50000 * MYR, 0.14],
        [35000 * MYR, 0.08],
        [20000 * MYR, 0.03],
        [5000 * MYR, 0.01]
    ];

    //http://taxsummaries.pwc.com/ID/Korea-Individual-Taxes-on-personal-income
    var kr = [
        [500000 * 1000 * KRW, 0.42],
        [300000 * 1000 * KRW, 0.40],
        [150000 * 1000 * KRW, 0.38],
        [88000 * 1000 * KRW, 0.35],
        [46000 * 1000 * KRW, 0.24],
        [12000 * 1000 * KRW, 0.15],
        [0 * 1000 * KRW, 0.06],
    ];

    var pl = [
        [85528 * PLN, 0.32],
        [0 * PLN, 0.18],
    ]

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
            fill: false,
            hidden: true
        },
        {
            label: "Chile",
            function: function (x) {
                return tax(x, cl);
            },
            data: [],
            fill: false,
            hidden: true
        },
        {
            label: "Uruguay",
            function: function (x) {
                return tax(x, uy);
            },
            data: [],
            fill: false,
            hidden: true
        },
        {
            label: "Australia",
            function: function (x) {
                return tax(x, au);
            },
            data: [],
            fill: false,
            hidden: true
        },
        {
            label: "Canada (Ontario)",
            function: function (x) {
                return tax(x, ca) + tax(x, ca_ontario);
            },
            data: [],
            fill: false,
            hidden: true
        },
        {
            label: "Switzerland (Zurich, Couple with Kids)",
            function: function (x) {
                return tax(x, ch) + 1.19 * tax(x, ch_zurich);
            },
            data: [],
            fill: false,
            hidden: true
        },
        {
            label: "Netherlands (including AOW-min)",
            function: function (x) {
                return tax(x, nl);
            },
            data: [],
            fill: false,
            hidden: true
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
            fill: false,
            hidden: true
        },
        {
            label: "Hong Kong",
            function: function (x) {
                return tax(x, hk);
            },
            data: [],
            fill: false,
            hidden: true
        },
        {
            label: "Singapore",
            function: function (x) {
                var t = tax(x, sg);
                return t - Math.min(t * 0.2, 500 / SGD);
            },
            data: [],
            fill: false,
            hidden: true
        },
        {
            label: "Thailand",
            function: function (x) {
                return tax(x, th);
            },
            data: [],
            fill: false,
            hidden: true,
            hidden: true
        },
        {
            label: "Indonesia",
            function: function (x) {
                return tax(x, id);
            },
            data: [],
            fill: false,
            hidden: true
        },
        {
            label: "Argentina",
            function: function (x) {
                return tax(x, ar);
            },
            data: [],
            fill: false,
            hidden: true
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
            fill: false,
            hidden: true
        },
        {
            label: "Malaysia",
            function: function (x) {
                return tax(x, my);
            },
            data: [],
            fill: false,
            hidden: true
        },
        {
            label: "Republic of Korea",
            function: function (x) {
                return tax(x, kr);
            },
            data: [],
            fill: false,
            hidden: true
        },
        {
            label: "Poland",
            function: function (x) {
                //http://taxsummaries.pwc.com/ID/Poland-Individual-Other-tax-credits-and-incentives
                var xPLN = x / PLN;
                var allowance;
                if (xPLN < 8000) {
                    allowance = 1440;
                } else if (xPLN < 13000) {
                    allowance = 1440 - 883.98 * (xPLN - 8000) / 5000;
                } else if (xPLN < 85258) {
                    allowance = 556.02;
                } else if (xPLN < 127000) {
                    allowance = 556.02 - 556.02 * (xPLN - 85528) / 41472;
                } else {
                    allowance = 0;
                }

                return Math.max(tax(x, pl) - allowance, 0);
            },
            data: [],
            fill: false,
            hidden: true
        },
        {
            label: "Austria",
            function: function (x) {
                return tax(x, at);
            },
            data: [],
            fill: false,
            hidden: true
        },
        {
            label: 'Germany',
            function: function (x) {
                //https://de.wikipedia.org/wiki/Einkommensteuer_(Deutschland)#Tarif_2019
                var zvE = x / EUR;
                if (zvE < 9168) {
                    return 0 * EUR;
                }
                if (zvE < 14254) {
                    var y = (zvE - 9168) / 10000;
                    return (980.14 * y + 1400) * y * EUR; 
                }
                if (zvE < 55960) {
                    var z = (zvE - 14254) / 10000;
                    return ((216.16 * z + 2397) * z + 965.58) * EUR;    
                }
                if (zvE < 265326) {
                    return (0.42 * (zvE - 55960) + 14722.30) * EUR;
                }
                return (0.45 * (zvE - 265326) + 102656.02) * EUR;
            },
            data: [],
            fill: false,
            hidden: true
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
