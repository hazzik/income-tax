var nz = [
	[70000 * 0.7, 0.330],
  [48000 * 0.7, 0.300],
  [14000 * 0.7, 0.170],
  [0, 0.105]
];
//http://www.sii.cl/aprenda_sobre_impuestos/impuestos/imp_directos.htm#o2p3
//Prices in UTA
var cl = [
	[  150 * 904, 0.400],
  [  120 * 904, 0.355],
  [   90 * 904, 0.304],
  [   70 * 904, 0.230],
  [   50 * 904, 0.135],
  [   30 * 904, 0.080],
  [ 13.5 * 904, 0.040]
];
//http://taxsummaries.pwc.com/uk/taxsummaries/wwts.nsf/ID/Uruguay-Individual-Taxes-on-personal-income
var uy = [
	[ 4983180 * 0.03271, 0.36],
  [ 3249900 * 0.03271, 0.31],
  [ 2166600 * 0.03271, 0.27],
  [ 1299960 * 0.03271, 0.25],
  [  649980 * 0.03271, 0.24],
  [  433320 * 0.03271, 0.15],
  [  303324 * 0.03271, 0.10],
]; 

var au = [
	[180000 * 0.75, 0.450],
  [ 87000 * 0.75, 0.370],
  [ 37000 * 0.75, 0.325],
  [ 18200 * 0.75, 0.190]
];

//https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html
var ca = [
	[205842 * 0.78, 0.33],
	[144489 * 0.78, 0.29],
	[ 93208 * 0.78, 0.26],
	[ 46605 * 0.78, 0.205],
	[ 0, 0.15],
];

/*
5.05% on the first $42,960 of taxable income, +
9.15% on the next $42,963, +
11.16% on the next $64,077, +
12.16% on the next $70,000, +
13.16 % on the amount over $220,000
*/
var ca_ontario = [
	[220000 * 0.78, 0.1316],
	[150000 * 0.78, 0.1216],
	[ 85923 * 0.78, 0.1116],
	[ 42960 * 0.78, 0.0915],
	[            0, 0.0505]
];

//http://taxsummaries.pwc.com/uk/taxsummaries/wwts.nsf/ID/Switzerland-Individual-Taxes-on-personal-income
var ch = [
  [	895800, 0.115	],
  [	145000, 0.13	],
  [	143100, 0.12	],
  [	141200, 0.11	],
  [	137300, 0.10	],
  [	131700, 0.09	],
  [	124200, 0.08	],
  [	114700, 0.07	],
  [	103400, 0.06	],
  [	 90300, 0.05	],
  [	 75300, 0.04	],
  [	 58400, 0.03	],
  [	 50900, 0.02	],
  [	 28300, 0.01	],
];

var ch_zurich = [
  [354100, 0.13 ],
  [284800, 0.12 ],
  [224700, 0.11 ],
  [169300, 0.10 ],
  [122900, 0.09 ],
  [ 92100, 0.08 ],
  [ 61300, 0.07 ],
  [ 47400, 0.06 ],
  [ 36700, 0.05 ],
  [ 27300, 0.04 ],
  [ 19600, 0.03 ],
  [ 13500, 0.02 ]
];

function tax(x, brakes) {
	var t = 0;
  var s = x;
	for (var i = 0; i<brakes.length; i++)
  {
  	var br = brakes[i];
    if (s > br[0])
    {
    	t += (s-br[0]) * br[1];
      s = br[0];
    }
  }
  return Math.round(t*100)/100;
}

var labels = [];
for (var l = 0; l < 100000; l+= 2000){
	labels.push(l);
}

var ctx = document.getElementById("myChart");
var data = {
	labels: labels,
    datasets: [{
        label: "New Zealand",
        function: function(x) { 
          return tax(x, nz);
        },
        borderColor: "rgba(75, 192, 192, 1)",
        data: [],
        fill: false
    },
    {
        label: "Chile",
        function: function(x) { 
					return tax(x, cl);
        },
        borderColor: "rgba(153, 102, 255, 1)",
        data: [],
        fill: false
    },
    {
        label: "Uruguay",
        function: function(x) { 
					return tax(x, uy);
        },
        borderColor: "blue",
        data: [],
        fill: false
    },
    {
        label: "Australia",
        function: function(x) { 
					return tax(x, au);
        },
        borderColor: "green",
        data: [],
        fill: false
    },
    {
        label: "Canada (Ontario)",
        function: function(x) { 
					return tax(x, ca) + tax(x, ca_ontario);
        },
        borderColor: "#ECA18D",
        data: [],
        fill: false
    },
    {
        label: "Swiss (Zurich, Couple with Kids)",
        function: function(x) { 
					return tax(x, ch) + 1.19 * tax(x, ch_zurich);
        },
        borderColor: "red",
        data: [],
        fill: false
    }]
};

Chart.pluginService.register({
    beforeInit: function(chart) {
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
                    beginAtZero:true
                }
            }]
        }
    }
});
