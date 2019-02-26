
function brushChart(data){

	
	// Creating margins and figure sizes
    var margin = { top: 20, right: 50, bottom: 30, left: 50 },
        width = $("#brush").parent().width() - margin.left - margin.right,
        height = 100 - margin.top - margin.bottom;
	
	// create svg for annual sales chart
	var svg = d3.select("#brush").append("svg")
		.attr("id", "brushChart")
        .attr("position", "relative")
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom);

	var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	// Scales
	var xScale = d3.scaleLinear().range([0, width]);
    var navXScale = d3.scaleLinear().range([0,width]);
    var navYScale = d3.scaleLinear().range([1,0]);

	var parseDate = d3.timeParse("%Y");
	var xTime = d3.scaleTime().range([0, width]);
	
	var brush = d3.brushX()
		.extent([[0, 0], [width, height]])
		.on("brush end", brushed);
	

	var maxYear = d3.max(data, function (d) { 
			if(!isNaN(d.Year_of_Release)) 
				return d.Year_of_Release; 
		});
    var minYear = d3.min(data, function (d) { return d.Year_of_Release });
    
	xScale.domain([minYear, maxYear]);
	navXScale.domain(xScale.domain());
	
	xTime.domain(d3.extent(data, function(d) { return parseDate(d.Year_of_Release) }));

	
	g.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xTime));

	/*var circle = g.append("g")
		.attr("class", "circle")
	  .selectAll("circle")
	  .data(data)
	  .enter().append("circle")
		.attr("transform", function(d) { return "translate(" + x(d) + "," + y() + ")"; })
		.attr("r", 3.5);
	*/
	var gBrush = g.append("g")
		.attr("class", "brush")
		.call(brush);
	
	g.append("g")
		.attr("class","brush")
		.call(brush)
		.call(brush.move, xScale.range());
	

	//Brush function for filtering through the data.
    function brushed(){
        //Function that updates scatter plot and map each time brush is used
        var s = d3.event.selection || navXScale.range();
        xScale.domain(s.map(navXScale.invert, navXScale));
		
		var targetData = [];
		var selectedMin = Math.floor(xScale.domain()[0]);
		var selectedMax = Math.floor(xScale.domain()[1]);
		
		console.log("pls: " + selectedMax);
		
		//Extract data from the selected years
		for (var i = 0; i < data.length; i++){
			var row = data[i];
			if ((row.Year_of_Release >= selectedMin && row.Year_of_Release <= selectedMax) || isNaN(row.Year_of_Release)){
				targetData.push(row);
			}

		}
		
		console.log(targetData.length);
		
		d3.select("#bar-chart > *").remove();
		d3.select("#annualSales > *").remove();
		
		var tempColumn = "Publisher";
		var tempPublisher = "Nintendo";
	
		annualSales(targetData, tempColumn, tempPublisher);
		barChart(targetData);
		
    }
	
	// END OF BRUSH
}