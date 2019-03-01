
function infoViz(data, update){
	
	//Print outs
	//console.log("infoViz()");
	//console.log(data);
	
	var annualSaleValue = $("#sumAnnualSales").val();
	var columnName = $("#category").val();
	var itemName = "";
	
	if(columnName == "Game"){
		columnName = "Name";
		itemName = "";
	}


	if(!update){
		var annualSetting = false;

		barChart(data, columnName, annualSetting);
		sunBurst(data, data[0]);
		annualSales(data, columnName, itemName, annualSetting);
		brushChart(data, columnName, itemName, annualSetting);
	}
	else{
		var annualSetting = false;
		
		console.log("Update")
		d3.select("#brush > *").remove();
		d3.select("#bar-chart > *").remove();
		d3.select("#donut > *").remove();
		d3.select("#annualSales > *").remove();
		
		if(annualSaleValue == "Sales Per Year")
			annualSetting = "sum";
		if(annualSaleValue == "Releases Per Year")
			annualSetting = "releases";
	
		barChart(data, columnName, annualSetting);
		sunBurst(data, data[0]);
		annualSales(data, columnName, itemName, annualSetting);
		brushChart(data, columnName, itemName, annualSetting);
	}

	
	
	// END OF infoViz
	//console.log("DONE!");
}
