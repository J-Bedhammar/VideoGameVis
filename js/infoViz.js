
function infoViz(data, update){
	
	//Print outs
	//console.log("infoViz()");
	//console.log(data);
	
	var annualSaleSetting = $("#sumAnnualSales").val();
	var columnName = $("#category").val();
	var itemName = "Nintendo";
	
	if(columnName == "Game"){
		columnName = "Name";
		itemName = "Grand Theft Auto V"
	}

	
	if(!update){
		var sumYear = false;
		barChart(data);
		sunBurst(data, data[0]);
		annualSales(data, columnName, itemName, sumYear);
		brushChart(data, columnName, itemName, sumYear);
	}
	else{
		var sumYear = false;
		
		console.log("Update")
		d3.select("#brush > *").remove();
		d3.select("#bar-chart > *").remove();
		d3.select("#donut > *").remove();
		d3.select("#annualSales > *").remove();
		
		
		if(annualSaleSetting == "Annual Sum")
			sumYear = true;
		
		barChart(data);
		sunBurst(data, data[0]);
		annualSales(data, columnName, itemName, sumYear);
		brushChart(data, columnName, itemName, sumYear);
	}

	
	
	// END OF infoViz
	//console.log("DONE!");
}
