import React, {ComponentProps, CSSProperties, useEffect, useState} from 'react';
import {ClassConfig, ClassPrediction, SuperClassConfig} from "../utils/interface";
import * as d3 from "d3";
interface RadialBarPops {
    width: number,
    height: number,
    accuracy: Array<number>
    vid: string,
    superClassConfig: SuperClassConfig
}

function RadialBar ({width, height, vid, superClassConfig, accuracy}: RadialBarPops){
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


    useEffect(()=>{
        let tooltip = d3.select("#" + containerId).select(".tooltip");
        let svg = d3.select("#"+svgId)
            .attr("width", width)
            .attr("height", height)
            .append("g")
        let container = svg.append("g")
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
            .style('fill', (d, i) => color(i.toString()))
            .attr("d", arc)
        // arcs.transition()
        //     .delay((d, i) => i * 200)
        //     .duration(1000)
        //     .attrTween('d', (d)=>arcTween);


    }, [])
    return (
        <div id={containerId}>
            <svg id={svgId} width={width} height={height}>

            </svg>
            {/*<div className={"tooltip"}></div>*/}
        </div>
    )
}
export default RadialBar