
function sunBurst(data, displayData, columnName){
	
	//extract the relevant data from the dataset
	var gamesData = [];
	var rootName = " "
	
	if (typeof displayData.yValue !== 'undefined')
		rootName = displayData.yValue;
	else {
		if( columnName == "Name"){
			rootName = "Wii Sports";
		}else if( columnName == "Publisher"){
			rootName = "Electronic Arts";
		}else if( columnName == "Developer"){
			rootName = "Ubisoft";
		}else if(columnName == "Platform"){
			rootName = "XOne";
		}
	}	
		
	for (var i = 0; i < data.length; i++){
		var row = data[i];
		if(row[columnName] == rootName)
			gamesData.push(row);
	}
			
	//creates an hierarchy data
	var nodeData = createHierarchy(gamesData, rootName);
	
	//sets the height and width of the chart
	var marginTop = 20;
	var marginBottom = 30;
	
	var width = $("#donut").parent().width();
	var height = (240 - marginTop - marginBottom)/2;
	var radius = Math.min(width, height)/ 2;
	
	//sets the color of the chart
	var color = d3.scaleOrdinal(d3.schemeCategory20);
	
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
		
	//creates the mouseover tooltip
	var tooltip = d3.select("body")
		.append("div")
		.style("display", "none")
		.attr("class","salesInfo");
		
	
	// Name
	d3.select("#donutTitle").html(rootName);

		
	//put all the parts together
	g.selectAll("path")
		.data(root.descendants())
		.enter()
		.append("path")
		.attr("display", function (d) { return d.depth ? null : "none"; })
		.attr("d", arc)
		.style("stroke", "#000000")
		.style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
		.on("mouseover", function(d) { 
			tooltip.style("display", "inline-block")
			.style("left", d3.event.pageX + 10 + "px")
			.style("top", d3.event.pageY - 15 + "px")
			.html( "<strong>" + d.data.name + ": </strong> " + parseFloat(Math.round(d.value * 100) / 100).toFixed(2));
			d3.select(this)
			.attr('opacity', 0.6);
		})
		.on("mouseout", function(d){ 
			tooltip.style("display", "none");
			d3.select(this)
			.attr('opacity', 1.0);
		});
	
	function createHierarchy(gamesData, displayData){
		
		var platformArray = [];
		
		if(columnName == "Name"){
			
			var caseManage = gamesData.length;
			
			platformArray = gamesData;
			
		} else if(columnName == "Publisher"){
			
			
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
			
			for( var i = 0; i < sortedData.length; i++){

				if(tempPlatform == sortedData[i].Platform){
					currNASales += sortedData[i].NA_Sales;
					currJPSales += sortedData[i].EU_Sales;
					currEUSales += sortedData[i].JP_Sales;
					currOSales += sortedData[i].Other_Sales;
				}else{
					platformArray.push( { Platform: sortedData[i].Platform, NA_Sales: currNASales,
						EU_Sales: currEUSales, JP_Sales: currJPSales, Other_Sales: currOSales});
					currNASales = sortedData[i].NA_Sales;
					currJPSales = sortedData[i].EU_Sales;
					currEUSales = sortedData[i].JP_Sales;
					currOSales = sortedData[i].Other_Sales;
					tempPlatform = sortedData[i].Platform;	
				}
				//Last item
				if( i == sortedData.length)
					platformArray.push( { Platform: sortedData[i].Platform, NA_Sales: currNASales,
						EU_Sales: currEUSales, JP_Sales: currJPSales, Other_Sales: currOSales});		
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
			
			for( var i = 0; i < sortedData.length; i++){

				if(tempPlatform == sortedData[i].Platform){
					currNASales += sortedData[i].NA_Sales;
					currJPSales += sortedData[i].EU_Sales;
					currEUSales += sortedData[i].JP_Sales;
					currOSales += sortedData[i].Other_Sales;
				}else{
					platformArray.push( { Platform: sortedData[i].Platform, NA_Sales: currNASales,
						EU_Sales: currEUSales, JP_Sales: currJPSales, Other_Sales: currOSales});
					currNASales = sortedData[i].NA_Sales;
					currJPSales = sortedData[i].EU_Sales;
					currEUSales = sortedData[i].JP_Sales;
					currOSales = sortedData[i].Other_Sales;
					tempPlatform = sortedData[i].Platform;	
				}
				//Last item
				if( i == sortedData.length)
					platformArray.push( { Platform: sortedData[i].Platform, NA_Sales: currNASales,
						EU_Sales: currEUSales, JP_Sales: currJPSales, Other_Sales: currOSales});		
			}
			
			var caseManage = platformArray.length;
			
		} else if(columnName == "Platform"){
			
			sortedData = gamesData;
			
			console.log(sortedData);
			
			var tempPlatform = sortedData[0].Platform;
			var currNASales= 0;
			var currJPSales= 0;
			var currEUSales= 0;
			var currOSales= 0;
			
			for( var i = 0; i < sortedData.length; i++){

				if(tempPlatform == sortedData[i].Platform){
					currNASales += +sortedData[i].NA_Sales;
					currJPSales += +sortedData[i].EU_Sales;
					currEUSales += +sortedData[i].JP_Sales;
					currOSales += +sortedData[i].Other_Sales;
				}else{
					platformArray.push( { Platform: sortedData[i].Platform, NA_Sales: currNASales,
						EU_Sales: currEUSales, JP_Sales: currJPSales, Other_Sales: currOSales});
					currNASales = +sortedData[i].NA_Sales;
					currJPSales = +sortedData[i].EU_Sales;
					currEUSales = +sortedData[i].JP_Sales;
					currOSales = +sortedData[i].Other_Sales;
					tempPlatform = sortedData[i].Platform;	
				}
				//Last item
				if( i == sortedData.length-1)
					platformArray.push( { Platform: sortedData[i].Platform, NA_Sales: currNASales,
						EU_Sales: currEUSales, JP_Sales: currJPSales, Other_Sales: currOSales});		
			}
			
			console.log(platformArray);
			
			var caseManage = platformArray.length;
		} 
		
		
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
	
}