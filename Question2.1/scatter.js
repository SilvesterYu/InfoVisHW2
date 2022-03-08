export let drawPoints = (scatterPlotLayer, data, xScale, yScale, div, scatterPlotWidth, scatterPlotHeight) => {
    console.log('This function plots the points in the scatter plot');
    // -- create scatter plot -- //
    scatterPlotLayer.selectAll('.point')
        .data(data, d => d.station)
        .enter().append('circle')
        .attr('class', 'point')
        .attr('cx', d => xScale(d.tripdurationE))
        .attr('cy', d => yScale(d.tripdurationS))
        .attr('r', '5')
        .style('fill', 'steelblue')
        .style('stroke', 'black')
        .style('stroke-width', '2');

    // -- add interactions -- //
    //Adding interactions.
    scatterPlotLayer.selectAll('.point')
    .on('mouseover', function(event, d) {
        d3.select(this)
        .transition()
        .attr('r', '10')
        .style('fill', 'red');
        
        div.transition().style("color", "darkblue").style("opacity", 1);
        
        let showword = div.html(d.station);
        showword.style("left", (event.pageX) + "px");
        showword.style("top", (event.pageY+25) + "px");
        }) 
        
        .on('mouseout', function(d) {
            div.transition().style("opacity", 0);

            d3.select(this)
            .transition()
            .attr('r', '5')
            .style('fill', 'steelblue');
        });


};