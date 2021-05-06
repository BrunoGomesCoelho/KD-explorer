import {ClassPrediction, ImageConfig, SuperClassConfig} from "./interface";
import {getClassList} from "./data";

function generateFakeImageConfigs(): Array<ImageConfig>{
    let arr: Array<ImageConfig> = []
    for (let i = 0 ; i < 100; i++){
        arr.push({
            id: i.toString(),
            class: "car",
            url: "https://storage.googleapis.com/ltpt-videos/video-images/AFL%20Video-181101_AFL-PEORIA_AFL-SCOTTSDALE__0-3367-A.png"
        })
    }
    return arr;
}

function generateFakeClassPrediction(): Array<ClassPrediction>{
    let arr: Array<ClassPrediction> = [];
    let classes = getClassList();
    console.log(classes)
    for (let classname of classes){
        for(let prediction of classes){
            arr.push({
                class: classname,
                prediction: prediction,
                probability: Math.random(),
            })
        }
    }
    return arr;
}
function generateFakeAccuracy(superClasses: Array<SuperClassConfig>){
    let accuracy = new Map<string, Array<number>>()
    for (let config of superClasses){
        let teacherAccuracy = 0.3 * Math.random() + 0.7;
        accuracy.set(config.name, [teacherAccuracy, 0.5 + 0.5 * teacherAccuracy * Math.random()]);
    }
    return accuracy;
}

function generateFakeMetrics(superClasses: Array<SuperClassConfig>){
    let metricNames = ["accuracy", "recall", "precision", "f1"]
    let metrics = new Map<string, Map<string, Array<number>>>();
    for (let name of metricNames){
        metrics.set(name, generateFakeAccuracy(superClasses));
    }
    return metrics
}
export {generateFakeImageConfigs, generateFakeClassPrediction, generateFakeAccuracy, generateFakeMetrics}