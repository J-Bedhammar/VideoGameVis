queue()
  .defer(d3.csv,'data/Video_Games_Sales_as_at_22_Dec_2016.csv')
  .await(readData);

var infoViz;

function readData(error, data){
  if (error) throw error;

  //Send in dataset
  infoViz = new infoViz(data);

}
