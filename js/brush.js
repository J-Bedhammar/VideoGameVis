
function brushChart(data, columnName, itemName, annualSetting, show, sortBy){
	
	// Margins and Sizes
    var margin = { top: 10, right: 50, bottom: 30, left: 50 },
        width = $("#brush").parent().width() - margin.left - margin.right,
        height = 55 - margin.top - margin.bottom;
	
	
	// Create svg for brush chart
	var svg = d3.select("#brush").append("svg")
		.attr("id", "brushChart")
        .attr("position", "relative")
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom);
	var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	
	// Scales, Axes and Domains
	var xScale = d3.scaleLinear().range([0, width]);
    var navXScale = d3.scaleLinear().range([0,width]);
    var navYScale = d3.scaleLinear().range([1,0]);

	var parseDate = d3.timeParse("%Y");
	var xTime = d3.scaleTime().range([0, width]);
	
	var brush = d3.brushX().extent([[0, 0], [width, height]]).on("brush end", brushed);
	
	var maxYear = d3.max(data, function (d) { if(!isNaN(d.Year_of_Release)) return d.Year_of_Release; });
    var minYear = d3.min(data, function (d) { return d.Year_of_Release });
    
	xScale.domain([minYear, maxYear]);
	navXScale.domain(xScale.domain());
	xTime.domain(d3.extent(data, function(d) { return parseDate(d.Year_of_Release) }));

	
	// Append the axis and brush
	g.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xTime));

	var gBrush = g.append("g")
		.attr("class", "brush")
		.call(brush);
	
	g.append("g")
		.attr("class","brush")
		.call(brush)
		.call(brush.move, xScale.range());
	

	// Brush function filtering data
    function brushed(){
        // Update xScale each time brush is used
        var s = d3.event.selection || navXScale.range();
        xScale.domain(s.map(navXScale.invert, navXScale));
		
		// Extract data from the selected years
		var targetData = [];
		var selectedMin = Math.floor(xScale.domain()[0]);
		var selectedMax = Math.floor(xScale.domain()[1]);
		
		d3.select("#minYear").attr("class", selectedMin);
		d3.select("#maxYear").attr("class", selectedMax);
		
		for (var i = 0; i < data.length; i++){
			var row = data[i];
			if (row.Year_of_Release >= selectedMin && row.Year_of_Release <= selectedMax ){ // || isNaN(row.Year_of_Release)
				targetData.push(row);
			}
		}
		
		// Update charts with the current settings
		var newAnnualSetting = document.getElementById('bar-chart').className;
		var newItem = document.getElementsByClassName('item')[0].id;
		var newColumn = document.getElementsByClassName('column')[0].id;
		
		if(newColumn == "")
			newColumn = "Name";	// Default case
		
		d3.select("#bar-chart > *").remove();
		d3.select("#donut > *").remove();
		d3.select(".sunburstName > *").remove();
		d3.select("#annualSales > *").remove();
	
		show = $('input[type=radio][name=show]:checked').val();
		sortBy = $('input[type=radio][name=sortBy]:checked').val();
		
		var top1 = barChart(targetData, newColumn, newAnnualSetting, show, sortBy);
		sunBurst(targetData, top1, newColumn);
		annualSales(targetData, newColumn, newItem, newAnnualSetting);
    }

	
	// END OF BRUSH
}




