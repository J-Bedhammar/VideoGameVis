
function barChart(data){
	
	
	//extracts the top 5 values from the data
	var top5 = [];
	top5.push(data[100]);
	top5.push(data[92]);
	top5.push(data[20]);
	top5.push(data[19]);
	top5.push(data[4]);
	
	//converts the sales to numbers
	top5.forEach(function(d) {
		d.Global_Sales = + d.Global_Sales;
	});
	
	//sorts the top5 data, highest value to lowest value
	top5.sort(function(a, b) { return a.Global_Sales - b.Global_Sales; });
	
	var container = $("#bar-chart");
	var containerWidth = $("#bar-chart").width()*0.7;
	var containerHeight = $("#bar-chart").height()*0.7;
	
	marginTop = 20;
	marginLeft = 150;
	
	//creates scales in x and y
	var x = d3.scaleLinear().range([0, containerWidth]);
	var y = d3.scaleBand().range([containerHeight, 0]).padding(0.3);
	var names = d3.scaleBand().range([containerHeight, 0]).padding(0.3);
	
	//creates the svg element
	var svg = d3.select("#bar-chart")
			.append("svg")
			.attr("width", containerWidth*1.5)
			.attr("height", containerHeight*1.1)
			.append("g")
			.attr("transform", "translate(" + marginLeft + ',' + marginTop + ")");
		
	
	
	//maps the data to the x and y values
	y.domain(top5.map(function(d) { return d.Name;}));
	x.domain([0, d3.max(top5, function(d) { return d.Global_Sales;})]);
	//shorten the names of the games
	names.domain(top5.map(function(d) { 
		if( d.Name.length > 26)
			return d.Name.substring(0,23) + "...";
		else
			return d.Name;
	}));
	
	//creates the mouseovertooltip
	var tooltip = d3.select("#bar-chart").append("div").attr("class","toolTip");
	
	//attaches the x and y to the bars
	svg.selectAll(".bar")
		.data(top5)
		.enter().append("rect")
		.attr("class","bar")
		.attr("width", function(d) { return x(d.Global_Sales); })
		.attr("y", function(d) { return y(d.Name); })
		.attr("height", y.bandwidth() )
		.attr("fill", "#b30000")
		.on("mouseover", function(d) { 
			tooltip.style("display", "inline-block")
			.style("left", d3.event.pageX - 100 + "px")
			.style("top", d3.event.pageY - 150 + "px")
			.html("<strong>" + d.Name + " </strong> <br/> Global Sales: " + d.Global_Sales );
			d3.select(this)
			.attr('opacity', 0.6);
		})
		.on("mouseout", function(d){ 
			tooltip.style("display", "none");
			d3.select(this)
			.attr('opacity', 1);
		});
	
	
	//creates axes for the bar chart 	
	svg.append("g")
		.call(d3.axisTop(x));	
	svg.append("g")
		.call(d3.axisLeft(names));
	
}