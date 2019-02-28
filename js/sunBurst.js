
function sunBurst(data){
	
	//extract the relevant data from the dataset
	var gamesData = [];
	gamesData.push(data[16]);
	gamesData.push(data[23]);
	gamesData.push(data[42]);
	gamesData.push(data[165]);
	gamesData.push(data[1730]);
	
	
	//creates an hierarchy data
	var nodeData = {
        "name": "GTA V", "children": [{
            "name": "PS3",
            "children": [{"name": "Sales EU", "size": gamesData[0].EU_Sales}, 
				{"name": "Sales NA", "size": gamesData[0].NA_Sales}, 
				{"name": "Sales JP", "size": gamesData[0].JP_Sales},
				{"name": "Sales other", "size": gamesData[0].Other_Sales}]
        }, {
            "name": "XBOX360",
            "children": [{"name": "Sales EU", "size": gamesData[1].EU_Sales}, 
				{"name": "Sales NA", "size": gamesData[1].NA_Sales}, 
				{"name": "Sales JP", "size": gamesData[1].JP_Sales},
				{"name": "Sales other", "size": gamesData[1].Other_Sales}]
        }, {
            "name": "PS4",
            "children": [{"name": "Sales EU", "size": gamesData[2].EU_Sales}, 
				{"name": "Sales NA", "size": gamesData[2].NA_Sales},
				{"name": "Sales JP", "size": gamesData[2].JP_Sales},
				{"name": "Sales other", "size": gamesData[2].Other_Sales}]
        }, {
            "name": "XBOXONE",
            "children": [{"name": "Sales EU", "size": gamesData[3].EU_Sales}, 
				{"name": "Sales NA", "size": gamesData[3].NA_Sales},
				{"name": "Sales JP", "size": gamesData[3].JP_Sales},
				{"name": "Sales other", "size": gamesData[3].Other_Sales}]
        }, {
            "name": "PC",
            "children": [{"name": "Sales EU", "size": gamesData[4].EU_Sales}, 
				{"name": "Sales NA", "size": gamesData[4].NA_Sales},
				{"name": "Sales JP", "size": gamesData[4].JP_Sales},
				{"name": "Sales other", "size": gamesData[4].Other_Sales}]
        }]
    };
	
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
		.innerRadius(function(d) {return d.y0 + 40 ;})
		.outerRadius(function(d) {return d.y1 + 40 ;});
		
	//creates the mouseover tooltip
	var tooltip = d3.select("body")
		.append("div")
		.style("display", "none")
		.attr("class","salesInfo");
		
		
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
			.html(parseFloat(Math.round(d.value * 100) / 100).toFixed(2));
			d3.select(this)
			.attr('opacity', 0.6);
		})
		.on("mouseout", function(d){ 
			tooltip.style("display", "none");
			d3.select(this)
			.attr('opacity', 1.0);
		});
	

	
}