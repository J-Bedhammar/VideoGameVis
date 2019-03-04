
function barChart(data, columnName, annualSetting, show, sortBy){

	//extracts the top 5 values from the data
	var top5 = [];
	var axisText;
	
	if( columnName == "Name"){
		
		if(show == "Top5"){
			for ( i = 0; i<=4; i++){
				top5.push(data[i]);
				top5[i].nr = i;
				top5[i].yValue = data[i].Name;
				if(sortBy == "Sales"){
					top5[i].xValue = data[i].Global_Sales;
					axisText = "Units (M)";
				} else if (sortBy == "Score"){
					if(!isNaN(data[i].Critic_Score))
						top5[i].xValue = data[i].Critic_Score;
					axisText = "Score";
				}
			}
			
			//sorts the top5 data, lowest value to highest value if sortBy is top5
			top5.sort(function(a, b) { return a.xValue - b.xValue; });
		
		}else { //bot5
			counter = 0;
			
			for ( i = (data.length-1); i>=(data.length-5); i--){
				top5.push(data[i]);
				top5[counter].nr = counter;
				top5[counter].yValue = data[i].Name;
				if(sortBy == "Sales")
					top5[counter].xValue = data[i].Global_Sales;
				else{
					if(!isNaN(data[i].Critic_Score))
						top5[counter].xValue = data[i].Critic_Score;
				}
				
				counter++;
				
			}			

			
			//sorts the top5 data, heighest value to lowest value if sortBy is top5
			top5.sort(function(a, b) { return b.xValue - a.xValue; });
		}
		
		//converts the sales to numbers
		top5.forEach(function(d) {
			d.xValue = + d.xValue;
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
		var publisherSales = 0;
		var publisherScore = 0;
		var publisherArray = [];
		
		for( var i = 0; i < sortedData.length; i++){
			
			if(tempPublisher == sortedData[i].Publisher){
				publisherSales += +sortedData[i].Global_Sales;
				publisherScore += +sortedData[i].Critic_Score;
				currGames += 1;
			}else{
				publisherArray.push( { nrOfGames: currGames, publisher: tempPublisher, score: (publisherScore/currGames), sales: publisherSales });
				currGames = 1;
				publisherSales = +sortedData[i].Global_Sales;
				publisherScore = +sortedData[i].Critic_Score;
				tempPublisher = sortedData[i].Publisher;				
			}
			//Last item
			if( i == sortedData.length-1)
				publisherArray.push( { nrOfGames: currGames, publisher: tempPublisher, score: (publisherScore/currGames), sales: publisherSales });		
		}
		
		if( show == "Top5"){
			if( sortBy == "Sales")
				publisherArray.sort(function(a, b) { return b.sales - a.sales; });
			else if( sortBy == "Releases")
				publisherArray.sort(function(a, b) { return b.nrOfGames - a.nrOfGames; });
			else
				publisherArray.sort(function(a, b) { return b.score - a.score; });
		}else {
			if( sortBy == "Sales")
				publisherArray.sort(function(a, b) { return a.sales - b.sales; });
			else if( sortBy == "Releases")
				publisherArray.sort(function(a, b) { return a.nrOfGames - b.nrOfGames; });
			else
				publisherArray.sort(function(a, b) { return a.score - b.score; });
		}
		
		for ( i = 0; i<=4; i++){
			top5.push(publisherArray[i]);
			top5[i].nr = i;
			top5[i].yValue = publisherArray[i].publisher;
			if( sortBy == "Sales"){
				top5[i].xValue = publisherArray[i].sales;
				axisText = "Units (M)";
			}else if(sortBy == "Releases"){
				top5[i].xValue = publisherArray[i].nrOfGames;
				axisText = "Units (K)";
			}else {
				top5[i].xValue = publisherArray[i].score;
				axisText = " Score";
			}		
		}
		
		top5.sort(function(a, b) { return a.xValue - b.xValue; });
		
	} else if( columnName == "Developer"){
		
		sortedData = data;
		sortedData.sort(function(a, b){
			if(a.Developer < b.Developer) { return -1; }
			if(a.Developer > b.Developer) { return 1; }
			return 0;
		});
			
		var tempDeveloper = sortedData[0].Developer;
		var developerScore = 0;
		var developerSales = 0;
		var currGames= 0;
		var developerArray = [];
		
		for( var i = 0; i < sortedData.length; i++){

			if(tempDeveloper == sortedData[i].Developer && sortedData[i].Developer != []) {
				currGames += 1;
				developerSales += +sortedData[i].Global_Sales;
				developerScore += +sortedData[i].Critic_Score;
			}else{
				developerArray.push( { nrOfGames: currGames, developer: tempDeveloper, score: (developerScore/currGames), sales: developerSales } );
				currGames = 1;
				developerSales = +sortedData[i].Global_Sales;
				developerScore = +sortedData[i].Critic_Score;
				tempDeveloper = sortedData[i].Developer;				
			}
			//Last item
			if( i == sortedData.length-1){
				console.log("Push last item")
				developerArray.push( { nrOfGames: currGames, developer: tempDeveloper, score: (developerScore/currGames), sales: developerSales } );		
			}
		}
		
		if( show == "Top5"){
			if( sortBy == "Sales")
				developerArray.sort(function(a, b) { return b.sales - a.sales; });
			else if( sortBy == "Releases")
				developerArray.sort(function(a, b) { return b.nrOfGames - a.nrOfGames; });
			else
				developerArray.sort(function(a, b) { return b.score - a.score; });
		}else {
			if( sortBy == "Sales")
				developerArray.sort(function(a, b) { return a.sales - b.sales; });
			else if( sortBy == "Releases")
				developerArray.sort(function(a, b) { return a.nrOfGames - b.nrOfGames; });
			else
				developerArray.sort(function(a, b) { return a.score - b.score; });
		}
		
		
		for ( i = 0; i<=4; i++){
			top5.push(developerArray[i]);
			top5[i].nr = i;
			top5[i].yValue = developerArray[i].developer;
			if( sortBy == "Sales"){
				top5[i].xValue = developerArray[i].sales;
				axisText = "Units (M)";
			}else if( sortBy == "Releases"){
				top5[i].xValue = developerArray[i].nrOfGames;
				axisText = "Units (K)";
			}else {
				top5[i].xValue = developerArray[i].score;
				axisText = "Score";
			}
		}
		
		top5.sort(function(a, b) { return a.xValue - b.xValue; });
		
		
		
	} else if ( columnName == "Platform"){
		
		sortedData = data;
		sortedData.sort(function(a, b){
			if(a.Platform < b.Platform) { return -1; }
			if(a.Platform > b.Platform) { return 1; }
			return 0;
		});
		
		sortedData.forEach(function(d) {
			d.Global_Sales = + d.Global_Sales;
		});
		
		var tempPlatform = sortedData[0].Platform;
		var currGames = 0;
		var platformScore = 0;
		var platformSales= 0;
		var platformArray = [];
		
		for( var i = 0; i < sortedData.length; i++){

			if(tempPlatform == sortedData[i].Platform){
				platformSales += +sortedData[i].Global_Sales;
				platformScore += +sortedData[i].Critic_Score;
				currGames += 1;
			}else{
				platformArray.push( { nrOfGames: currGames, platform: tempPlatform, score: (platformScore/currGames), sales: platformSales});
				platformSales = +sortedData[i].Global_Sales;
				platformScore = +sortedData[i].Critic_Score;	
				currGames = 1;
				tempPlatform = sortedData[i].Platform;
			}
			//Last item
			if( i == sortedData.length-1)
				platformArray.push( { nrOfGames: currGames, platform: tempPlatform, score: (platformScore/currGames), sales: platformSales});		
		}
		
		if( show == "Top5"){
			if( sortBy == "Sales")
				platformArray.sort(function(a, b) { return b.sales - a.sales; });
			else if( sortBy == "Releases")
				platformArray.sort(function(a, b) { return b.nrOfGames - a.nrOfGames; });
			else
				platformArray.sort(function(a, b) { return b.score - a.score; });
		}else {
			if( sortBy == "Sales")
				platformArray.sort(function(a, b) { return a.sales - b.sales; });
			else if( sortBy == "Releases")
				platfromArray.sort(function(a, b) { return a.nrOfGames - b.nrOfGames; });
			else
				platformArray.sort(function(a, b) { return a.score - b.score; });
		}
		
		for ( i = 0; i<=4; i++){
			top5[i].nr = i;
			top5[i].yValue = platformArray[i].platform;
			if( sortBy == "Sales"){
				top5[i].xValue = platformArray[i].sales;
				axisText = "Units (M)";
			} else if( sortBy == "Releases"){
				top5[i].xValue = platformArray[i].nrOfGames;
				axisText = "Units (k)";
			} else {
				top5[i].xValue = platformArray[i].score;
				axisText = "Score";
			}
		}
		
		//top5.sort(function(a, b) { return a.xValue - b.xValue; });
	
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
			if( d.yValue.length > 23)
				return d.yValue.substring(0,16) + "... (" + d.Platform + ")";
			else
				return d.yValue + " (" +  d.Platform + ")";
		} else{
			if( d.yValue.length > 23)
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
			} else if( columnName == "Platform"){
				tooltip.style("display", "inline-block")
				.style("left", d3.event.pageX + 10 + "px")
				.style("top", d3.event.pageY - 15 + "px")
				.html("<strong>" + d.yValue + " </strong> <br/> Sales: " + parseFloat(Math.round(d.xValue * 100) / 100).toFixed(2) + "M");
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
			// need to recalculate the number, because it is sorted lowest to highest
			if (show == "Top5")
				var num = 4-d.nr;
			else
				var num = d.nr;
			
			var displayData = top5[num];
			var itemName = displayData.yValue;
			
			d3.selectAll('.bar')
				.attr("fill", function(d, i) { return barColor(i)} );
			d3.select(this)
				.attr("fill", "#009900");
			
			updateCharts(displayData, itemName);
			
		});
	
	var xAxis = d3.axisTop(x).ticks(10, "s");
	var yAxis = d3.axisLeft(names);
	
	//creates axes for the bar chart 	
	svg.append("g")
		.call(xAxis)
		.append("text")
		.attr("x", 370)
		.attr("dx", "0.71em")
		.attr("fill", "#000")
		.attr("text-anchor", "end")
		.text(axisText);
		
	svg.append("g")
		.call(yAxis);
		
		
	function updateCharts(displayData, itemName){
		var newAnnualSetting = document.getElementById('bar-chart').className;
		var title = d3.select("#annualSalesTitle")
		
		if( itemName != ""){
			if(newAnnualSetting == "sum")
				title.html("Sales: " + itemName);
			else if(newAnnualSetting == "releases")
				title.html("Releases: " + itemName);
			else if(newAnnualSetting == "score")
				title.html("Average Score: " + itemName);
			else
				title.html("Individual Sales: " + itemName);
		
			d3.select(".item").attr("id", itemName);
		}
		else{
			title.html("Annual Sales: None")
		}
		
		d3.select("#donut > *").remove();
		d3.select(".sunburstName > *").remove();
		d3.select("#annualSales > *").remove();
		
		sunBurst(data, displayData, columnName);
		annualSales(data, columnName, itemName, newAnnualSetting);
		
		
		
	}
}