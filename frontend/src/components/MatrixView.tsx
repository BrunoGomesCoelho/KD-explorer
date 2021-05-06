import React, {ComponentProps, CSSProperties, useEffect, useState} from 'react';
import {ClassConfig, ClassPrediction, SuperClassConfig} from "../utils/interface";
import * as d3 from "d3";
import "./MatrixView.css"
import {Card} from "@material-ui/core";
import {searchClassConfigByName, searchSuperConfigByClassName} from "../utils/data";
interface MatrixViewProps {
    width: number,
    height: number,
    predictions: Array<ClassPrediction>,
    vid: string,
    classConfigs: Array<ClassConfig>,
    superClassConfigs: Array<SuperClassConfig>
    name: string,
    highlightSuper?: SuperClassConfig,
    setHighlightSuper: (config: SuperClassConfig) => void
}

function MatrixView ({width, height, vid, classConfigs, predictions, name, superClassConfigs, highlightSuper, setHighlightSuper}: MatrixViewProps){
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
    let colorMap = (prediction: ClassPrediction) =>{

        let baseColor = d3.interpolateBlues(prediction.probability)
        if (highlightSuper && (highlightSuper.classes.includes(prediction.prediction) || highlightSuper.classes.includes(prediction.class) )){
            return baseColor
        }
        let baseD3Color = d3.hsl(baseColor);
        baseD3Color.s = baseD3Color.s * 0.3
        baseD3Color.l = baseD3Color.l * 1.2;
        let color = baseD3Color.formatRgb();
        return color
    }

    useEffect(()=>{
        let tooltip = d3.select("#" + containerId).select(".tooltip");
        let svg = d3.select("#"+svgId)
            .attr("width", width)
            .attr("height", height)
            // .append("g")
        svg.html("")
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
            .attr("fill", colorMap)
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
            })
            .on("click", function (e, d) {
                console.log(d);
                let config = searchSuperConfigByClassName(d.class, classConfigs, superClassConfigs);
                if(config){
                    setHighlightSuper(config);
                }
        });
        ;
        ;
        // let yAxis = d3.axisLeft();


    }, [highlightSuper])
    return (
        <Card className={"matrixCard"}>
            <div>
                <h3>{name}</h3>
            </div>
            <div id={containerId}>
                <svg id={svgId} width={width} height={height}>

                </svg>
                <div className={"tooltip"}></div>
            </div>

        </Card>

    )
}
export default MatrixView