
var annualSales;

function infoViz(data){
	
	//Print outs
	console.log("infoViz()");
	//console.log(data);
	
	var tempColumn = "Publisher";
	var tempPublisher = "Nintendo";
	
	console.log("AnnualSales: " + tempColumn + ", " + tempPublisher);
	
	annualSales = new annualSales(data, tempColumn, tempPublisher);

	barChart(data)
		
	
	// END OF infoViz
	console.log("DONE!");
}
