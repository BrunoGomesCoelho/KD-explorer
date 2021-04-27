import React, {ComponentProps, CSSProperties, useEffect, useState} from 'react';
import {ClassConfig, ClassPrediction} from "../utils/interface";
import * as d3 from "d3";
import "./MatrixView.css"
interface MatrixViewProps {
    width: number,
    height: number,
    predictions: Array<ClassPrediction>,
    vid: string,
    classConfigs: Array<ClassConfig>
}

function MatrixView ({width, height, vid, classConfigs, predictions}: MatrixViewProps){
    const margin = {
        top: 30,
        left: 30,
        bottom: 30,
        right: 30
    }
    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;
    let svgId = "matrix-" + vid;
    let containerId = "matrix-container-" + vid;
    useEffect(()=>{
        let tooltip = d3.select("#" + containerId).select(".tooltip");
        let svg = d3.select("#"+svgId)
            .attr("width", width)
            .attr("height", height)
            .append("g")
        let matrixContainer = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let xScale = d3.scaleBand()
            .domain(classConfigs.map(d => d.name))
            .range([0, innerWidth]);
        let xBandWidth = xScale.bandwidth();
        let yScale = d3.scaleBand()
            .domain(classConfigs.map(d => d.name))
            .range([0, innerHeight]);
        let yBandHeight = yScale.bandwidth();
        matrixContainer.selectAll(".cell")
            .data(predictions)
            .enter().append("g")
            .attr("class", function (d) {
                return "cell" // + d.key.replace(/ /g, "_");
            })
            .attr("transform", function (d, i) {
                return "translate(" + xScale(d.class) + "," + yScale(d.prediction)+ ")";
            })
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", xBandWidth)
            .attr("height", yBandHeight)
            .attr("fill", d=>d3.interpolateBlues(d.probability))
            .on("mouseover", function(e, d) {
                // console.log(d);
                // console.log(e);
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`class: ${d.class}` + "<br/>" + `pred: ${d.prediction}` + "<br/>" + `prob: ${d.probability.toFixed(2)}`  )
                    .style("left", (e.clientX) + "px")
                    .style("top", (e.clientY) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        ;
        // let yAxis = d3.axisLeft();


    }, [])
    return (
        <div id={containerId}>
            <svg id={svgId} width={width} height={height}>

            </svg>
            <div className={"tooltip"}></div>
        </div>
    )
}
export default MatrixView