
var annualSales;

function infoViz(data){
	
	//Print outs
	console.log("infoViz()");
	//console.log(data);
	
	var tempColumn = "Publisher";
	var tempPublisher = "Nintendo";
	
	console.log("AnnualSales: " + tempColumn + ", " + tempPublisher);
	
	annualSales = new annualSales(data, tempColumn, tempPublisher);
	
	/*
	//Bar Chart
	
	//TEMP VALUES!
	var x = d3.scale.ordinal().rangeRoundBands([0, 100], .1);	
	var y = d3.scale.linear().range([100, 0]);
	
	//creates axes for the bar chart 
	var xAxisBar = d3.svg.axis().scale(x).orient("bottom");
	var yAxisBar = d3.svg.axis().scale(y).orient("left");
	
	//create tip here
	
	//CHANGE "body"
	var svg = d3.select("body").appen("svg").append("g");
	
	// svg.call(tip);
	
	svg.append("g").attr("class", "x axis").call(xAxisBar);
	svg.append("g").attr("class", "y axis").call(yAxisBar);
	
	svg.selectAll(".bar").data(gameSales).enter().append("rect").attr("class","bar")
		.attr("x", function(d) {return x(d.Name);}).attr("y", function(d) { return y(d.Global_Sales);})
	//.on('mouseover', tip.show).on('mouseout',tip.hide);
		
	
	*/
	
}
