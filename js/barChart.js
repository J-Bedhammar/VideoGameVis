
function barChart(data, columnName){
	
	
	//extracts the top 5 values from the data
	var top5 = [];
	var axisText;
	
	console.log(columnName);
	
	if( columnName == "Name"){
		for ( i = 0; i<=4; i++){
			if( data[i] != null)
				top5.push(data[i]);
				top5[i].nr = i;
				top5[i].yValue = data[i].Name;
				top5[i].xValue = data[i].Global_Sales;
		}
		
		//sorts the top5 data, highest value to lowest value
		top5.sort(function(a, b) { return a.Global_Sales - b.Global_Sales; });
		
		//converts the sales to numbers
		top5.forEach(function(d) {
			d.Global_Sales = + d.Global_Sales;
		});
		
		axisText = "Units (M)";
		
	} else if( columnName == "Publisher"){
		
		sortedData = data;
		sortedData.sort(function(a, b){
			if(a.Publisher < b.Publisher) { return -1; }
			if(a.Publisher > b.Publisher) { return 1; }
			return 0;
		});
			
		var tempPublisher = sortedData[0].Publisher;
		var currGames= 0;
		var publisherArray = [];
		
		for( var i = 0; i < sortedData.length; i++){

			if(tempPublisher == sortedData[i].Publisher)
				currGames += 1;
			else{
				publisherArray.push( { xValue: currGames, yValue: tempPublisher});
				currGames = 1;
				tempPublisher = sortedData[i].Publisher;				
			}
			//Last item
			if( i == sortedData.length-1)
				publisherArray.push( { xValue: currGames, yValue: tempPublisher});
			
		}
		
		publisherArray.sort(function(a, b) { return b.xValue - a.xValue; });
		
		for ( i = 0; i<=4; i++){
			if( data[i] != null)
				top5.push(publisherArray[i]);
				top5[i].nr = i;
		}
		
		top5.sort(function(a, b) { return a.xValue - b.xValue; });
		
		axisText = "Units (K)";
		
	}
	
	
	
	var marginTop = 20;
	var marginLeft = 150;
	var marginBottom = 30;
	
	var container = $("#bar-chart");
	var containerWidth =  $("#bar-chart").parent().width();
	var containerHeight = 240 - marginTop - marginBottom;
	
	//creates scales in x and y
	var x = d3.scaleLinear()
		.range([0, containerWidth*0.6]);
	var y = d3.scaleBand().range([containerHeight - marginBottom, 0])
		.padding(0.3);
	var names = d3.scaleBand().range([containerHeight - marginBottom, 0])
		.padding(0.3);
	
	//creates the svg element
	var svg = d3.select("#bar-chart")
		.append("svg")
		.attr("width", containerWidth)
		.attr("height", containerHeight)
		.append("g")
		.attr("transform", "translate(" + marginLeft + ',' + marginTop + ")");
	
	//maps the data to the x and y values
	y.domain(top5.map(function(d) { return d.nr; }));
	x.domain([0, d3.max(top5, function(d) { return d.xValue; })]);
	
	//shorten the names of the games
	names.domain(top5.map(function(d) { 
		if(columnName == "Name"){
			if( d.xValue.length > 20)
				return d.yValue.substring(0,15) + "... (" + d.Platform + ")";
			else
				return d.yValue + " (" +  d.Platform + ")";
		} else{
			if( d.xValue.length > 23)
				return d.yValue.substring(0,20) + "...";
			else
				return d.yValue;
		}
	}));
	
	//creates the mouseover tooltip
	var tooltip = d3.select("body")
		.append("div")
		.style("display", "none")
		.attr("class","salesInfo");
		
	var barColor = d3.scaleLinear()
		.range(["#E60000", "#CC0000", "#B30000", "#990000", "#800000"]);
	
	var displayData = " ";
	
	//attaches the x and y to the bars
	svg.selectAll(".bar")
		.data(top5)
		.enter()
		.append("rect")
		.attr("class","bar")
		.attr("width", function(d) { return x(d.xValue); })
		.attr("y", function(d) { return y(d.nr); })
		.attr("height", y.bandwidth() )
		.attr("fill", function(d, i) { return barColor(i)} )
		.on("mouseover", function(d) { 
			if( columnName == "Name"){
				tooltip.style("display", "inline-block")
				.style("left", d3.event.pageX + 10 + "px")
				.style("top", d3.event.pageY - 15 + "px")
				.html("<strong>" + d.yValue + " (" + d.Platform + ") </strong> <br/> Global Sales: " + d.xValue + "M" );
				d3.select(this)
				.attr("opacity", 0.6);
			} else{
				tooltip.style("display", "inline-block")
				.style("left", d3.event.pageX + 10 + "px")
				.style("top", d3.event.pageY - 15 + "px")
				.html("<strong>" + d.yValue +  "</strong> <br/> Game Releases: " + d.xValue );
				d3.select(this)
				.attr("opacity", 0.6);
			}
		})
		.on("mouseout", function(d){ 
			tooltip.style("display", "none");
			d3.select(this)
			.attr("opacity", 1.0);
		})
		.on("click", function(d){
			displayData = data[d.nr];
			d3.select(this)
			.attr("fill", "#ffff00");
			updateCharts(displayData);
		});
	
	var xAxis = d3.axisTop(x);
	var yAxis = d3.axisLeft(names);
	
	//creates axes for the bar chart 	
	svg.append("g")
		.attr("class", "axis")
		.call(xAxis)
		.append("text")
		.attr("x", 370)
		.attr("dx", "0.71em")
		.attr("fill", "#000")
		.attr("text-anchor", "end")
		.text(axisText);
		
	svg.append("g")
		.call(yAxis);
		
	function updateCharts(displayData){
		
		d3.select("#donut > *").remove();
		sunBurst(data, displayData);
		
	}
}