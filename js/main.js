/*d3.queue()
	.defer(d3.csv, 'data/Video_Games_Sales_as_at_22_Dec_2016.csv')
	.await(main)*/

function main(update, updateAnnual){
	
	d3.csv('data/Video_Games_Sales_as_at_22_Dec_2016.csv', function(error, data) {
		if(error) throw(error);
	
		// Send in dataset
		infoViz(data, update, updateAnnual);
	});
	

	
	// END OF MAIN
}
