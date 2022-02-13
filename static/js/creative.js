// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#visualisation")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("/static/data/Kaggle_TwitterUSAirlineSentiment.csv", function(data) {

  // return a list of sentiments (values in "airline_sentiment" column):
  var sentiments = d3.map(data, function(d){return(d.airline_sentiment)}).keys()
  
  // return a list of the airline names (values in "airline" column):
  var airlines = d3.map(data, function(d){return(d.airline)}).keys()

  // count the sentiments expressed by airline:
  reducedData = (function() {
    var newArray = new Array();
    data.forEach(function(d) {
        airlines.forEach((airline) => {
            
            // add new airline to data if not present:
            new_candidate = {'airline':airline}
            index = newArray.findIndex(object => object.airline === new_candidate.airline)
            if (index === -1) {
                newArray.push(new_candidate)
            }
            
            // if the airline matches the airline in this row:
            if ( d.airline == airline ) {
                sentiments.forEach((sentiment) => {                 
                    if ( d.airline_sentiment == sentiment ) {
                        // check to see if this airline already has this sentiment counter started:
                        objIndex = newArray.findIndex((obj => obj['airline'] == airline));
                        // increment or set to 1
                        newArray[objIndex][sentiment] = newArray[objIndex][sentiment] + 1 || 1
                    }
                })
            }
        })
    })
    return newArray
    })();
    
  console.log("Reduced data: ", reducedData)

  // X axis
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(airlines)
    .padding(0.2);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 50])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Another scale for subgroup position?
  var xSubgroup = d3.scaleBand()
    .domain(sentiments)
    .range([0, x.bandwidth()])
    .padding([0.05])
  
  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(sentiments)
    .range(['#e41a1c','#377eb8','#4daf4a'])



  // Show the bars
  svg.append("g")
    .selectAll("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(reducedData)
    .enter()
    .append("g")
      .attr("transform", function(d) { return "translate(" + x(d.airline) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return sentiments.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });

})
