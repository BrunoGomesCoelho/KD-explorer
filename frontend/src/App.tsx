import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ImageGrid from "./components/ImageGrid";
import MatrixView from "./components/MatrixView";
import RadialBar from "./components/RadialBar";
import FeatureMap from "./components/FeatureMap";
import ResultPanel from "./components/ResultPanel";
import {ImageConfig, SuperClassConfig} from "./utils/interface";
import {generateFakeImageConfigs, generateFakeClassPrediction, generateFakeMetrics} from "./utils/fake";
import {generateClassConfigs} from "./utils/constants";
import {getSuperClasses, getClassConfigs} from "./utils/data";
import {enumerateImages} from "./utils/image";

function App() {
    const [highlightSuper, setHighlightSuper] = useState<SuperClassConfig>();
    let onOpenImage = (config: ImageConfig) => {
        return
    }
    let imageConfigs = enumerateImages({
        label: "any",
        class: "any"
    })
    imageConfigs = imageConfigs.slice(0, 100)
    let classPredictions = generateFakeClassPrediction();
    let classConfigs = getClassConfigs();
    let superClassConfigs = getSuperClasses();
    let superClassMetrics = generateFakeMetrics(superClassConfigs);
    console.log(superClassConfigs);
    let leftWidth = 1000;
    let radialBarWidth = leftWidth / superClassConfigs.length;
    return (
        <div className="App">
            <div className={"container"}>
                <div className={"left"}>

                    <ResultPanel
                        highlightSuper={highlightSuper} setHighlightSuper={setHighlightSuper}
                        superClassConfigs={superClassConfigs} width={leftWidth} superClassMetrics={superClassMetrics}></ResultPanel>
                    <div className={"featuremap-row"}>
                        <FeatureMap name={"Teacher"} width={500} height={500} predictions={classPredictions} vid={"1"}
                                    classConfigs={classConfigs}></FeatureMap>

                        <FeatureMap name={"Student"} width={500} height={500} predictions={classPredictions} vid={"2"}
                                    classConfigs={classConfigs}></FeatureMap>

                    </div>
                    <div className={"matrix-row"}>
                        <MatrixView name={"Teacher"} width={500} height={500} predictions={classPredictions} vid={"1"}
                                    classConfigs={classConfigs} superClassConfigs={superClassConfigs}
                                    highlightSuper={highlightSuper} setHighlightSuper={setHighlightSuper}
                        ></MatrixView>

                        <MatrixView name={"Student"} width={500} height={500} predictions={classPredictions} vid={"2"}
                                    classConfigs={classConfigs} superClassConfigs={superClassConfigs}
                                    highlightSuper={highlightSuper} setHighlightSuper={setHighlightSuper}
                        ></MatrixView>

                    </div>

                </div>
                <ImageGrid onClickPlay={onOpenImage} imageConfigs={imageConfigs}></ImageGrid>
            </div>

        </div>
    );
}

export default App;
