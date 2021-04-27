import {ImageConfig, ImageData} from "./interface";

function describeImage(imageConfig: ImageConfig) {
    return {
        title: imageConfig.class,
        subtitle: imageConfig.id
    }
}


function getImageUrl(imageConfig: ImageConfig | undefined){
    if(!imageConfig){
        return ""
    }
    return "https://storage.googleapis.com/ltpt-videos/video-images/AFL%20Video-181101_AFL-PEORIA_AFL-SCOTTSDALE__0-3367-A.png";

}


export {describeImage, getImageUrl}

