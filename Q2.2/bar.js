export let drawBars = (barChatLayer, data, xScale, yScale, barChartWidth, barChartHeight, div) => {
    console.log("This function draws bars in the bar chart.");
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale).ticks(5);

    // -- draw x and y axis -- //
    barChatLayer.append('g')
    .attr("transform", `translate(0, ${barChartHeight*1.05})`)
    .attr("class", "xAxis")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("transform", function (d) {
        return "rotate(-60)"
    });
    barChatLayer.append('g')
    .attr("transform", `translate(0, ${barChartHeight*0.05})`)
        .call(yAxis)
        .attr("class", "yAxis");

    // -- label y axis -- //
    let yLabel = "Bikers start from";
    barChatLayer.append('text')
        .attr("transform", `translate(${barChartWidth*0.05}, 0)`)
        .text(yLabel)
        .attr('text-anchor', 'middle')
        .attr('class', 'xLabel_scatter')

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
    ;

    // -- add interactions -- //
    barChatLayer.selectAll('.bar')
        .on("mouseover", function(interact) {
            d3.select(this)
            .style('fill', 'red');
        })
        .on("mouseout", function(interact){
            d3.select(this)
            .style("fill", "steelblue");
        });

}