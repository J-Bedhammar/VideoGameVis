
function annualSales(data, columnName, itemName, sumSales){
	
	var salesArray = [];
	var nanRemoved = [];
	
	//Extract year and global_sales depending on column and itemName. Ex: Publisher - Nintendo
	for (var i = 0; i < data.length; i++){
		var row = data[i];

		// NaN removed, otherwise all data
		if(isNaN(row.Year_of_Release) || isNaN(row.Global_Sales))
			continue;
		else
			nanRemoved.push({name: row.Name, platform: row.Platform, year: +row.Year_of_Release, sales: +row.Global_Sales});
	
		// Filtered array
		if (row[columnName] == itemName){
			if(isNaN(row.Year_of_Release) || isNaN(row.Global_Sales))
				continue;
			else
				salesArray.push({name: row.Name, platform: row.Platform, year: +row.Year_of_Release, sales: +row.Global_Sales});
		}	
	}
	
	// Switch between salesArray and nanRemoved depending on Sum/Individual setting
	var whichArray = nanRemoved;
	
	// Show all data, but not NaN years
	if(itemName == "All" || itemName == "")
		salesArray = nanRemoved;
	
	// Sort data in ascending order after year
	salesArray.sort(function (a,b) {return d3.ascending(a.year, b.year);});
	
	// Sum the annual sales if summed is true
	if(sumSales){
		salesArray = annualSums(salesArray);
		whichArray = salesArray;
	}
	
	// Scatter plot circle size and array switch
	var circleRadius = 2;
	
	if(salesArray.length == 1){
		circleRadius = 3;
		whichArray = nanRemoved;
	}
	
	// Creating margins and figure sizes
    var margin = { top: 20, right: 50, bottom: 30, left: 50 },
        width = $("#annualSales").parent().width() - margin.left - margin.right,
        height = 190 - margin.top - margin.bottom;

	// create svg for annual sales chart
	var svg = d3.select("#annualSales").append("svg")
		.attr("id", "salesChart")
        .attr("position", "relative")
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom);

	var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
	// Parse date for printout
	var parseDate = d3.timeParse("%Y");
	
	// Axes and scales
	var xScale = d3.scaleTime().range([0, width]);
    var yScale = d3.scaleLinear().range([height,0]);
	var xTime = d3.scaleTime().range([0, width]);
	
	// Creating the line
	var line = d3.line()
		.x(function(d) { return xScale(d.year)}) //console.log(xScale(d.year));
		.y(function(d) { return yScale(d.sales)});
	
	xScale.domain(d3.extent(nanRemoved, function(d) { return d.year }));
	yScale.domain(d3.extent(whichArray, function(d) { return d.sales }));
	xTime.domain(d3.extent(nanRemoved, function(d) { return parseDate(d.year) }));
	
	/*this.changeXScale = function (newScale) {
		xScale = newScale;
	}*/

	
	// Append the axes
    g.append("g")
		.attr("class","axis axis--x")
		.attr("transform", "translate(0, " + height + ")")
		.call(d3.axisBottom(xTime));
		
	g.append("g")
		.call(d3.axisLeft(yScale))
		.append("text")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("text-anchor", "end")
		.text("Units (Million)");

	// Append a path
	g.append("path")
		.datum(salesArray)
		.attr("fill", "none")
		.attr("stroke", "#990000")
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 2)
		.attr("d", line);
	
	
	// Sales Information div
	var infoDiv = d3.select("body").append("div")	
    .attr("class", "salesInfo")
	.style("display", "none");
	
	
	// Add the circles and mouseover information
	svg.selectAll("dot")
		.data(salesArray)
		.enter().append("circle")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.attr("r", circleRadius)
		.attr("cx", function(d) { return xScale(d.year); })
		.attr("cy", function(d) { return yScale(d.sales); })
		.on("mouseover", function(d) {		
            d3.select(this)
				.transition(200)
				.attr("fill", "red")
				.attr("r", 10);
			/*dot_year.text( "Year: " + d.year);
			dot_sales.text("Sales: " + d.sales + "M");*/	
			infoDiv.html("<strong>" + d.name + " (" + d.platform + ")" + "</strong>" + "</br> Year: " + d.year + "</br>Global Sales: "  + parseFloat(d.sales).toFixed(2) + "M")
				.style("display", "inline-block")
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 40) + "px");
			if (sumSales)
				infoDiv.html("Year: " + d.year + "</br>Global Sales: "  + parseFloat(d.sales).toFixed(2) + "M");
            })
		.on("mouseout", function(d){
			d3.select(this)
				.transition(200)
				.attr("fill", "black")
				.attr("r", circleRadius);
			/*dot_year.text("");
			dot_sales.text("");*/
			infoDiv.style("display", "none");
		})
	
	
	// END OF ANNUAL SALES
}


function annualSums(salesArray){
		var summedSales = [];
		var tempYear = salesArray[0].year;
		var currYearSales = 0;
		
		//console.log(salesArray)
		
		for (var i = 0; i < salesArray.length; i++){
			
			if(tempYear == salesArray[i].year)
				currYearSales += salesArray[i].sales;
			else{
				summedSales.push( { sales: currYearSales, year: tempYear});
				currYearSales = salesArray[i].sales;
				tempYear = salesArray[i].year;				
			}
			//Last item
			if( i == salesArray.length-1)
				summedSales.push( { sales: currYearSales, year: salesArray[i].year});
			
		}
		
		//console.log(summedSales);
		return summedSales;
	}



