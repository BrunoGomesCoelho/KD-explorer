import {ClassPrediction, ImageConfig, SuperClassConfig} from "./interface";

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
    let classes = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"]
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
        let teacherAccuracy = Math.random();
        accuracy.set(config.name, [teacherAccuracy, teacherAccuracy * Math.random()]);
    }
    return accuracy;
}
export {generateFakeImageConfigs, generateFakeClassPrediction, generateFakeAccuracy}