
function barChart(data, columnName, annualSetting, show, sortBy){

	
	var top5 = [];
	var axisText;
	
	
	//extracts the top 5 values from the data depending on columnName (settings)
	if( columnName == "Name"){
		
		//sorts the data based on settings (show and sortBy)
		sortedData = data;
		if(sortBy == "Sales")
			if(show == "Top5"){
				sortedData.sort(function(a, b){
					if(+a.Global_Sales < +b.Global_Sales) { return 1; }
					if(+a.Global_Sales > +b.Global_Sales) { return -1; }
					return 0;
				});
			} else {
				sortedData.sort(function(a, b){
					if(+a.Global_Sales < +b.Global_Sales) { return -1; }
					if(+a.Global_Sales > +b.Global_Sales) { return 1; }
					return 0;
				});
			}
		else{
			if(show == "Top5"){
				sortedData.sort(function(a, b){
					if(+a.Critic_Score < +b.Critic_Score) { return 1; }
					if(+a.Critic_Score > +b.Critic_Score) { return -1; }
					return 0;
				});
			} else {
				sortedData.sort(function(a, b){
					if(+a.Critic_Score < +b.Critic_Score) { return -1; }
					if(+a.Critic_Score > +b.Critic_Score) { return 1; }
					return 0;
				});
			}
		}
		
		var counter = 0;
		
		//extracts the top 5 elements into a new array
		for ( i = 0; i< sortedData.length; i++){
			
			//if score is zero, ignore it
			if( sortBy == "Score" && (+sortedData[i].Critic_Score == 0 || isNaN(+sortedData[i].Critic_Score))){
				continue;
			}
		
			top5.push(data[i]);
			top5[counter].nr = counter;
			top5[counter].yValue = data[i].Name;
			if(sortBy == "Sales"){
				top5[counter].xValue = data[i].Global_Sales;
				axisText = "Units (M)";
			} else if (sortBy == "Score"){
				top5[counter].xValue = data[i].Critic_Score;
				axisText = "Metacritic";
			}
			
			//if it has five elements
			if ( counter == 4)
				break;
			
			counter++;
		}
		
		// sorts the data depending on top5 or bot5
		if( show == "Top5")
			top5.sort(function(a, b) { return b.nr - a.nr; });
		else
			top5.sort(function(a, b) { return a.nr - b.nr; });
	
	} else if( columnName == "Publisher"){
		
		//sorts the data based on publisher and settings (show and sortBy)
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
		var scoreCounter = 0;
		var publisherArray = [];
		
		// creates a new array with sorted and relevant data
		for( var i = 0; i < sortedData.length; i++){
			
			if(tempPublisher == sortedData[i].Publisher){
				publisherSales += +sortedData[i].Global_Sales;
				publisherScore += +sortedData[i].Critic_Score;
				currGames += 1;
				
				//check if it has any critic score
				if(+sortedData[i].Critic_Score != 0 && !isNaN(+sortedData[i].Critic_Score))
					scoreCounter += 1;
				
			}else{ 
				//set scoreCounter to 1 if it is 0, because publisher is divided by scoreCounter later.
				if( scoreCounter == 0)
					scoreCounter = 1;
				
				publisherArray.push( { nrOfGames: currGames, publisher: tempPublisher, score: (publisherScore/scoreCounter), sales: publisherSales });
				currGames = 1;
				publisherSales = +sortedData[i].Global_Sales;
				publisherScore = +sortedData[i].Critic_Score;
				
				//check if it has any critic score
				if(+sortedData[i].Critic_Score != 0 && !isNaN(+sortedData[i].Critic_Score))
					scoreCounter = 1;
				else
					scoreCounter = 0;
				
				tempPublisher = sortedData[i].Publisher;				
			}
			
			//Last item
			if( i == sortedData.length-1)
				publisherArray.push( { nrOfGames: currGames, publisher: tempPublisher, score: (publisherScore/scoreCounter), sales: publisherSales });		
		}
		
		//sorts the new array depending on settings (sortBy and show)
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
		
		
		var counter = 0;
		
		//extracts the top 5 elements and store them in a new array.
		for ( i = 0; i< publisherArray.length; i++){
			
			if( sortBy == "Score" && (+publisherArray[i].score == 0 || isNaN(+publisherArray[i].score)))
				continue;
				
			top5.push(publisherArray[i]);
			top5[counter].nr = counter;
			top5[counter].yValue = publisherArray[i].publisher;
			if( sortBy == "Sales"){
				top5[counter].xValue = publisherArray[i].sales;
				axisText = "Units (M)";
			}else if(sortBy == "Releases"){
				top5[counter].xValue = publisherArray[i].nrOfGames;
				axisText = "Units (K)";
			}else {
				top5[counter].xValue = publisherArray[i].score;
				axisText = " Metacritic";
			}		
			
			//if it has five elements
			if ( counter == 4)
				break;
			
			counter++;
		}
		
		// sorts the data depending on top5 or bot5
		if( show == "Top5")
			top5.sort(function(a, b) { return b.nr - a.nr; });
		else
			top5.sort(function(a, b) { return a.nr - b.nr; });
		
	} else if( columnName == "Developer"){
		
		//sorts the data by Developer
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
		var scoreCounter = 0;
		var developerArray = [];
		
		//creates a new array with the sorted and relevant data
		for( var i = 0; i < sortedData.length; i++){

			if(tempDeveloper == sortedData[i].Developer && sortedData[i].Developer != []) {
				currGames += 1;
				developerSales += +sortedData[i].Global_Sales;
				developerScore += +sortedData[i].Critic_Score;
				
				//checks if it has any critic score
				if(+sortedData[i].Critic_Score != 0 && !isNaN(+sortedData[i].Critic_Score))
					scoreCounter += 1;
				
			}else{
				
				// set scoreCounter to 1 if it is 0, because developerScore is divided by it later.
				if( scoreCounter == 0)
					scoreCounter = 1;
				
				developerArray.push( { nrOfGames: currGames, developer: tempDeveloper, score: (developerScore/scoreCounter), sales: developerSales } );
				currGames = 1;
				developerSales = +sortedData[i].Global_Sales;
				developerScore = +sortedData[i].Critic_Score;
				
				//checks if it has any score
				if(+sortedData[i].Critic_Score != 0 && !isNaN(+sortedData[i].Critic_Score))
					scoreCounter = 1;
				else
					scoreCounter = 0;
				
				tempDeveloper = sortedData[i].Developer;				
			}
			
			//Last item
			if( i == sortedData.length-1){
				developerArray.push( { nrOfGames: currGames, developer: tempDeveloper, score: (developerScore/scoreCounter), sales: developerSales } );		
			}
		}
		
		//sorts the data based on settings (sortBy and show)
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
		
		
		var counter = 0;
		//extracts the top 5 elements into a new array
		for ( i = 0; i< developerArray.length; i++){
			
			//checks if the developer slot is empty
			if( developerArray[i].developer == [])
				continue;
			
			//checks if it has any score
			if( sortBy == "Score" && (+developerArray[i].score == 0|| isNaN(+developerArray[i].score)))
				continue;
			
			
			top5.push(developerArray[i]);
			top5[counter].nr = counter;
			top5[counter].yValue = developerArray[i].developer;
			if( sortBy == "Sales"){
				top5[counter].xValue = developerArray[i].sales;
				axisText = "Units (M)";
			}else if( sortBy == "Releases"){
				top5[counter].xValue = developerArray[i].nrOfGames;
				axisText = "Units (K)";
			}else {
				top5[counter].xValue = developerArray[i].score;
				axisText = "Metacritic";
			}
			
			//if it has five elements
			if ( counter == 4)
				break;
			
			counter++;
		}
		
		// sorts the data depending on top5 or bot5
		if( show == "Top5")
			top5.sort(function(a, b) { return b.nr - a.nr; });
		else
			top5.sort(function(a, b) { return a.nr - b.nr; });
		
	} else if ( columnName == "Platform"){
		
		//sorts the data based on platform
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
		var scoreCounter = 0;
		var platformScore = 0;
		var platformSales= 0;
		var platformArray = [];
		
		//creates a new array with the relevant and sorted data
		for( var i = 0; i < sortedData.length; i++){

			if(tempPlatform == sortedData[i].Platform){
				platformSales += +sortedData[i].Global_Sales;
				platformScore += +sortedData[i].Critic_Score;
				currGames += 1;
				
				if(+sortedData[i].Critic_Score != 0 && !isNaN(+sortedData[i].Critic_Score))
					scoreCounter += 1;
				
				
			}else{
				if( scoreCounter == 0)
					scoreCounter = 1;
				
				platformArray.push( { nrOfGames: currGames, platform: tempPlatform, score: (platformScore/scoreCounter), sales: platformSales});
				platformSales = +sortedData[i].Global_Sales;
				platformScore = +sortedData[i].Critic_Score;	
				currGames = 1;
				tempPlatform = sortedData[i].Platform;
				
				if(+sortedData[i].Critic_Score != 0 && !isNaN(+sortedData[i].Critic_Score))
					scoreCounter = 1;
				else
					scoreCounter = 0;
			}
			//Last item
			if( i == sortedData.length-1)
				platformArray.push( { nrOfGames: currGames, platform: tempPlatform, score: (platformScore/scoreCounter), sales: platformSales});		
		}
		
		//sorts the new array based on settings
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
				platformArray.sort(function(a, b) { return a.nrOfGames - b.nrOfGames; });
			else
				platformArray.sort(function(a, b) { return a.score - b.score; });
		}
		
		var counter = 0;
		//extracts the top5 elements into a new array
		for ( i = 0; i< platformArray.length; i++){
			if( sortBy == "Score" && (+platformArray[i].score == 0 || isNaN(+platformArray[i].score)))
				continue;
			
			top5.push(platformArray[i]);
			top5[counter].nr = counter;
			top5[counter].yValue = platformArray[i].platform;
			if( sortBy == "Sales"){
				top5[counter].xValue = platformArray[i].sales;
				axisText = "Units (M)";
			} else if( sortBy == "Releases"){
				top5[counter].xValue = platformArray[i].nrOfGames;
				axisText = "Units (k)";
			} else {
				top5[counter].xValue = platformArray[i].score;
				axisText = "Metacritic";
			}
			
			//if it has five elements
			if ( counter == 4)
				break;
			
			counter ++;
		}
		
		// sorts the data depending on top5 or bot5
		if( show == "Top5")
			top5.sort(function(a, b) { return b.nr - a.nr; });
		else
			top5.sort(function(a, b) { return a.nr - b.nr; });
	
	}
	

	//the highest element in the top 5 array, later used in the sunburst chart
	var top1 = top5[top5.length - 1].yValue; //top5[4].yValue;
	
	var marginTop = 20;
	var marginLeft = 150;
	var marginBottom = 30;
	
	var container = $("#bar-chart");
	var containerWidth =  $("#bar-chart").parent().width();
	var containerHeight = 240 - marginTop - marginBottom;
	
	//creates scales in x and y, also has a variable to display the names in the chart
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
	
	//maps the data to the y axis
	y.domain(top5.map(function(d) { return d.nr; }));
	
	//get the max value for x value
	top5.forEach(function(d) {
            d.xValue = +d.xValue
			});
	var maxX = d3.max(top5, function(d) { return d.xValue; });
	
	//map the data to the x axis
	x.domain([0, maxX]);
	
	//shorten the names of the variables shown.
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
	
	//creates a range of color used on the bars
	var barColor = d3.scaleLinear()
		.range(["#E60000", "#CC0000", "#B30000", "#990000", "#800000"]);
	
	var displayData = " ";
	
	//creates the bars
	svg.selectAll(".bar")
		.data(top5)
		.enter()
		.append("rect")
		.attr("class","bar")
		.attr("width", function(d) { return x(d.xValue); })
		.attr("y", function(d) { return y(d.nr); })
		.attr("height", y.bandwidth() )
		.attr("fill", function(d, i) { return barColor(i)} )
		.on("mouseover", mouseover)
		.on("mouseout", function(d){ 
			tooltip.style("display", "none");
			d3.select(this)
			.attr("opacity", 1.0);
		})
		.on("click", function(d){
			// need to recalculate the number when clicked upon, because they are sorted differently depending on settings
			if( show == "Top5")
				var num = (top5.length - 1)-d.nr;
			else
				var num = d.nr; 
	
			var displayData = top5[num];
			var itemName = displayData.yValue;
			
			d3.selectAll('.bar')
				.attr("fill", function(d, i) { return barColor(i)} );
			d3.select(this)
				.attr("fill", "#009900");
			
			//update the other charts when an element is clicked on
			updateCharts(displayData, itemName);
			
		});
	
	//creates the axes
	var xAxis = d3.axisTop(x).ticks(10);
	var yAxis = d3.axisLeft(names);
	 	
	svg.append("g")
		.call(xAxis)
	.append("text")
		.attr("x", containerWidth*9.5/14)
		.attr("fill", "#000")
		.attr("text-anchor", "end")
		.text(axisText);
	
	svg.append("g")
		.call(yAxis);
		
		
	return top1;
	
	
	
	
	//Called when any bar is clicked om
	function updateCharts(displayData, itemName){
		var newAnnualSetting = document.getElementById('bar-chart').className;
		var title = d3.select("#annualSalesTitle")
		
		//sets the title on the line chart
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
		
		//remove the old elements
		d3.select("#donut > *").remove();
		d3.select(".sunburstName > *").remove();
		d3.select("#annualSales > *").remove();
		
		//creates new charts
		sunBurst(data, displayData, columnName);
		annualSales(data, columnName, itemName, newAnnualSetting);
		
	}


	//called when hover over an element
	function mouseover(d) {
		if( columnName == "Name"){
			if( sortBy == "Sales") {
				tooltip.style("display", "inline-block")
				.style("left", d3.event.pageX + 10 + "px")
				.style("top", d3.event.pageY - 15 + "px")
				.html("<strong>" + d.yValue + " (" + d.Platform + ") </strong> <br/> Global Sales: " + parseFloat(Math.round(d.xValue * 100) / 100).toFixed(2) + "M");
				d3.select(this)
				.attr("opacity", 0.6);
			}else {
				tooltip.style("display", "inline-block")
				.style("left", d3.event.pageX + 10 + "px")
				.style("top", d3.event.pageY - 15 + "px")
				.html("<strong>" + d.yValue + " (" + d.Platform + ") </strong> <br/> Critic Score: " + d.xValue);
				d3.select(this)
				.attr("opacity", 0.6);
			}
		} else{
			if(sortBy == "Sales"){
				tooltip.style("display", "inline-block")
				.style("left", d3.event.pageX + 10 + "px")
				.style("top", d3.event.pageY - 15 + "px")
				.html("<strong>" + d.yValue +  "</strong> <br/> Global Sales: " + parseFloat(Math.round(d.xValue * 100) / 100).toFixed(2) + "M");
				d3.select(this)
				.attr("opacity", 0.6);
			} else if (sortBy == "Releases"){
				tooltip.style("display", "inline-block")
				.style("left", d3.event.pageX + 10 + "px")
				.style("top", d3.event.pageY - 15 + "px")
				.html("<strong>" + d.yValue +  "</strong> <br/> Game releases: " + d.xValue);
				d3.select(this)
				.attr("opacity", 0.6);
			} else{
				tooltip.style("display", "inline-block")
				.style("left", d3.event.pageX + 10 + "px")
				.style("top", d3.event.pageY - 15 + "px")
				.html("<strong>" + d.yValue +  "</strong> <br/> Critic Score: " + parseFloat(Math.round(d.xValue * 100) / 100).toFixed(2));
				d3.select(this)
				.attr("opacity", 0.6);
			}
		}
	}

}
