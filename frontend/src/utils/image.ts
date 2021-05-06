import {ImageConfig, ImageData, ImageQuery} from "./interface";
import {getClassList} from "./data";

function describeImage(imageConfig: ImageConfig) {
    return {
        title: imageConfig.class,
        subtitle: imageConfig.id
    }
}


function getImageUrl(imageConfig: ImageConfig | undefined){
    if(imageConfig){
        return imageConfig.url;
    }
    return "https://storage.googleapis.com/ltpt-videos/video-images/AFL%20Video-181101_AFL-PEORIA_AFL-SCOTTSDALE__0-3367-A.png";

}

function enumerateImagesOfLabelAndCategory(label:string, category: string): Array<ImageConfig>{
    let images = []
    for (let i = 0; i < 50; i++){
        let imageId = (i+1).toString().padStart(4, "0");
        let url = `https://storage.cloud.google.com/kd-explorer-cifar100/cifar-100/${label}/${category}/${imageId}.png`
        // let url = `https://storage.googleapis.com/kd-explorer-cifar100/cifar-100/${label}/${category}/${imageId}.png`
        let image = {
            id: imageId,
            class: category,
            url: url
        }
        images.push(image)
    }
    return images;
}
function enumerateImagesOfLabel(label: string, category: string) : Array<ImageConfig>{
    let images = []
    if(category === "any"){
        let classList = getClassList();
        for (let category of classList){
            let categoryImages = enumerateImagesOfLabelAndCategory(label, category);
            images.push(...categoryImages);
        }
    }
    return images
}

function enumerateImages(query: ImageQuery): Array<ImageConfig>{
    const labels = ["train", "test"]
    const baseUrl = "https://storage.googleapis.com/kd-explorer-cifar100/cifar-100/train/aquarium_fish/0004.png"
    let images = []
    if(query.label === "any"){
        for (let label of labels){
            let _images = enumerateImagesOfLabel(label, query.class);
            images.push(..._images);
        }
        return images;
    }else{
        return enumerateImagesOfLabel(query.label, query.class);
    }
}

export {describeImage, getImageUrl, enumerateImages}

