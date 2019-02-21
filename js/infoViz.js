
function infoViz(data){

	gameSales = d3.csv.parse(data, function(d){
		return {
		Name: d.Name,
		Platform: d.Platform,
		Year_of_Release: d.Year_of_Release,
		Genre: d.Genre,
		Publisher: d.Publisher,
		NA_Sales: +d.NA_Sales,
		EU_Sales: +d.EU_Sales,
		JP_Sales: +d.JP_Sales,
		Other_Sales: +d.Other_Sales,
		Global_Sales: +d.Global_Sales,
		Critic_Score: +d.Critic_Score,
		Critic_Count: +d.Critic_Count,
		User_Score: +d.User_Score,
		User_Count: +d.User_Count,
		Developer: d.Developer,
		Rating: d.Rating
		};
	);
	
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
