
function infoViz(data, update, updateAnnual){

	// Default settings and button values
	var annualSetting = "individual";
	var itemName = "";
	var show = $('input[type=radio][name=show]:checked').val();	
	var sortBy = $('input[type=radio][name=sortBy]:checked').val();	
	
	// Category and annual data
	var annualSaleValue = $("#sumAnnualSales").val();
	var columnName = $("#category").val();
	
	if(columnName == "Game"){
		columnName = "Name";
		itemName = "";
		document.getElementById("releaseButton").disabled = true;
	}else{
		document.getElementById("releaseButton").disabled = false;
	}
	
	// Set annualSetting based on current choice
	if(annualSaleValue == "Sales Per Year")
		annualSetting = "sum";
	if(annualSaleValue == "Releases Per Year")
		annualSetting = "releases";
	if(annualSaleValue == "Average Score Per Year")
		annualSetting = "score";
	if(annualSaleValue == "Individual Game Scores")
		annualSetting = "individualScores";

	
	// Create and update the charts
	
	if(!update && !updateAnnual){// --- Load page -------------
	
		var annualSetting = "individual";
		
		// Create the charts
		var top1 = barChart(data, columnName, annualSetting, show, sortBy);
		sunBurst(data, top1, columnName);
		annualSales(data, columnName, itemName, annualSetting);
		brushChart(data, columnName, itemName, annualSetting, show, sortBy);
		
	}
	else if(updateAnnual){	// ----- Annual Data -------------
		
		// Current settings and data
		var newItemName = document.getElementsByClassName("item")[0].id;
		var targetData = updateData(data);
		
		// Save annualSetting
		d3.select("#bar-chart").attr("class", annualSetting);
		
		// Update chart
		d3.select("#annualSales > *").remove();
		annualSales(targetData, columnName, newItemName, annualSetting);
		
		// Change title of AnnualSales
		var title = d3.select("#annualSalesTitle")
		
		if(annualSetting == "sum")
			title.html("Sales: " + newItemName);
		else if(annualSetting == "releases")
			title.html("Releases: " + newItemName);
		else if(annualSetting == "score")
			title.html("Average Score: " + newItemName);
		else if(annualSetting == "individualScores")
			title.html("Individual Score: " + newItemName);
		else
			title.html("Individual Sales: " + newItemName);
		
		
	}
	else{ // ---------- Category ----------------------
		
		// Save columnName
		d3.select(".column").attr("id", columnName);
		
		// Remove old charts
		d3.select("#bar-chart > *").remove();
		d3.select("#donut > *").remove();
		d3.select(".sunburstName > *").remove();
		d3.select("#annualSales > *").remove();
		
		// Update data and titles
		d3.select(".item").attr("id", "");
		var targetData = updateData(data);
		var title = d3.select("#annualSalesTitle");
		
		if(annualSetting == "sum")
			title.html("Sales");
		else if(annualSetting == "releases")
			title.html("Releases");
		else if(annualSetting == "score")
			title.html("Average Score");
		else
			title.html("Individual Sales");
		
		// Update charts
		var top1 = barChart(targetData, columnName, annualSetting, show, sortBy);
		sunBurst(data, top1, columnName);
		annualSales(targetData, columnName, itemName, annualSetting); //All items in new category
		
	}

	
	// Button inputs -------------------------------------------
	
	// Show
	$('input[type=radio][name=show]').change(function() {
		var show = this.value;
		var sortBy = $('input[type=radio][name=sortBy]:checked').val();
		
		var targetData = updateData(data);
		updateTitles(show, sortBy);
		
		// Update charts
		d3.select("#bar-chart > *").remove();
		d3.select("#donut > *").remove();
		d3.select("#bar-chart > *").remove();
		top1 = barChart(targetData, columnName, annualSetting, show, sortBy );
		sunBurst(targetData, top1, columnName);
		
	});

	// Sort By
	$('input[type=radio][name=sortBy]').change(function() {
		var sortBy = this.value;
		var show = $('input[type=radio][name=show]:checked').val();
		
		var targetData = updateData(data);
		updateTitles(show, sortBy);
		
		// Update charts
		d3.select("#bar-chart > *").remove();
		d3.select("#donut > *").remove();
		d3.select(".sunburstName > *").remove();
		var top1 = barChart(targetData, columnName, annualSetting, show, sortBy);
		sunBurst(targetData, top1, columnName);
		
	});
	
	
	// END OF infoViz
}


// OTHER FUNCTIONS -----------------------------


// Update data based on brushchart
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

// Update title of barchart
function updateTitles(show, sortBy){
	var title = d3.select("#showTitle")
	
	if(show == "Top5")
		title.html("Top 5: " + sortBy);
	else
		title.html("Bot 5: " + sortBy);
}




