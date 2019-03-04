
function infoViz(data, update, updateAnnual){
	
	//Print outs
	//console.log("infoViz()");
	//console.log(data);
	var annualSetting = "individual";
	
	var annualSaleValue = $("#sumAnnualSales").val();
	var columnName = $("#category").val();
	var itemName = "";

	if(columnName == "Game"){
		columnName = "Name";
		itemName = "";
	}
	
	if(annualSaleValue == "Sales Per Year")
		annualSetting = "sum";
	if(annualSaleValue == "Releases Per Year")
		annualSetting = "releases";
	
	var show = "top5";
	var sortBy = "Sales";

	
	if(!update){
		var annualSetting = "individual";
		newItemName = barChart(data, columnName, annualSetting, show, sortBy);
		sunBurst(data, data[0], columnName);
		annualSales(data, columnName, newItemName, annualSetting);
		brushChart(data, columnName, newItemName, annualSetting);
	}
	else if(updateAnnual){
		
		var newItemName = document.getElementsByClassName("item")[0].id;
		var minYear = document.getElementById('minYear').className;
		var maxYear = document.getElementById('maxYear').className;
		var targetData = [];
		
		for (var i = 0; i < data.length; i++){
			var row = data[i];
			if (row.Year_of_Release >= minYear && row.Year_of_Release <= maxYear ){ // || isNaN(row.Year_of_Release)
				targetData.push(row);
			}
		}
		
		d3.select("#bar-chart").attr("class", annualSetting);
		
		d3.select("#annualSales > *").remove();
		annualSales(targetData, columnName, newItemName, annualSetting);
		
		var title = d3.select("#annualSalesTitle")
		if(annualSetting == "sum")
			title.html("Sales: " + newItemName);
		else if(annualSetting == "releases")
			title.html("Releases: " + newItemName);
		else
			title.html("Individual Sales: " + newItemName);
	}
	else{
		console.log("Update")
		
		d3.select("#brush > *").remove();
		d3.select("#bar-chart > *").remove();
		d3.select("#donut > *").remove();
		d3.select(".sunburstName > *").remove();
		d3.select("#annualSales > *").remove();
	
		barChart(data, itemName, annualSetting, show, sortBy);
		sunBurst(data, data[0],columnName);
		annualSales(data, columnName, itemName, annualSetting);
		brushChart(data, columnName, itemName, annualSetting);

	}

	
	
	// END OF infoViz
	//console.log("DONE!");
}
