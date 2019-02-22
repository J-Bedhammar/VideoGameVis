d3.queue()
	.defer(d3.csv, 'data/Video_Games_Sales_as_at_22_Dec_2016.csv')
	.await(main)
	
var infoViz;

function main(error, data){
	if(error) throw(error);
	
	console.log("main()");
	
	//Send in dataset
	infoViz = new infoViz(data);

}
