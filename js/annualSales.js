
function annualSales(data, columnName, itemName, annualSetting){
	
	var salesArray = [];
	var nanRemoved = [];
	
	// Extract data with valid Year_of_Release and Global_Sales
	for (var i = 0; i < data.length; i++){
		var row = data[i];

		// All data except NaNs 
		if(isNaN(row.Year_of_Release) || isNaN(row.Global_Sales))
			continue;
		else
			nanRemoved.push({name: row.Name, platform: row.Platform, year: +row.Year_of_Release, sales: +row.Global_Sales, score: +row.Critic_Score});
	
		// Filtered array, ex: Publisher - Nintendo
		if (row[columnName] == itemName){
			if(isNaN(row.Year_of_Release) || isNaN(row.Global_Sales))
				continue;
			else
				salesArray.push({name: row.Name, platform: row.Platform, year: +row.Year_of_Release, sales: +row.Global_Sales, score: +row.Critic_Score});
		}	
	}
	
	// Sort data in ascending order after year
	salesArray.sort(function (a,b) {return d3.ascending(a.year, b.year);});
	nanRemoved.sort(function (a,b) {return d3.ascending(a.year, b.year);});

	// Switch between salesArray and nanRemoved depending on Sum/Individual setting
	var whichArray = nanRemoved;
	
	
	// Show all data, but not NaN years
	if(itemName == "All" || itemName == "")
		salesArray = nanRemoved;
	
	if(columnName == "Publisher")
		whichArray = salesArray;
	
	
	// Change data content based on annual data setting
	if(annualSetting == "sum"){
		salesArray = annualSums(salesArray);
		whichArray = salesArray;
	}
	if(annualSetting == "releases"){
		salesArray = annualReleases(salesArray);
		whichArray = salesArray;
	}
	if(annualSetting == "score"){
		salesArray = annualScores(salesArray);
		whichArray = salesArray;
	}
	if(annualSetting == "individualScores"){
		salesArray = individualScores(salesArray);
		whichArray = salesArray;
	}
	
	
	// If array only contains one item, switch array and scatterplot circle size
	var circleRadius = 2;
	
	if(salesArray.length == 1){
		circleRadius = 3;
		whichArray = nanRemoved;
		
		if(annualSetting == "releases" || annualSetting == "score")
			whichArray = nanRemoved;
	}
	
	
	// Margins and Sizes
    var margin = { top: 20, right: 50, bottom: 30, left: 50 },
        width = $("#annualSales").parent().width() - margin.left - margin.right,
        height = 190 - margin.top - margin.bottom;

		
	// Create svg for line chart (Annual Sales)
	var svg = d3.select("#annualSales").append("svg")
		.attr("id", "salesChart")
        .attr("position", "relative")
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom);
	var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	
	// Parse date for printout
	var parseDate = d3.timeParse("%Y");
	
	
	// Axes, Scales, Line
	var xScale = d3.scaleTime().range([0, width]);
    var yScale = d3.scaleLinear().range([height,0]);
	var xTime = d3.scaleTime().range([0, width]);
	
	var line = d3.line()
		.x(function(d) { return xScale(d.year)}) //console.log(xScale(d.year));
		.y(function(d) { return yScale(d.sales)});
	
	xScale.domain(d3.extent(nanRemoved, function(d) { return d.year }));
	xTime.domain(d3.extent(nanRemoved, function(d) { return parseDate(d.year) }));
	
	var maxReleases = d3.max(salesArray, function (d) { return d.sales});				//yScale.domain(d3.extent(whichArray, function(d) { return d.sales }));
	yScale.domain([0, maxReleases]);
	
	
	// Metacritic Scores
	if(annualSetting == "score" || annualSetting == "individualScores"){
		yScale.domain([0, 100]);
	}

	
	// Append the axes
    g.append("g")
		.attr("class","axis axis--x")
		.attr("transform", "translate(0, " + height + ")")
		.call(d3.axisBottom(xTime));
		
	// Append text depending on setting
	if(annualSetting == "releases"){
		g.append("g")
			.call(d3.axisLeft(yScale))
			.append("text")
			.attr("fill", "#000")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("Units");
	}else if (annualSetting == "score" || annualSetting == "individualScores"){
		g.append("g")
			.call(d3.axisLeft(yScale))
			.append("text")
			.attr("fill", "#000")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("Metacritic");
	}else {
		g.append("g")
			.call(d3.axisLeft(yScale))
			.append("text")
			.attr("fill", "#000")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("Units (Million)");
	}
	
	
	// Append a path
	g.append("path")
		.datum(salesArray)
		.attr("fill", "none")
		.attr("stroke", "#990000")
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 2)
		.attr("d", line);
	
	
	// Sales Information div - tooltip
	var infoDiv = d3.select("body").append("div")	
		.attr("class", "salesInfo")
		.style("display", "none");
	
	
	// Add the scatter plot and mouseover information
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
			infoDiv.html("<strong>" + d.name + " (" + d.platform + ")" + "</strong>" + "</br> Year: " + d.year + "</br>Global Sales: "  + parseFloat(d.sales).toFixed(2) + "M")
				.style("display", "inline-block")
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 40) + "px");
			if (annualSetting == "sum")
				infoDiv.html("<strong>Year: " + d.year + "</strong></br>Global Sales: "  + parseFloat(d.sales).toFixed(2) + "M");
            if (annualSetting == "releases")
				infoDiv.html("<strong>Year: " + d.year + "</strong></br>Releases: "  + d.sales);
			if (annualSetting == "score")
				infoDiv.html("<strong>Year: " + d.year + "</strong></br>Average Score: "  + parseFloat(d.sales).toFixed(2));
			if (annualSetting == "individualScores")
				infoDiv.html("<strong>" + d.name + " (" + d.platform + ")" + "</strong>" + "</br> Year: " + d.year + "</br>Score: "  + parseFloat(d.sales).toFixed(2));
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


// DATA EXTRACTION FUNCTIONS ------------------------------------


// Show annual sum

function annualSums(salesArray){
	var summedSales = [];
	var tempYear = salesArray[0].year;
	var currYearSales = 0;
	
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

	return summedSales;
}


// Show annual releases

function annualReleases(salesArray){
	var releaseArray = [];
	var tempYear = salesArray[0].year;
	var currReleases = 0;
	
	for (var i = 0; i < salesArray.length; i++){
		
		if(tempYear == salesArray[i].year)
			currReleases += 1;
		else{
			releaseArray.push( { sales: currReleases, year: tempYear});
			currReleases = 1;
			tempYear = salesArray[i].year;		
		}
		//Last item
		if( i == salesArray.length-1)
			releaseArray.push( { sales: currReleases, year: salesArray[i].year});
		
	}

	return releaseArray;
}


// Show annual score

function annualScores(salesArray){
	var scoreArray = [];
	var tempYear = salesArray[0].year;
	var currYearScores = 0;
	var currReleases = 0;
	
	for (var i = 0; i < salesArray.length; i++){
		
		if(isNaN(salesArray[i].score) || +(salesArray[i].score) == 0){
			if( i == salesArray.length-1){
				if(currReleases == 0)
					currReleases = 1;
				scoreArray.push( { sales: (currYearScores/currReleases), year: tempYear});
			}
			continue;
		}
		
		if(tempYear == salesArray[i].year){
			currYearScores += salesArray[i].score;
			currReleases += 1;
		}else{
			if(currReleases == 0){
				currYearScores = salesArray[i].score;
				currReleases = 1;
				tempYear = salesArray[i].year;
			}else{
				scoreArray.push( { sales: (currYearScores/currReleases), year: tempYear});
				currYearScores = salesArray[i].score;
				currReleases = 1;
				tempYear = salesArray[i].year;
			}
		}
		
		//Last item
		if( i == salesArray.length-1){
			scoreArray.push( { sales: (currYearScores/currReleases), year: salesArray[i].year});
		}
	}

	return scoreArray;
}


// Show individual score

function individualScores(salesArray){
	var scoreArray = [];
	
	for (var i = 0; i < salesArray.length; i++){
		
		if(isNaN(salesArray[i].score) || +(salesArray[i].score) == 0){
			continue;
		}
		scoreArray.push( { name: salesArray[i].name, platform: salesArray[i].platform, sales: salesArray[i].score, year: salesArray[i].year});
	}
		
	return scoreArray;
}





