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


};