import React, {ComponentProps, CSSProperties, useEffect, useState} from 'react';
import {ClassConfig, ClassPrediction, SuperClassConfig} from "../utils/interface";
import * as d3 from "d3";
import "./RadialBar.css";
interface RadialBarPops {
    width: number,
    height: number,
    accuracy: Array<number>
    vid: string,
    superClassConfig: SuperClassConfig,
    metricName: string,
    highlight: boolean,
    setHighlight: ()=>void
}

function RadialBar ({width, height, vid, superClassConfig, accuracy, metricName, setHighlight, highlight}: RadialBarPops){
    const margin = {
        top: 30,
        left: 30,
        bottom: 30,
        right: 30
    }
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;
    let svgId = "radial-" + vid;
    let containerId = "radial-container-" + vid;
    let arcMinRadius = 5;
    let numArcs = 2;
    let arcWidth = 5;
    let arcPadding = 3;
    function rad2deg(angle: number) {
        return angle * 180 / Math.PI;
    }

    function getInnerRadius(index: number) {
        return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
    }

    function getOuterRadius(index: number) {
        return getInnerRadius(index) + arcWidth;
    }

    let colorMap = (i: string) =>{

        let baseColor = d3.scaleOrdinal(d3.schemeCategory10)(i);
        if (highlight){
            return baseColor
        }
        let baseD3Color = d3.hsl(baseColor);
        baseD3Color.s = baseD3Color.s * 0.3
        baseD3Color.l = baseD3Color.l * 1.2;
        console.log(baseD3Color.h);
        let color = baseD3Color.formatRgb();
        return color
    }
    useEffect(()=>{
        // let svg = d3.select("#"+svgId + "-container")
        // svg.append("circle")
        //     .attr("cx", 0)
        //     .attr("cy", 0)
        //     .attr("r", 20)
        //     .attr("fill", "red")
    }, [highlight])

    useEffect(()=>{
        let tooltip = d3.select("#" + containerId).select(".radial-bar-tooltip");
        let svg = d3.select("#"+svgId)
            .attr("width", width)
            .attr("height", height);
        svg.html("");
        let container = svg.append("g")
            .attr("id", svgId + "-container")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        let scale = d3.scaleLinear()
            .domain([0, 1])
            .range([0, 2 * Math.PI]);

        // let ticks = scale.ticks(numTicks).slice(0, -1);
        // let keys = data.map((d, i) => d.name);
        //number of arcs
        // const numArcs = keys.length;
        // const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

        let arc = d3.arc<number>()
            .innerRadius((d, i) => getInnerRadius(i))
            .outerRadius((d, i) => getOuterRadius(i))
            .startAngle(0)
            .endAngle((d, i) => scale(d))
        function arcTween(d:SVGPathElement, i: number) {
            let interpolate = d3.interpolate(0, d);
            return ""
            // return arc(0.4, i);
        }
        let arcs = container.append('g')
            .attr('class', 'data')
            .selectAll('path')
            .data(accuracy)
            .enter().append('path')
            .attr('class', 'arc')
            .style('fill', (d, i) => colorMap(i.toString()))
            .attr("d", arc)
            .on("mouseover", function(e, d) {
                // console.log(d);
                // console.log(e);
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`super-class: ${superClassConfig.name}` + "<br/>" + `${metricName}: ${d.toFixed(2)}` )
                    .style("left", (e.clientX) + "px")
                    .style("top", (e.clientY) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
        // arcs.transition()
        //     .delay((d, i) => i * 200)
        //     .duration(1000)
        //     .attrTween('d', (d)=>arcTween);


    }, [highlight])
    return (
        <div id={containerId} className={"radial-bar"}>
            <svg id={svgId} width={width} height={height}>

            </svg>
            <div className={"radial-bar-tooltip"}></div>
        </div>
    )
}
export default RadialBar