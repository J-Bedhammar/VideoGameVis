
function barChart(data){
	
	
	//extracts the top 5 values from the data
	var top5 = [];
	
	for ( i = 0; i<=4; i++){
		if( data[i] != null)
			top5.push(data[i]);
			top5[i].nr = i;
	}

	
	//converts the sales to numbers
	top5.forEach(function(d) {
		d.Global_Sales = + d.Global_Sales;
	});
	
	//sorts the top5 data, highest value to lowest value
	top5.sort(function(a, b) { return a.Global_Sales - b.Global_Sales; });
	
	marginTop = 20;
	marginLeft = 150;
	
	var container = $("#bar-chart");
	var containerWidth =  $("#bar-chart").parent().width();
	var containerHeight = 250 - marginTop;
	
	
	//creates scales in x and y
	var x = d3.scaleLinear()
		.range([0, containerWidth*0.6]);
	var y = d3.scaleBand().range([containerHeight, 0])
		.padding(0.3);
	var names = d3.scaleBand().range([containerHeight, 0])
		.padding(0.3);
	
	//creates the svg element
	var svg = d3.select("#bar-chart")
		.append("svg")
		.attr("width", containerWidth)
		.attr("height", containerHeight)
		.append("g")
		.attr("transform", "translate(" + marginLeft + ',' + marginTop + ")");
	
	//maps the data to the x and y values
	y.domain(top5.map(function(d) { return d.nr;}));
	x.domain([0, d3.max(top5, function(d) { return d.Global_Sales;})]);
	
	//shorten the names of the games
	names.domain(top5.map(function(d) { 
		if( d.Name.length > 20)
			return d.Name.substring(0,15) + "... (" + d.Platform + ")";
		else
			return d.Name + " (" +  d.Platform + ")";
	}));
	
	//creates the mouseover tooltip
	var tooltip = d3.select("body")
		.append("div")
		.style("display", "none")
		.attr("class","salesInfo");
		
	var barColor = d3.scaleLinear()
		.range(["#E60000", "#CC0000", "#B30000", "#990000", "#800000"]);
	
	//OBS! måste kolla om de har samma namn.
	//attaches the x and y to the bars
	svg.selectAll(".bar")
		.data(top5)
		.enter()
		.append("rect")
		.attr("class","bar")
		.attr("width", function(d) { return x(d.Global_Sales); })
		.attr("y", function(d) { return y(d.nr); })
		.attr("height", y.bandwidth() )
		.attr("fill", function(d, i) { return barColor(i)} )
		.on("mouseover", function(d) { 
			tooltip.style("display", "inline-block")
			.style("left", d3.event.pageX + 10 + "px")
			.style("top", d3.event.pageY - 15 + "px")
			.html("<strong>" + d.Name + " (" + d.Platform + ") </strong> <br/> Global Sales: " + d.Global_Sales );
			d3.select(this)
			.attr('opacity', 0.6);
		})
		.on("mouseout", function(d){ 
			tooltip.style("display", "none");
			d3.select(this)
			.attr('opacity', 1.0);
		});
	
	
	//creates axes for the bar chart 	
	svg.append("g")
		.call(d3.axisTop(x));	
	svg.append("g")
		.call(d3.axisLeft(names));
		

}