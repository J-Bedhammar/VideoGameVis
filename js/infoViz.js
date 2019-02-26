
function infoViz(data){
	
	//Print outs
	console.log("infoViz()");
	//console.log(data);
	

	
	// Annual Sales
	var tempColumn = "Publisher";
	var tempPublisher = "Nintendo";
	
	annualSales(data, tempColumn, tempPublisher);
	
	// Bar chart
	barChart(data)
	
	// Brush
	brushChart(data);
	
	// END OF infoViz
	console.log("DONE!");
}
