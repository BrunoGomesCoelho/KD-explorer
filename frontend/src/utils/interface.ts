interface ImageConfig {
    id: string,
    class: string,
    url: string,

}
interface ImageData {
    file: string,
    data: Map<string, number>,
}
interface ClassPrediction {
    class: string,
    prediction: string,
    probability: number,
}
interface ClassConfig {
    name: string,
    superclass: string,
}

interface SuperClassConfig {
    name: string,
    classes: Array<string>
}

interface ImageQuery {
    label: string,
    class: string,
}

export type { ImageConfig, ImageData, ClassPrediction, ClassConfig, SuperClassConfig, ImageQuery }