
function infoViz(data, update, updateAnnual){

	
	//Print outs
	//console.log("infoViz()");
	//console.log(data);
	var annualSetting = "individual";
	
	var annualSaleValue = $("#sumAnnualSales").val();
	var show = $('input[type=radio][name=show]:checked').val();
	var sortBy = $('input[type=radio][name=sortBy]:checked').val();


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
	if(annualSaleValue == "Individual Game Scores")
		annualSetting = "individualScores";

	
	if(!update && !updateAnnual){// Load page
		var annualSetting = "individual";
		barChart(data, columnName, annualSetting, show, sortBy);
		sunBurst(data, data[0], columnName);
		annualSales(data, columnName, itemName, annualSetting);
		brushChart(data, columnName, itemName, annualSetting, show, sortBy);
	}
	else if(updateAnnual){	// Annual Data
		
		var newItemName = document.getElementsByClassName("item")[0].id;
		var targetData = updateData(data);

		d3.select("#bar-chart").attr("class", annualSetting);
		
		d3.select("#annualSales > *").remove();
		annualSales(targetData, columnName, newItemName, annualSetting);
		
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
	else{ // Category
		console.log("Update")
		d3.select(".column").attr("id", columnName);
		
		d3.select("#bar-chart > *").remove();
		d3.select("#donut > *").remove();
		d3.select(".sunburstName > *").remove();
		d3.select("#annualSales > *").remove();
		
		var targetData = updateData(data);
		var title = d3.select("#annualSalesTitle");
		d3.select(".item").attr("id", "");
		
		if(annualSetting == "sum")
			title.html("Sales");
		else if(annualSetting == "releases")
			title.html("Releases");
		else if(annualSetting == "score")
			title.html("Average Score");
		else
			title.html("Individual Sales");
		
		
		var top1 = barChart(targetData, columnName, annualSetting, show, sortBy);
		sunBurst(data, top1, columnName);
		annualSales(targetData, columnName, itemName, annualSetting); //All items in new category
	}

	// Button inputs
	$('input[type=radio][name=show]').change(function() {
		var show = this.value;
		var sortBy = $('input[type=radio][name=sortBy]:checked').val();
		
		var targetData = updateData(data);
		
		updateTitles(show, sortBy);
		
		d3.select("#bar-chart > *").remove();
		d3.select("#donut > *").remove();
		d3.select("#bar-chart > *").remove();
		barChart(targetData, columnName, annualSetting, show, sortBy );
		sunBurst(targetData, targetData[0], columnName);
	});

	$('input[type=radio][name=sortBy]').change(function() {
		var sortBy = this.value;
		var show = $('input[type=radio][name=show]:checked').val();
		
		var targetData = updateData(data);
		
		updateTitles(show, sortBy);
		
		d3.select("#bar-chart > *").remove();
		d3.select("#donut > *").remove();
		d3.select(".sunburstName > *").remove();
		top1 = barChart(targetData, columnName, annualSetting, show, sortBy);
		sunBurst(targetData, top1, columnName);
	});
	// END OF infoViz
	//console.log("DONE!");
}

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


function updateTitles(show, sortBy){
	var title = d3.select("#showTitle")
	if(show == "Top5")
		title.html("Top 5: " + sortBy);
	else
		title.html("Bot 5: " + sortBy);
}