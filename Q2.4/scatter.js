export let drawPoints = (scatterPlotLayer, data, xScale, yScale, div, scatterPlotWidth, scatterPlotHeight) => {
    console.log('This function plots the points in the scatter plot');

    // -- x and y axis -- //
    const xAxis = d3.axisBottom(xScale).ticks(13);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    // -- scatterplot with x and y axis -- //
    scatterPlotLayer.append('g').call(xAxis).attr("class","xAxis")
        .attr('transform', `translate(0, ${scatterPlotHeight})`);
    scatterPlotLayer.append('g').call(yAxis).attr("class", "yAxis");
    
    // -- Adding axis labels in proper places -- //
    let xLabel = 'trip-duration-start-from';
    let yLabel = 'trip-duration-end-in';
    scatterPlotLayer.append('text').text(xLabel)
    .attr("class", "labels")
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${scatterPlotWidth*0.88}, ${scatterPlotHeight*0.95})`)
        scatterPlotLayer.append('text').text(yLabel)
        .attr("class", "labels")
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${0.03*scatterPlotWidth}, ${scatterPlotHeight*0.25}) rotate(-90)`)

    // -- create scatter plot -- //
    scatterPlotLayer.selectAll('.point')
        .data(data, d => d.station)
        .enter().append('circle')
        .attr('class', 'point')
        .attr('cx', d => xScale(d.tripdurationS))
        .attr('cy', d => yScale(d.tripdurationE))
        .attr('r', '5')
        .style('fill', 'steelblue')
        .style('stroke', 'black')
        .style('stroke-width', '2')
        .attr("id", d => d.id);

    // -- add interactions -- //
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

        // -- linked view with bar -- //
        let id = d3.select(this).attr('id');
        d3.selectAll(`rect[id='${id}']`)
            .style('fill', 'red');

        }) 
        
        .on('mouseout', function(d) {
            div.transition().style("opacity", 0);

            d3.select(this)
            .transition()
            .attr('r', '5')
            .style('fill', 'steelblue');

            // -- linked view with bar -- //
            let id = d3.select(this).attr('id');
            d3.selectAll(`rect[id='${id}']`).style("fill", "steelblue");

        });


};