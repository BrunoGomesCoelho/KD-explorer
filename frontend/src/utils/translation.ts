const classNameTranslation = {
    "poppies": "poppy",
    "roses": "rose",
    "sunflowers": "sunflower",
    "tulips": "tulip",
    "bowls": "bowl",
    "cans": "can",
    "cups": "cup",
    "plates": "plate",
    "apples": "apple",
    "mushrooms": "mushroom",
    "oranges": "orange",
    "pears": "pear",
    "sweet peppers": "sweet_pepper",
    "orchids": "orchid",
    "aquarium fish": "aquarium_fish",
    "bottles": "bottle",
    "computer keyboard": "keyboard",
    "maple": "maple_tree",
    "oak": "oak_tree",
    "palm": "palm_tree",
    "pine": "pine_tree",
    "willow": "willow_tree",
    "pickup truck": "pickup_truck",
    "lawn-mower": "lawn_mower",
}

function loadClassNameTranslation(): Map<string,string>{

    let classNameMap = new Map<string, string>()
    for (let entry of Object.entries(classNameTranslation)){
        classNameMap.set(entry[0], entry[1])
    }
    return classNameMap
}
// ata.ts:149 pickup truck recall undefined
// data.ts:149 lawn-mower recall undefined
// data.ts:149 aquarium fish precision undefined
// data.ts:149 bottles precision undefined
// data.ts:149 pears precision undefined
// data.ts:149 sweet peppers precision undefined
// data.ts:149 computer keyboard precision undefined
// data.ts:149 maple precision undefined
// data.ts:149 oak precision undefined
// data.ts:149 palm precision undefined
// data.ts:149 pine precision undefined
// data.ts:149 willow precision undefined
// data.ts:149 pickup truck precision undefined
// data.ts:149 lawn-mower precision undefined
// data.ts:149 aquarium fish f1 undefined
// data.ts:149 bottles f1 undefined
// data.ts:149 pears f1 undefined
// data.ts:149 sweet peppers f1 undefined
// data.ts:149 computer keyboard f1 undefined
// data.ts:149 maple f1 undefined
// data.ts:149 oak f1 undefined
// data.ts:149 palm f1 undefined
// data.ts:149 pine f1 undefined
// data.ts:149 willow f1 undefined
// data.ts:149 pickup truck f1 undefined
// data.ts:149 lawn-mower f1 undefined
//
export {classNameTranslation, loadClassNameTranslation};


// orchids precision undefined
// main.chunk.js:3187 poppies precision undefined
// main.chunk.js:3187 roses precision undefined
// main.chunk.js:3187 sunflowers precision undefined
// main.chunk.js:3187 tulips precision undefined
// main.chunk.js:3187 bottles precision undefined
// main.chunk.js:3187 bowls precision undefined
// main.chunk.js:3187 cans precision undefined
// main.chunk.js:3187 cups precision undefined
// main.chunk.js:3187 plates precision undefined
// main.chunk.js:3187 apples precision undefined
// main.chunk.js:3187 mushrooms precision undefined
// main.chunk.js:3187 oranges precision undefined
// main.chunk.js:3187 pears precision undefined
// main.chunk.js:3187 sweet peppers precision undefined
