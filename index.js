// Table 1 chart js
// <canvas id="mychart1" width="400" height="400"></canvas>

// Table 1 tui chart
// <div id="mychart2"></div>

// get the parent div & the table1 DOM elements
var parentDiv = document.getElementById("mw-content-text");
var table1 = document.getElementById("table1");
var table2 = document.getElementById("table2");

// create a dom element for chart (div#mychart1)
var chart1 = document.createElement("canvas"); // for chart js
chart1.setAttribute("id", "mychart1");
chart1.style.marginBottom = "30px";

var chart2 = document.createElement("div"); // for tui chart js
chart2.setAttribute("id", "mychart2");
chart2.style.marginBottom = "30px";

// insert chart1 into parent div#mw-content-text, before table#table1
parentDiv.insertBefore(chart1, table1);
parentDiv.insertBefore(chart2, table1);

let labelsTable1  = [];
let datasetsTable1  = [];

var table1Tbody = document.getElementById("table1").lastElementChild;
var table1FirstRow = Array.from(table1Tbody.firstElementChild.children);
var table1Rows = Array.from(table1Tbody.children); // ok

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';

	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}

	return color;
}

// tui chart example to be changed
var data = {
    categories: ['01/01/2016', '02/01/2016', '03/01/2016', '04/01/2016', '05/01/2016', '06/01/2016', '07/01/2016', '08/01/2016', '09/01/2016', '10/01/2016', '11/01/2016', '12/01/2016'],
    series: [
        {
            name: 'Seoul',
            data: [-3.5, -1.1, 4.0, 11.3, 17.5, 21.5, 24.9, 25.2, 20.4, 13.9, 6.6, -0.6]
        },
        {
            name: 'Seattle',
            data: [3.8, 5.6, 7.0, 9.1, 12.4, 15.3, 17.5, 17.8, 15.0, 10.6, 6.4, 3.7]
        },
        {
            name: 'Sydney',
            data: [22.1, 22.0, 20.9, 18.3, 15.2, 12.8, 11.8, 13.0, 15.2, 17.6, 19.4, 21.2]
        },
        {
            name: 'Moskva',
            data: [-10.3, -9.1, -4.1, 4.4, 12.2, 16.3, 18.5, 16.7, 10.9, 4.2, -2.0, -7.5]
        },
        {
            name: 'Jungfrau',
            data: [-13.2, -13.7, -13.1, -10.3, -6.1, -3.2, 0.0, -0.1, -1.8, -4.5, -9.0, -10.9]
        }
    ]
};

var options = {
    chart: {
        width: 900,
        height: 540,
        title: 'Offences recorded by the police, 2002 - 2012 (in thousands)'
    },
    yAxis: {
	        title: 'Number of crimes (in thousands)',
	        pointOnColumn: true
	    },
    xAxis: {
        title: 'Year',
    },
    series: {
        showDot: false,
        zoomable: true
    }
};

// console.log(data.categories);
data.categories = [];
data.series = []; // {name: "", data: []}

for (var i = 2; i < table1FirstRow.length; i++) {
	// console.log(table1FirstRow[i]);
	labelsTable1.push(parseInt(table1FirstRow[i].innerHTML));
	data.categories.push(parseInt(table1FirstRow[i].innerHTML));
}

for (var i = 1; i < table1Rows.length; i++) {
	// for chart js
	let datasetObject = {};

	datasetObject.label = table1Rows[i].children[1].innerHTML;
	datasetObject.borderColor = getRandomColor();
	datasetObject.fill = false;
	datasetObject.data = [];

	// for tui chart
	let serieObject = {};

	serieObject.name = table1Rows[i].children[1].innerHTML;
	serieObject.data = [];

	let rowChildren = Array.from(table1Rows[i].children);

	for (var j = 2; j < rowChildren.length; j++) {
		datasetObject.data.push(parseInt(rowChildren[j].innerHTML)); // for js chart
		serieObject.data.push(parseInt(rowChildren[j].innerHTML)); // for tui chart
	}

	// console.log(datasetObject.data);
	datasetsTable1.push(datasetObject);
	data.series.push(serieObject);
}

// line chart js example to be changed
var ctx = document.getElementById('mychart1');
var myChart = new Chart(ctx, {
  	type: 'line',
  	data: {
    	// labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
    	labels: labelsTable1,
    	/*datasets: [
    		{ 
		        data: [86,114,106,106,107,111,133,221,783,2478],
		        label: "Africa",
		        borderColor: "#3e95cd",
		        fill: false
	      	},
	      	{ 
		        data: [...],
		        label: "...",
		        borderColor: "...",
		        fill: ...
	      	},
	      	...
	    ]*/
	    datasets: datasetsTable1
  	},
  	options: {
	    title: {
	      	display: true,
	      	text: 'Offences recorded by the police, 2002 - 2012 (in thousands)'
	    }
  	}
});

// ******************************************************************************************

// create tui chart with the data obtained above
tui.chart.lineChart(chart2, data, options);

// remove export area from chart element
document.getElementsByClassName("tui-chart-chartExportMenu-area")[0].remove();


// ******************************************** Table 2 chart js **********************************************

// Table 2 chart js
// <canvas id="mychart3"></canvas>

var chart3 = document.createElement("canvas");
chart3.setAttribute("id", "mychart3");
chart3.style.marginBottom = "30px";

// insert chart3 into parent div#mw-content-text, before table#table2
parentDiv.insertBefore(chart3, table2);

var table2Tbody = table2.lastElementChild;
// var table2Rows = Array.from(table2Tbody.children); // if you use foreach
var table2Rows = table2Tbody.children; // array de tr

let labelsTable2 = [];
let dataset1 = [];
let dataset2 = [];

for (var i = 0; i < table2Rows.length; i++) {
	let firstTd = table2Rows[i].firstElementChild.nextElementSibling;

	labelsTable2.push(firstTd.innerHTML);
	dataset1.push(firstTd.nextElementSibling.innerHTML);
	dataset2.push(firstTd.nextElementSibling.nextElementSibling.innerHTML);
}

// console.log(labelsTable2);
// console.log(dataset1);
// console.log(dataset2);

var elem7 = labelsTable2[7].replace("					  <br>", " ");
labelsTable2[7] = elem7;

// Bar chart js to be changed
var context = document.getElementById("mychart3");
var chart3 = new Chart(context, {
    type: 'bar',
    data: {
      labels: labelsTable2, // pays
      datasets: [      	
        {
          label: "2007-09",
          backgroundColor: "#3e95cd",
          data: dataset1 // array [33, 55, 33, ...]
        },
        {
          label: "2010-12",
          backgroundColor: "#8e5ea2",
          data: dataset2 // array
        }
      ]
    },
    options: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Prison population, average per year, 2007-09 and 2010-12 (per 100,000 inhabitants)'
      }
    }
});

chart3.data.labels = labelsTable2;
chart3.data.datasets[0].data = dataset1;
chart3.data.datasets[1].data = dataset2;
chart3.update();

// ***************************************** Exercise 2 *****************************************
// Retrieve the data via Ajax, and use it to insert a graph that refreshes every second

var divContent = document.getElementById("content");
var divBodyContent = document.getElementById("bodyContent");
var chart4 = document.createElement("canvas");

chart4.setAttribute("id", "mychart4");
chart4.style.marginBottom = "30px";

// insert chart4 into parent div#content, before div#bodyContent
divContent.insertBefore(chart4, divBodyContent);

// Line chart js to be changed
var context = document.getElementById("mychart4");
var xCoordinates = [];
var dataPoints = [];
var chartAjax = new Chart(context, {
    type: 'line',
    data: {
        labels: xCoordinates,
        datasets: [
        	{
		        data: [],
		        label: "Retrieve the data via Ajax, and use it to insert a graph that refreshes every second",
		        borderColor: "#3e95cd",
		        fill: false
      		}
      	]
    }
});

function updateChartData(data) {
	data.forEach((element) => {
		xCoordinates.push(element[0]); 
		dataPoints.push({x: parseInt(element[0]), y: parseInt(element[1])});
	});

	chartAjax.data.labels = xCoordinates;
	chartAjax.data.datasets[0].data = dataPoints;
	chartAjax.update();
}

var updateChart = function() {
	// console.log("dataPoints.length: " + dataPoints.length);

	fetch("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json")
		.then((response) => response.json())
		.then((data) => {
			updateChartData(data);
			setTimeout(function() { updateChart() }, 1000);
		})
		.catch(error => {console.error(error)});
};

fetch(`https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json`)
	.then((rer) => rer.json())
	.then((ddd) => {
		updateChartData(ddd);
		updateChart();
	})
	.catch(error => { console.error(error) });


// ************************************************ STIB API ************************************************

function getVehiclePositionByLine(lineId) {
	var stibUrl = "https://opendata-api.stib-mivb.be/OperationMonitoring/4.0/VehiclePositionByLine/" + lineId;
	var myHeaders = new Headers({
	    'Content-Type': 'application/json',
	    'Authorization': '33e457a3f38bb419684c2b7316269057'
	});

	console.log(lineId); // ok
	console.log(stibUrl); // ok

	return fetch(stibUrl, { method: 'GET', headers: myHeaders })
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		})
		.catch(error => console.error(error));
}

getVehiclePositionByLine(5);