import {ClassConfig} from "./interface";

function generateClassConfigs(): Array<ClassConfig>{
    let arr = [];
    let classes = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"];
    for (let classname of classes){
        arr.push({
            name: classname,
            superclass: "no"
        })
    }
    return arr;
}

export {generateClassConfigs}