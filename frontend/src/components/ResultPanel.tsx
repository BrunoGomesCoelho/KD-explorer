import React, {ComponentProps, CSSProperties, useEffect, useState} from 'react';
import {ClassConfig, ClassPrediction, SuperClassConfig} from "../utils/interface";
import * as d3 from "d3";
import RadialBar from "./RadialBar";
import {ImageConfig} from "../utils/interface";
import {generateFakeImageConfigs, generateFakeClassPrediction, generateFakeAccuracy} from "../utils/fake";
import {generateClassConfigs, METRICS} from "../utils/constants";
import {getSuperClasses} from "../utils/data";
import "./ResultPanel.css"
import Card from "@material-ui/core/Card";

interface ResultPanelProps {
    superClassConfigs: Array<SuperClassConfig>,
    width: number,
    superClassMetrics: Map<string, Map<string, Array<number>>>,
    highlightSuper?: SuperClassConfig,
    setHighlightSuper: (config: SuperClassConfig)=>void
}

interface RowProps {
    superClassConfigs: Array<SuperClassConfig>,
    cellWidth: number,
    indexWidth: number,
    superClassMetric: Map<string, Array<number>> | undefined,
    metricName: string,
    highlightSuper?: SuperClassConfig,
    setHighlightSuper: (config: SuperClassConfig)=>void
}
interface HeaderProps{
    superClassConfigs: Array<SuperClassConfig>,
    cellWidth: number,
    indexWidth: number,
}

function ResultHeader({superClassConfigs, cellWidth, indexWidth} : HeaderProps){
    let formatName = (name: string) => {
        return name.slice(0, 4)
    }
    return (
        <div className={"result-row"}>
            <div  className={"result-row-name"}>
                <h3>{""}</h3>
            </div>
            {superClassConfigs.map((config, i) => {
                return (
                    <div className={"result-header-cell"}>
                        <h4>
                            {formatName(config.name)}
                        </h4>

                    </div>
                )
            })}
        </div>
    )
}

function ResultRow({superClassMetric, superClassConfigs, indexWidth,cellWidth, metricName, highlightSuper, setHighlightSuper}: RowProps) {

    return (
        <div className={"result-row"}>
            <div  className={"result-row-name"}>
                <h3>{metricName}</h3>
            </div>
            {superClassConfigs.map((config, i) => {
                let setHighlight = () =>{
                    setHighlightSuper(config);
                }
                let highlight = false;

                if(highlightSuper?.name === config.name){
                    highlight = true;
                }else if(!highlightSuper){
                    highlight = true;
                }
                return (
                    <RadialBar width={cellWidth} height={cellWidth} vid={ metricName + i.toString()} key={i}
                               superClassConfig={config}
                               accuracy={superClassMetric?.get(config.name) || []}
                                metricName={metricName} setHighlight={setHighlight} highlight={highlight}
                    ></RadialBar>
                )
            })}
        </div>
    )
}

function ResultPanel({superClassConfigs, superClassMetrics, width, highlightSuper, setHighlightSuper}: ResultPanelProps) {
    let indexWidth = 100
    let cellWidth =  ( width - indexWidth ) / superClassConfigs.length;
    let metricNames = METRICS;
    return (
        <Card className={"result-card"}>
            <div className={"result-header"}>
                <ResultHeader superClassConfigs={superClassConfigs} cellWidth={width} indexWidth={indexWidth}></ResultHeader>

            </div>
            <div className={"result-container"} >
                {
                    metricNames.map(name => {
                        return (
                            <ResultRow superClassMetric={superClassMetrics.get(name)} cellWidth={cellWidth} indexWidth={indexWidth}
                                       superClassConfigs={superClassConfigs} metricName={name} key={name} highlightSuper={highlightSuper}
                                        setHighlightSuper={setHighlightSuper}
                            />
                        )
                    })
                }
                {

                }

            </div>
        </Card>

    )
}

export default ResultPanel;