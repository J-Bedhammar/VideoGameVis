
function infoViz(data){
	
	//Print outs
	console.log("infoViz()");
	//console.log(data);
	
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
