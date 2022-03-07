import { Scales } from './scales.js';
import { getDataByMonth } from './data_filter.js';
import { drawPoints } from './scatter.js';
//import { drawBars } from './bar.js'; 

const svg = d3.select('svg');
const WIDTH = svg.attr('width');
const HEIGHT = svg.attr('height'); 
let div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
console.log(WIDTH)
console.log(HEIGHT)
d3.csv("citi_bike_2020.csv").then(function(data){

  // -- Convert attributes into numbers -- //
  data.forEach(d => {
    d.latitude = +d.latitude;
    d.longitude = +d.longitude;
    d.start = +d.start;
    d.tripdurationS = +d.tripdurationS;
    d.end = +d.end;
    d.tripdurationE = +d.tripdurationE;
  });
  // -- log the loaded data -- //
  console.log(data);

  //some framework-codes are given to guide you complete the tasks;
  //in some places, you need to modify them so that they will adapt to your code.
    //Q2.1 Scatter Plot

    // -- setting margins -- //
    const margin = { left: 150, right: 150, top: 150, bottom: 150, gap: 70};
    const width =  WIDTH - margin.left/2 - margin.right/2;
    const height = 3*(HEIGHT-margin.top - margin.bottom - margin.gap)/5

    // -- set x and y scales -- //
    const xScale_spl = Scales.linear(0, d3.max(data, (d)=> d.tripdurationS), 0, width);
    const yScale_spl = Scales.linear(0, d3.max(data, (d)=> d.tripdurationE), height, 0);
  
    // -- x and y axis -- //
    const xAxis = d3.axisBottom(xScale_spl).ticks(13);
    const yAxis = d3.axisLeft(yScale_spl).ticks(5);

    // -- scatterplot with x and y axis -- //
    const scatterPlotLayer = svg.append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top +")");
    scatterPlotLayer.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${height})`);
    scatterPlotLayer.append('g')
        .call(yAxis);
    
    // -- Adding axis labels in proper places -- //
    let xLabel_scatter = 'trip-duration-start-from';
    let yLabel_scatter = 'trip-duration-end-in';
    scatterPlotLayer.append('text')
        .text(xLabel_scatter)
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${width - 90}, ${height - 10})`)
        .attr('class', 'xLabel_scatter')
    scatterPlotLayer.append('text')
        .text(yLabel_scatter)
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${width*0.03}, ${height*0.2}) rotate(-90)`)
        .attr('class', 'xLabel_scatter')

    // -- default showing the data for May -- //
    console.log(getDataByMonth(data, 'May'))
    drawPoints(scatterPlotLayer, getDataByMonth(data, 'May'), xScale_spl, yScale_spl, div, width, height/2);

    /*
    //Q2.2 Bar Chart
    const xScale_bar = Scales.band([], 0, 0);
    const yScale_bar = Scales.linear(0, 0, 0, 0);

    let barChartLayer = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + (height/2 + margin.top + margin.gap) +")");
    
    drawBars(barChartLayer, getDataByMonth(data, "May"), xScale_bar, yScale_bar, width, height/2, div);
    
    //Q2.4 Slider
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let slider = d3.select('#slider');
    let slidertext = d3.select('#slidertext');
    slider.on("input", function(){
      console.log(this.value);
      slidertext.attr('value', month[this.value-1]);
      
    });
*/

  });