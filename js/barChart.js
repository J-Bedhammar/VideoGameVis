
function barChart(data){
	
	var top5 = [];
	top5.push(data[100]);
	top5.push(data[92]);
	top5.push(data[20]);
	top5.push(data[19]);
	top5.push(data[4]);
	
	top5.forEach(function(d) {
		d.Global_Sales = + d.Global_Sales;
	});
	
	top5.sort(function(a, b) { return a.Global_Sales - b.Global_Sales; });
	
	
	//Bar Chart
	var container = $("#bar-chart");
	var containerWidth = $("#bar-chart").width()*0.7;
	var containerHeight = $("#bar-chart").height()*0.7;
	
	marginTop = 20;
	marginLeft = 150;
	
	var x = d3.scaleLinear().range([0, containerWidth]);
	var y = d3.scaleBand().range([containerHeight, 0]).padding(0.3);
	var names = d3.scaleBand().range([containerHeight, 0]).padding(0.3);
	
	var svg = d3.select("#bar-chart").append("svg")
			.attr("width", containerWidth*1.5)
			.attr("height", containerHeight*1.1)
			.append("g")
			.attr("transform", "translate(" + marginLeft + ',' + marginTop + ")");
		
	
	
	y.domain(top5.map(function(d) { return d.Name;}));
	x.domain([0, d3.max(top5, function(d) { return d.Global_Sales;})]);
	names.domain(top5.map(function(d) { 
		if( d.Name.length > 26)
			return d.Name.substring(0,23) + "...";
		else
			return d.Name;
	}));
	
	
	var tooltip = d3.select("#bar-chart").append("div").attr("class","toolTip");
	
	svg.selectAll(".bar")
		.data(top5)
		.enter().append("rect")
		.attr("class","bar")
		.attr("width", function(d) { return x(d.Global_Sales); })
		.attr("y", function(d) { return y(d.Name); })
		.attr("height", y.bandwidth() )
		.on("mouseover", function(d) { 
			tooltip.style("display", "inline-block")
			.style("left", d3.event.pageX - 50 + "px")
			.style("top", d3.event.pageY - 70 + "px")
			.html("<strong>Global Sales: </strong>" + "<strong>" + (d.Global_Sales));
		})
		.on("mouseout", function(d){ tooltip.style("display", "none");});
	
	
	//creates axes for the bar chart 	
	svg.append("g").call(d3.axisTop(x));
	svg.append("g").call(d3.axisLeft(names)).on("mouseover", function(d) { 
			tooltip.style("display", "inline-block")
			.style("left", d3.event.pageX - 50 + "px")
			.style("top", d3.event.pageY - 70 + "px")
			.html("<strong>HELA NAMNET: </strong>");
		});
	
}