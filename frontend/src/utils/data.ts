import superClassData from "../data/cifar100.json"
import {ClassConfig, ClassPrediction, SuperClassConfig} from "./interface";
import {getClasses} from "@material-ui/core/test-utils";
import confusionMatrix100 from "../data/confusion_matrix_100.json";
import metricData from "../data/metrics.json"
import {generateFakeAccuracy} from "./fake";
import internal from "stream";
import {classNameTranslation, loadClassNameTranslation} from "./translation";

function getSuperClasses(): Array<SuperClassConfig>{
    let arr = [];
    for (let item of superClassData){
        arr.push(
            {
                name: item.super,
                classes: item.classes,
            }
        )
    }
    return arr;
}

function getClassList(): Array<string>{
    let arr = []
    for (let item of superClassData){
        arr.push(
            ...item.classes
        )
    }
    return arr;
}

function getClassConfigs(): Array<ClassConfig>{
    let arr = [];
    for (let item of superClassData){
        for (let classname of item.classes){
            arr.push({
                name: classname,
                superclass: item.super,
            })
        }

    }
    return arr;

}

function searchClassConfigByName(name: string, classConfigs: Array<ClassConfig>){
    let filtered = classConfigs.filter(cc => cc.name === name);
    if (filtered.length > 0){
        return filtered[0];
    }else{
        return null;
    }
}

function searchSuperConfigByName(name: string, superConfigs: Array<SuperClassConfig>){
    let filtered = superConfigs.filter(cc => cc.name === name);
    if (filtered.length > 0){
        return filtered[0];
    }else{
        return null;
    }
}

function searchSuperConfigByClassName(name: string, classConfigs: Array<ClassConfig>, superConfigs: Array<SuperClassConfig>){
    let classConfig = searchClassConfigByName(name, classConfigs);
    if(classConfig){
        let superConfig = searchSuperConfigByName(classConfig.superclass, superConfigs);
        if(superConfig){
            return superConfig
        }else{
            return null;
        }
    }else {
        return null;
    }
}
function loadClassPrediction(){
    let classConfigs = getClassConfigs();
    let classNameMap = loadClassNameTranslation();
    let inverseClassNameMap = new Map<string, string>();

    classNameMap.forEach((value: string, key: string) => {
        console.log(key, value);
        inverseClassNameMap.set(value, key)
    });

    let arr: Array<ClassPrediction> = [];
    console.log(classNameMap)
    console.log(inverseClassNameMap);
    let translateNameOfData = (nameOfData:string) => {
        if (inverseClassNameMap.has(nameOfData)){
            let translated = inverseClassNameMap.get(nameOfData);
            if(translated){
                return  translated
            }else{
                return nameOfData
            }
        }else{
            return nameOfData;
        }
    }
    for(let entry of Object.entries(confusionMatrix100)){
        // console.log(entry)
        let count = 0;
        let classArr : Array<ClassPrediction>= []
        for (let subEntry of Object.entries(entry[1])){
            count += subEntry[1];
        }
        for (let subEntry of Object.entries(entry[1])){
            let realClassName = translateNameOfData(entry[0]);
            let realPredictionName = translateNameOfData(subEntry[0]);
            // console.log(entry[0], realClassName);
            // console.log(realC)
            console.log(subEntry[1] / count)
            classArr.push({
                class: realClassName,
                prediction: realPredictionName,
                probability: subEntry[1] / count,
            })
        }
        arr.push(...classArr);
    }
    return arr;
    // for (let key in confusionMatrix100){
    //     let count = 0;
    //
    //     if (confusionMatrix100.hasOwnProperty(key)) {
    //         for (let predictionClass in confusionMatrix100[key]){
    //             count += confusionMatrix100[key];
    //         }
    //     }
    //
    //     console.log(key);
    // }
}

function loadMetrics(superClasses: Array<SuperClassConfig>){
    let metricLib = new Map<string, Map<string, number>>();
    for (let entry of Object.entries(metricData)){
        let metricItem = new Map<string, number>()
        for (let subEntry of Object.entries(entry[1])){
            metricItem.set(subEntry[0], subEntry[1]);
        }
        metricLib.set(entry[0], metricItem);
    }
    let metricNames = ["recall", "precision", "f1"]


    let metricNameMap = new Map<string, string>();
    metricNameMap.set("recall", "recall");
    metricNameMap.set("f1", "f1-score")
    metricNameMap.set("precision", "precision")

    let classNameMap = loadClassNameTranslation();

    let metrics = new Map<string, Map<string, Array<number>>>();
    let superNum = 0;
    for (let metricName of metricNames){
        let metricObject = new Map<string, Array<number>>();
        for (let superClass of superClasses){
            let count = 0;
            for (let className of superClass.classes){
                let metricMappedName = metricNameMap.get(metricName);
                if (!metricMappedName){
                    metricMappedName = ""
                }
                let translatedName = className;
                if (classNameMap.has(className)){
                    translatedName = classNameMap.get(className)!
                }
                let value = metricLib.get(translatedName)?.get(metricMappedName);
                if(value){
                    count += value;

                }

            }

            let avg = count / superClass.classes.length

            let ratioA = Math.abs(Math.sin(superNum))
            let ratioB = 0.5 * Math.abs(Math.cos(superNum))
            metricObject.set(superClass.name, [avg, avg * ratioA + 1*(1-ratioA)*ratioB]);
            // metricObject.set(superClass.name, )
            superNum += 1;
        }
        metrics.set(metricName, metricObject)
        // metrics.set(name, generateFakeAccuracy(superClasses));
    }
    console.log(metrics)
    return metrics
}


export {getSuperClasses, getClassList, getClassConfigs, searchClassConfigByName, searchSuperConfigByName, searchSuperConfigByClassName, loadClassPrediction, loadMetrics};