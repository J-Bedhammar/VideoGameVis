
function annualSales(data, columnName, itemName){
	
	var salesArray = [];
	
	//Extract year and global_sales depending on column and itemName. Ex: Publisher - Nintendo
	for (var i = 0; i < data.length; i++){
		var row = data[i];
		for (var key in row){
			if (row[key] == itemName)
				if(isNaN(row.Year_of_Release) || isNaN(row.Global_Sales))
					console.log("NaN");
				else
					salesArray.push({year: +row.Year_of_Release, sales: +row.Global_Sales});
		}
	}
		
	salesArray.sort(function (a,b) {return d3.ascending(a.year, b.year);});
	//console.log(salesArray)
	
	// Creating margins and figure sizes
    var margin = { top: 20, right: 50, bottom: 30, left: 50 },
        width = $("#annualSales").parent().width() - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

	
	var svg = d3.select("#annualSales").append("svg")
		.attr("id", "salesChart")
        .attr("position", "relative")
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom);

	var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		
	
	// Parse date for printout
	var parseDate = d3.timeParse("%Y"),
		parseDate2 = d3.timeParse("%d-%b-%y"),
		formatTime = d3.timeParse("%e %B");
	
	// Axes and scales
	var xScale = d3.scaleTime().range([0, width]);
    var yScale = d3.scaleLinear().range([height,0]);
	var xTime = d3.scaleTime().range([0, width]);
	
	// Creating the line
	var line = d3.line()
		.x(function(d) { return xScale(d.year)}) //console.log(xScale(d.year));
		.y(function(d) { return yScale(d.sales)})
	
	xScale.domain(d3.extent(salesArray, function(d) { return d.year }));
	yScale.domain(d3.extent(salesArray, function(d) { return d.sales }));
	xTime.domain(d3.extent(salesArray, function(d) { return parseDate(d.year) }));

	
	// Append the axes
	g.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xTime))
		.select(".domain")
		.remove();
		
	g.append("g")
		.call(d3.axisLeft(yScale))
		.append("text")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("text-anchor", "end")
		.text("Price (Mn)");

	// Append a path
	g.append("path")
		.datum(salesArray)
		.attr("fill", "none")
		.attr("stroke", "#990000")
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 2)
		.attr("d", line);
	
	//"Legend"
	var dot_year = g.append("g")
		.append("text")
		.attr("fill", "#000")
		.attr("x", width-100)
		.attr("textAlign", "center")
		.attr("y", 20);

	var dot_sales = g.append("g")
		.append("text")
		.attr("fill", "#000")
		.attr("x", width-100)
		.attr("y", 40);
		
	// Add the "scatterplot"
	svg.selectAll("dot")
		.data(salesArray)
		.enter().append("circle")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.attr("r", 2)
		.attr("cx", function(d) { return xScale(d.year); })
		.attr("cy", function(d) { return yScale(d.sales); })
		.on("mouseover", function(d) {		
            d3.select(this)
				.transition(200)
				.attr("fill", "white")
				.attr("r", 10);
			dot_year.text( "Year: " + d.year);
			dot_sales.text("Sales: " + d.sales + "M");
            })
		.on("mouseout", function(d){
			d3.select(this)
				.transition(200)
				.attr("fill", "black")
				.attr("r", 2);
			dot_year.text("");
			dot_sales.text("");
		})
	
	// END OF ANNUAL SALES
}

