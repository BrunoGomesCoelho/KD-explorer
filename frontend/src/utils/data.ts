import superClassData from "../data/cifar100.json"
import {ClassConfig, SuperClassConfig} from "./interface";
import {getClasses} from "@material-ui/core/test-utils";

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


export {getSuperClasses, getClassList, getClassConfigs, searchClassConfigByName, searchSuperConfigByName, searchSuperConfigByClassName};