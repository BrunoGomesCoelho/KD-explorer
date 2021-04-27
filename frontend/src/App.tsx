import React from 'react';
import logo from './logo.svg';
import './App.css';
import ImageGrid from "./components/ImageGrid";
import MatrixView from "./components/MatrixView";
import RadialBar from "./components/RadialBar";
import {ImageConfig} from "./utils/interface";
import {generateFakeImageConfigs, generateFakeClassPrediction, generateFakeAccuracy} from "./utils/fake";
import {generateClassConfigs} from "./utils/constants";
import {getSuperClasses} from "./utils/data";

function App() {
    let onOpenImage = (config: ImageConfig) => {
        return
    }
    let imageConfigs = generateFakeImageConfigs();
    let classPredictions = generateFakeClassPrediction();
    let classConfigs = generateClassConfigs();
    let superClassConfigs = getSuperClasses();
    let superClassAccuracy = generateFakeAccuracy(superClassConfigs);
    console.log(superClassConfigs);
    let leftWidth = 1000;
    let radialBarWidth = leftWidth / superClassConfigs.length;
    return (
        <div className="App">
            <div className={"container"}>
                <div>

                    <div className={"superClasses"}>
                        {
                            superClassConfigs.map((config, i) => {
                                return (
                                    <RadialBar width={radialBarWidth} height={radialBarWidth} vid={i.toString()}
                                               superClassConfig={config} accuracy={superClassAccuracy.get(config.name) || []}></RadialBar>
                                )
                            })
                        }

                    </div>
                    <MatrixView width={1000} height={600} predictions={classPredictions} vid={"1"}
                                classConfigs={classConfigs}></MatrixView>

                </div>
                <ImageGrid onClickPlay={onOpenImage} imageConfigs={imageConfigs}></ImageGrid>
            </div>

        </div>
    );
}

export default App;
