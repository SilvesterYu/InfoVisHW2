export let drawBars = (barChatLayer, data, xScale, yScale, barChartWidth, barChartHeight, div) => {
    console.log("This function draws bars in the bar chart.");

    // -- Q2.6 make bars sorted are done in main.js -- //
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale).ticks(5);

    // -- draw x and y axis -- //
    barChatLayer.append('g')
    .attr("transform", `translate(0, ${barChartHeight*1.05})`)
    .call(xAxis)
    .attr("class", "xAxis")
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("id", "bar_xAxis")
    .attr("transform", function (d) {
        return "rotate(-60)"
    });
    barChatLayer.append('g')
    .attr("transform", `translate(0, ${barChartHeight*0.05})`)
        .call(yAxis)
        .attr("class", "yAxis")
        .attr("id", "bar_yAxis");

    // -- label y axis -- //
    let yLabel = "Bikers start from";
    barChatLayer.append('text')
        .attr("transform", `translate(${barChartWidth*0.05}, 0)`)
        .text(yLabel)
        .attr('text-anchor', 'middle')

    // -- draw the bars -- //
    barChatLayer.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', "bar")
    .attr("x", d => xScale(`${d.station}`))
    .attr('y', d => yScale(d.start))
    .attr('width', xScale.bandwidth())
    .attr('height', d => barChartHeight - yScale(d.start) )
    .attr("transform", `translate(0, ${barChartHeight*0.05})`)
    // -- color scheme and stroke -- //
    .style('fill', 'steelblue')
    .style('stroke', 'black')
    .style('stroke-width', '2')
    .attr("id", d => d.id);

    // -- move points to front -- //
    d3.selection.prototype.moveToFront = function() {
        return this.each(function(){
          this.parentNode.appendChild(this);
        });
      };

    // -- move to back --//
    d3.selection.prototype.moveToBack = function() {  
        return this.each(function() { 
            var firstChild = this.parentNode.firstChild; 
            if (firstChild) { 
                this.parentNode.insertBefore(this, firstChild); 
            } 
        });
    };

    // -- add interactions -- //
    barChatLayer.selectAll('.bar')
        .on("mouseover", function(interact) {
            d3.select(this)
            .style('fill', 'red');

        // -- linked views with scatter -- //
        let id = d3.select(this).attr('id');
        //console.log(id);
        
        // -- isolate the point -- //
        let iso_id = "isolation_sqr";
        d3.selectAll(`rect[id='${iso_id}']`).moveToFront();
        d3.selectAll(`rect[id='${iso_id}']`).transition().style("opacity", 0.5);
        d3.selectAll(`circle[id='${id}']`).style("fill", "red").moveToFront();
        d3.selectAll(`circle[id='${id}']`).transition()
        .attr('r', '10').style("fill", "red")
        })
        .on("mouseout", function(interact){
            d3.select(this)
            .style("fill", "steelblue");
        
        // -- linked views with scatter -- //
        let id = d3.select(this).attr('id');
        d3.selectAll(`circle[id='${id}']`)
            .transition()
            .attr('r', '5')
            .style('fill', 'steelblue');
            let iso_id = "isolation_sqr";
            d3.selectAll(`rect[id='${iso_id}']`).moveToBack();
            d3.selectAll(`rect[id='${iso_id}']`).transition().style("opacity", 0);
        });

}