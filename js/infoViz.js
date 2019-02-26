
function infoViz(data){
	
	//Print outs
	console.log("infoViz()");
	//console.log(data);
	

	
	// Annual Sales
	var tempColumn = "Name";
	var tempPublisher = "All";
	
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
