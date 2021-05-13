import React, {CSSProperties, useState} from 'react';
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
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {
    getSuperClasses,
    getClassConfigs,
    searchSuperConfigByClassName,
    searchClassConfigByName,
    loadClassPrediction, loadMetrics
} from "./utils/data";
import {enumerateImages} from "./utils/image";
import {Card} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


function App() {
    const [highlightSuper, setHighlightSuper] = useState<SuperClassConfig>();
    const [focusImage, setFocusImage] = useState<ImageConfig>()
    function smartSetHighlightSuper  (config?: SuperClassConfig) {
        console.log(highlightSuper);
        setHighlightSuper((oldSuper)=>{
            if(oldSuper?.name === config?.name){
                return undefined
            }else{
                return config;
            }
        })
        // if(config?.name === highlightSuper?.name){
        //     setHighlightSuper(undefined)
        // }else{
        //     setHighlightSuper(config);
        // }
    }
    const useStyles = makeStyles((theme: Theme) =>  createStyles({
        featureMapRow: {
            position: "relative",
            bottom: 0,
            display: "flex",
            flexDirection: "row",
            marginBottom: 30,
            justifyContent: "space-around",
            paddingTop: 30,
            paddingBottom: 15,
        },
        icon: {
            color: 'rgba(55, 55, 55, 0.54)',
            position: "absolute",
            top: 15,
            right: 20,
            width: 60,
            height: 60
        },

    }));
    const classes = useStyles();
    let onOpenImage = (config: ImageConfig) => {
        return
    }
    let imageConfigs = enumerateImages({
        label: "any",
        class: "any"
    })
    let classPredictions = loadClassPrediction();
    let classConfigs = getClassConfigs();
    let superClassConfigs = getSuperClasses();
    let superClassMetrics = loadMetrics(superClassConfigs)

    let leftWidth = 1000;
    let radialBarWidth = leftWidth / superClassConfigs.length;
    let imageGridStyle: CSSProperties = {

    }
    let showingImages = imageConfigs
    if(highlightSuper){
        showingImages = imageConfigs.filter(image=>{
            let config = searchClassConfigByName(image.class, classConfigs);
            if(config && config.superclass === highlightSuper.name){
                return true
            }else{
                return false;
            }
        })
    }
    let renderFeatureMaps = () => {
        if(focusImage){
            let teacherUrl = "https://storage.cloud.google.com/kd-explorer-cifar100/attention_maps/attention_map_10_0_0.png?_ga=2.153631100.-595614758.1616367036"
            let studentUrl = "https://storage.cloud.google.com/kd-explorer-cifar100/attention_maps/attention_map_9_0_0.png?_ga=2.153631100.-595614758.1616367036"
            let onClickClose = () =>{
                setFocusImage(undefined);
            }
            return (
                <Card className={classes.featureMapRow}>
                    <FeatureMap name={"Teacher"} width={350} height={350} predictions={classPredictions} vid={"1"}
                                classConfigs={classConfigs}
                                src={teacherUrl}
                    ></FeatureMap>

                    <FeatureMap name={"Student"} width={350} height={350} predictions={classPredictions} vid={"2"}
                                classConfigs={classConfigs}
                                src={studentUrl}
                    ></FeatureMap>
                    <IconButton aria-label={`close`}
                                className={classes.icon}>
                        <CloseIcon onClick={()=>onClickClose()} />
                    </IconButton>

                </Card>
            )
        }
    }
    return (
        <div className="App">
            <div className={"container"}>
                <div className={"left"}>

                    <ResultPanel
                        highlightSuper={highlightSuper} setHighlightSuper={smartSetHighlightSuper}
                        superClassConfigs={superClassConfigs} width={leftWidth} superClassMetrics={superClassMetrics}></ResultPanel>
                    {
                        renderFeatureMaps()
                    }
                    <div className={"matrix-row"}>
                        <MatrixView name={"Teacher"} width={350} height={350} predictions={classPredictions} vid={"1"}
                                    classConfigs={classConfigs} superClassConfigs={superClassConfigs}
                                    highlightSuper={highlightSuper} setHighlightSuper={setHighlightSuper}
                        ></MatrixView>

                        <MatrixView name={"Student"} width={350} height={350} predictions={classPredictions} vid={"2"}
                                    classConfigs={classConfigs} superClassConfigs={superClassConfigs}
                                    highlightSuper={highlightSuper} setHighlightSuper={setHighlightSuper}
                        ></MatrixView>

                    </div>

                </div>
                <ImageGrid setFocusImage={setFocusImage} onClickPlay={onOpenImage} imageConfigs={showingImages}></ImageGrid>
            </div>

        </div>
    );
}

export default App;
