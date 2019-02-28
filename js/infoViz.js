
function infoViz(data){
	
	//Print outs
	console.log("infoViz()");
	//console.log(data);
	
	
	
	// create options
	var options = d3.select("#category").append("svg");
	var firstRow = data[0];
	
	console.log(firstRow[0]);
	for (var i = 0; i <firstRow.length; i++){
		var row = data[i];
		console.log(row)
		/*
		svg.append("option")
			.append("text")
			.text(row);
		*/
	}

	
	// Annual Sales
	var tempColumn = "Name";
	var tempPublisher = "Grand Theft Auto V";
	
	annualSales(data, tempColumn, tempPublisher);
	
	// Bar chart
	barChart(data);
	
	// Brush
	brushChart(data, tempColumn, tempPublisher);
	
	// Donut
	sunBurst(data);
	
	// END OF infoViz
	console.log("DONE!");
}
