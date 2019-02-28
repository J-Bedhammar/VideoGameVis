
function infoViz(data, update){
	
	//Print outs
	console.log("infoViz()");
	//console.log(data);
	
	var columnName = $("#category").val();
	var itemName = "Nintendo";
	
	if(columnName == "Game"){
		columnName = "Name";
		itemName = "Grand Theft Auto V"
	}
	
	console.log(columnName)
	
	
	if(!update){
		barChart(data);
		sunBurst(data);
		annualSales(data, columnName, itemName);
		brushChart(data, columnName, itemName);
	}
	else{
		d3.select("#brush > *").remove();
		d3.select("#bar-chart > *").remove();
		d3.select("#donut > *").remove();
		d3.select("#annualSales > *").remove();
		
		barChart(data);
		sunBurst(data);
		annualSales(data, columnName, itemName);
		brushChart(data, columnName, itemName);
	}

	
	
	// END OF infoViz
	console.log("DONE!");
}
