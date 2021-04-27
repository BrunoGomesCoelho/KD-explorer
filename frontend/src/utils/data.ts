import superClassData from "../data/cifar100.json"
import {SuperClassConfig} from "./interface";

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

export {getSuperClasses};