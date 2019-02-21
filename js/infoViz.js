
function infoViz(data){


	gameSales = d3.csv.parse(data, function(d){
		return {Name: d.Name,
		Platform: d.Platform,
		Year_of_Release: d.Year_of_Release,
		Genre: d.Genre,
		Publisher: d.Publisher,
		NA_Sales: +d.NA_Sales,
		EU_Sales: +d.EU_Sales,
		JP_Sales: +d.JP_Sales,
		Other_Sales: +d.Other_Sales,
		Global_Sales: +d.Global_Sales,
		Critic_Score: +d.Critic_Score,
		Critic_Count: +d.Critic_Count,
		User_Score: +d.User_Score,
		User_Count: +d.User_Count,
		Developer: d.Developer,
		Rating: d.Rating
		};
	);
	
}
