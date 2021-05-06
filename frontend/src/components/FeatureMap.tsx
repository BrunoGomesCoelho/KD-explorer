import React, {ComponentProps, CSSProperties, useEffect, useState} from 'react';
import {ClassConfig, ClassPrediction} from "../utils/interface";
import Card from "@material-ui/core/Card";
import * as d3 from "d3";
import "./FeatureMap.css"
interface FeatureMapProps {
    width: number,
    height: number,
    predictions: Array<ClassPrediction>,
    vid: string,
    classConfigs: Array<ClassConfig>,
    name: string
}

function FeatureMap ({width, height, vid, name}: FeatureMapProps){
    const margin = {
        top: 30,
        left: 30,
        bottom: 30,
        right: 30
    }
    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;

    return (
        <Card>
            <h3>
                {name}
            </h3>
            <div className={"featuremap-placeholder"}>
                <h5>Place for feature map</h5>
            </div>
        </Card>

    )
}
export default FeatureMap