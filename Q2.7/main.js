import { Scales } from './scales.js';
import { getDataByMonth } from './data_filter.js';
import { drawPoints } from './scatter.js';
import { drawBars } from './bar.js'; 


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
    d.longitude = +d.longitude;
    d.latitude = +d.latitude;
    d.start = +d.start;
    d.end = +d.end;
    d.tripdurationS = +d.tripdurationS;
    d.tripdurationE = +d.tripdurationE;
    d.id = d.month + d.station.replaceAll("&", "").replaceAll("-", "").replaceAll(" ", "").replaceAll("/", "");
  });
  // -- log the loaded data -- //
  console.log(data);

  //some framework-codes are given to guide you complete the tasks;
  //in some places, you need to modify them so that they will adapt to your code.
    //Q2.1 Scatter Plot

    // -- setting margins -- //
    const margin = { left: 100, right: 200, top: 50, bottom: 250, gap: 70};

    // -- drawn in the half above in svg -- //
    const width =  WIDTH - margin.left/2 - margin.right/2;
    const height = HEIGHT - margin.top - margin.bottom;

    // -- set x and y scales -- //
    const xScale_spl = Scales.linear(0, d3.max(data, (d)=> d.tripdurationS), 0, width);
    const yScale_spl = Scales.linear(0, d3.max(data, (d)=> d.tripdurationE), height/2 - margin.gap/2, 0);

    const scatterPlotLayer = svg.append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top +")");

    // -- isolation of point -- //
     scatterPlotLayer.append('rect')
    .attr("width", width)
    .attr("height", height/2 - margin.gap/2)
    .attr("x", 0)
    .attr("y", 0)
    .style("fill", "#fce703")
    .style("opacity", 0)
    .attr('class', 'rect')
    .attr("id", "isolation_sqr");

    // -- default showing the data for May -- //
    console.log(getDataByMonth(data, 'May'))
    drawPoints(scatterPlotLayer, getDataByMonth(data, 'May'), xScale_spl, yScale_spl, div, width, height/2 - margin.gap/2);

    
    //Q2.2 Bar Chart

    // -- Q2.6 make bars sorted (May) -- //
    let maySort = getDataByMonth(data, "May").sort(function(x, y){
      return d3.descending(x.start, y.start);
   })

    const xScale_bar = Scales.band(maySort.map(d => `${d.station}`), 0, width);
    const yScale_bar = Scales.linear(0, d3.max(data, d => d.start), (height/2 - margin.gap/2), 0);

  let barChartLayer = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + (height/2 + margin.top + margin.gap/2) + ")");

  drawBars(barChartLayer, getDataByMonth(data, "May"), xScale_bar, yScale_bar, width, (height/2 - margin.gap/2), div);

    //Q2.4 Slider
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let slider = d3.select('#slider');
    let slidertext = d3.select('#slidertext');
    slider.on("input", function(){
      console.log(this.value);
      slidertext.attr('value', month[this.value-1]);
      d3.selectAll('.point').remove();
      d3.selectAll('.bar').remove();
      d3.selectAll('.xAxis').remove();
      d3.selectAll('.yAxis').remove();
      d3.selectAll('.labels').remove();

    // -- Q2.6 Make bars sorted -- //
    let thisMonthSort = getDataByMonth(data, month[this.value-1]).sort(function(x, y){
      return d3.descending(x.start, y.start);
   });
   const xScale_bar = Scales.band(thisMonthSort.map(d => `${d.station}`), 0, width);
   
   drawPoints(scatterPlotLayer, getDataByMonth(data, month[this.value-1]), xScale_spl, yScale_spl, div, width, height/2 - margin.gap/2);
   drawBars(barChartLayer, getDataByMonth(data,  month[this.value-1]), xScale_bar, yScale_bar, width, (height/2 - margin.gap/2), div);
      
    });

  });