
function infoViz(data, update, updateAnnual){

	
	//Print outs
	//console.log("infoViz()");
	//console.log(data);
	var annualSetting = "individual";
	
	var annualSaleValue = $("#sumAnnualSales").val();
	var show = $('input[type=radio][name=show]:checked').val();
	var sortBy = $('input[type=radio][name=sortBy]:checked').val();
	
	//console.log("Show:" + show + ", sort:" + sortBy);
	
	//console.log(buttonActive);
	var columnName = $("#category").val();
	var itemName = "";

	if(columnName == "Game"){
		columnName = "Name";
		itemName = "";
		document.getElementById("releaseButton").disabled = true;
	}
	else{
		document.getElementById("releaseButton").disabled = false;
	}
	
	if(annualSaleValue == "Sales Per Year")
		annualSetting = "sum";
	if(annualSaleValue == "Releases Per Year")
		annualSetting = "releases";
	if(annualSaleValue == "Average Score Per Year")
		annualSetting = "score";

	
	if(!update){// Load page
		var annualSetting = "individual";
		newItemName = barChart(data, columnName, annualSetting, show, sortBy);
		sunBurst(data, data[0], columnName);
		annualSales(data, columnName, newItemName, annualSetting);
		brushChart(data, columnName, newItemName, annualSetting, show, sortBy);
	}
	else if(updateAnnual){	// Annual Data
		
		var newItemName = document.getElementsByClassName("item")[0].id;
		var targetData = updateData(data);

		//d3.select("#bar-chart").attr("class", annualSetting);
		
		d3.select("#annualSales > *").remove();
		annualSales(targetData, columnName, newItemName, annualSetting);
		
		var title = d3.select("#annualSalesTitle")
		if(annualSetting == "sum")
			title.html("Sales: " + newItemName);
		else if(annualSetting == "releases")
			title.html("Releases: " + newItemName);
		else if(annualSetting == "score")
			title.html("Average Score: " + newItemName);
		else
			title.html("Individual Sales: " + newItemName);
	}
	else{ // Category
		console.log("Update")
		
		d3.select("#brush > *").remove();
		d3.select("#bar-chart > *").remove();
		d3.select("#donut > *").remove();
		d3.select(".sunburstName > *").remove();
		d3.select("#annualSales > *").remove();
	
		barChart(data, columnName, annualSetting, show, sortBy);
		sunBurst(data, data[0],columnName);
		annualSales(data, columnName, itemName, annualSetting);
		brushChart(data, columnName, itemName, annualSetting, show, sortBy);

	}

	// Button inputs
	$('input[type=radio][name=show]').change(function() {
		var show = this.value;
		var sortBy = $('input[type=radio][name=sortBy]:checked').val();
		
		var targetData = updateData(data);
		
		d3.select("#bar-chart > *").remove();
		barChart(targetData, columnName, annualSetting, show, sortBy );
	});

	$('input[type=radio][name=sortBy]').change(function() {
		var sortBy = this.value;
		var show = $('input[type=radio][name=show]:checked').val();
		
		var targetData = updateData(data);
		
		d3.select("#bar-chart > *").remove();
		barChart(targetData, columnName, annualSetting, show, sortBy);
	});
	// END OF infoViz
	//console.log("DONE!");
}


function updateData(data){
	var minYear = document.getElementById('minYear').className;
	var maxYear = document.getElementById('maxYear').className;
	var targetData = [];
		
	for (var i = 0; i < data.length; i++){
		var row = data[i];
		if (row.Year_of_Release >= minYear && row.Year_of_Release <= maxYear ){ // || isNaN(row.Year_of_Release)
			targetData.push(row);
		}
	}
	
	return targetData;
	
}