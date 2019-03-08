
function sunBurst(data, displayData, columnName){
	
	//extract the relevant data from the dataset
	var gamesData = [];
	var rootName = " "
	
	//if no data exists, a place holder takes place
	if(displayData == "NO DATA"){
		columnName = "Name";
		displayData = data[0].Name;
	}
	
	//Extracts the name of the object shown, which will be used as the root node when creating the hierarchy data
	if (typeof displayData.yValue !== 'undefined')
		rootName = displayData.yValue;
	else {
		if( columnName == "Name"){
			rootName = displayData;
		}else if( columnName == "Publisher"){
			rootName = displayData;
		}else if( columnName == "Developer"){
			rootName = displayData;
		}else if(columnName == "Platform"){
			rootName = displayData;
		}
	}	
	
	//creates a array with data relevant to the rootName
	for (var i = 0; i < data.length; i++){
		var row = data[i];
		if(row[columnName] == rootName)
			gamesData.push(row);
	}
			
	//creates an hierarchy data
	var nodeData = createHierarchy(gamesData, rootName, columnName, rootName);
	
	//sets the height and width of the chart
	var marginTop = 20;
	var marginBottom = 30;
	
	var width = $("#donut").parent().width();
	var height = (240 - marginTop - marginBottom)/2;
	var radius = Math.min(width, height)/ 2;
	
	// decides where to put the graph and creates a svg element
	var g = d3.select("#donut")
		.append("svg")
		.attr("position", "absolute")
		.attr("width", width)
		.attr("height", height*2)
		.append("g")
		.attr("transform", "translate(" + width/2 + "," + height + ")");
		
	//sets the data structure
	var partition  = d3.partition()
		.size([2 * Math.PI, radius]);
		
	//sets the root of the data
	var root = d3.hierarchy(nodeData)
			.sum(function (d) {return d.size; });
		
	partition(root);
	
	//size the arcs
	var arc = d3.arc()
		.startAngle(function(d) { return d.x0; })
		.endAngle(function(d) { return d.x1; })
		.innerRadius(function(d) {return d.y0 + 35 ;})
		.outerRadius(function(d) {return d.y1 + 35 ;});
	
	// Name
	d3.select("#donutTitle").html(rootName);
	
	// Info
	var donutInfoTitle = g.append("g")
		.append("text")
		.attr("text-anchor", "middle")
		.style("font-weight", "bold")
		.style("fill", "#545454");
	var donutInfoNumbers = g.append("g")
		.append("text")
		.attr("text-anchor", "middle")
		.attr("y", 1.2 + "rem");

		
	//put all the parts together
	g.selectAll("path")
		.data(root.descendants())
		.enter()
		.append("path")
		.attr("display", function (d) { return d.depth ? null : "none"; })
		.attr("d", arc)
		.style("stroke", "#000000")
		.style("fill", function(d) { return platformColor((d.children ? d : d.parent).data.name); })
		.on("mouseover", function(d) { 
			d3.select(this)
			.attr('opacity', 0.6);
			donutInfoTitle.text(d.data.name);
			donutInfoNumbers.text(parseFloat(Math.round(d.value * 100) / 100).toFixed(2)+ " M");
		})
		.on("mouseout", function(d){ 
			d3.select(this)
			.attr('opacity', 1.0);
			donutInfoTitle.text("");
			donutInfoNumbers.text("");
		});
}		
	
//creates the hierarchy data to build the sunburst
function createHierarchy(gamesData, displayData, columnName, rootName){
	
	var platformArray = [];
	
	//extracts data depending on columnName
	if(columnName == "Name"){
		
		var caseManage = gamesData.length;
		platformArray = gamesData;
		
	} else if(columnName == "Publisher"){
					
		//sorts data based on Platform
		sortedData = gamesData;
		sortedData.sort(function(a, b){
			if(a.Platform < b.Platform) { return -1; }
			if(a.Platform > b.Platform) { return 1; }
			return 0;
		});
					
		var tempPlatform = sortedData[0].Platform;
		var currNASales= 0;
		var currJPSales= 0;
		var currEUSales= 0;
		var currOSales= 0;
		
		//creates an array with platform and sales information
		for( var i = 0; i < sortedData.length; i++){

			if(tempPlatform == sortedData[i].Platform){
				currNASales += +sortedData[i].NA_Sales;
				currJPSales += +sortedData[i].EU_Sales;
				currEUSales += +sortedData[i].JP_Sales;
				currOSales += +sortedData[i].Other_Sales;
			}else{
				platformArray.push( { Platform: tempPlatform, NA_Sales: currNASales,
					EU_Sales: currEUSales, JP_Sales: currJPSales, Other_Sales: currOSales});
				currNASales = +sortedData[i].NA_Sales;
				currJPSales = +sortedData[i].EU_Sales;
				currEUSales = +sortedData[i].JP_Sales;
				currOSales = +sortedData[i].Other_Sales;
				tempPlatform = sortedData[i].Platform;	
			}
			//Last item
			if( i == sortedData.length - 1){
				platformArray.push( { Platform: tempPlatform, NA_Sales: currNASales,
					EU_Sales: currEUSales, JP_Sales: currJPSales, Other_Sales: currOSales});
			}
		}
		
		var caseManage = platformArray.length;
		
	} else if(columnName == "Developer"){
		
		sortedData = gamesData;
		sortedData.sort(function(a, b){
			if(a.Platform < b.Platform) { return -1; }
			if(a.Platform > b.Platform) { return 1; }
			return 0;
		});
		
		var tempPlatform = sortedData[0].Platform;
		var currNASales= 0;
		var currJPSales= 0;
		var currEUSales= 0;
		var currOSales= 0;
		
		//creates an array with platform and sales information
		for( var i = 0; i < sortedData.length; i++){

			if(tempPlatform == sortedData[i].Platform){
				currNASales += +sortedData[i].NA_Sales;
				currJPSales += +sortedData[i].EU_Sales;
				currEUSales += +sortedData[i].JP_Sales;
				currOSales += +sortedData[i].Other_Sales;
			}else{
				platformArray.push( { Platform: tempPlatform, NA_Sales: currNASales,
					EU_Sales: currEUSales, JP_Sales: currJPSales, Other_Sales: currOSales});
				currNASales = +sortedData[i].NA_Sales;
				currJPSales = +sortedData[i].EU_Sales;
				currEUSales = +sortedData[i].JP_Sales;
				currOSales = +sortedData[i].Other_Sales;
				tempPlatform = sortedData[i].Platform;	
			}
			//Last item
			if( i == sortedData.length - 1)
				platformArray.push( { Platform: tempPlatform, NA_Sales: currNASales,
					EU_Sales: currEUSales, JP_Sales: currJPSales, Other_Sales: currOSales});		
		}
		
		var caseManage = platformArray.length;
		
	} else if(columnName == "Platform"){
		
		sortedData = gamesData;
		
		var tempPlatform = sortedData[0].Platform;
		var currNASales= 0;
		var currJPSales= 0;
		var currEUSales= 0;
		var currOSales= 0;
		
		//creates an array with platform and sales information
		for( var i = 0; i < sortedData.length; i++){

			if(tempPlatform == sortedData[i].Platform){
				currNASales += +sortedData[i].NA_Sales;
				currJPSales += +sortedData[i].EU_Sales;
				currEUSales += +sortedData[i].JP_Sales;
				currOSales += +sortedData[i].Other_Sales;
			}else{
				platformArray.push( { Platform: tempPlatform, NA_Sales: currNASales,
					EU_Sales: currEUSales, JP_Sales: currJPSales, Other_Sales: currOSales});
				currNASales = +sortedData[i].NA_Sales;
				currJPSales = +sortedData[i].EU_Sales;
				currEUSales = +sortedData[i].JP_Sales;
				currOSales = +sortedData[i].Other_Sales;
				tempPlatform = sortedData[i].Platform;	
			}
			//Last item
			if( i == sortedData.length-1)
				platformArray.push( { Platform: tempPlatform, NA_Sales: currNASales,
					EU_Sales: currEUSales, JP_Sales: currJPSales, Other_Sales: currOSales});		
		}
		
		var caseManage = platformArray.length;
	} 
	
	
	//creates the nodes and children for the hierarchy based on sales and platform
	var nodeData = { "name": rootName, "children": []};
	
	for(var i = 0; i < platformArray.length; i++){
		
		var child = { "name": platformArray[i].Platform, "children": [
			{"name": "Sales EU", "size": platformArray[i].EU_Sales}, 
			{"name": "Sales NA", "size": platformArray[i].NA_Sales}, 
			{"name": "Sales JP", "size": platformArray[i].JP_Sales},
			{"name": "Sales other", "size": platformArray[i].Other_Sales}]
		}
		
		nodeData.children.push(child);
	
	}
	
	return nodeData;
}
	


//sets the color in the sunburst chart depending on the platform
function platformColor(platform){
	
	switch(platform) {
	case "2600":			//Atari
		return "#7f2704";
	case "3DO":
		return "#a63603";	
	case "PCFX":		
		return "#d94801";
	case "TG16":
		return "#f16913";
	case "NG":				//Neo Geo
		return "#fd8d3c";
	case "WS":
		return "#fdae6b";

	
	//Nintendo portable consoles - Pink
	case "3DS":
		return "#d7b5d8";
	case "DS":			
		return "#df65b0";
	case "GB":
		return "#dd1c77";
	case "GBA":
		return "#980043";

	//SEGA - Red
	case "GEN":
		return "#a50f15";
	case "GG":			
		return "#de2d26";
	case "DC":
		return "#fb6a4a";
	case "SCD":
		return "#fcae91";
	case "SAT":
		return "#fee5d9";
	
	//Nintendo old home consoles - Purple
	case "GC":
		return "#54278f";
	case "N64":
		return "#756bb1";
	case "NES":
		return "#9e9ac8";
	case "SNES":
		return "#cbc9e2";
	
	//Nintendo newer home consoles - White/Gray
	case "Wii":
		return "#ffffff";
	case "WiiU":
		return "#969696";
		
	//Computer
	case "PC":
		return "#ffff1a";
	
	//Sony Playstation - Blue
	case "PS":
		return "#08306b";
	case "PS2":
		return "#08519c";
	case "PS3":
		return "#2171b5";
	case "PS4":
		return "#4292c6";
	case "PSP":			
		return "#9ecae1";
	case "PSV":
		return "#deebf7";
	
	//Microsoft Xbox - Green
	case "X360":
		return "#006d2c";
	case "XB":			
		return "#31a354";
	default: //XOne
		return "#74c476";

}
	
	
	
}