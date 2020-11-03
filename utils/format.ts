import { Expert } from "../ts/interfaces";

export const getExpertImage = (expert: Expert): string => {
    return getImageUrl(expert.image);
}

export const getImageUrl = (image: any): string => {
    try {
        return image.url
    } catch(err){
        return "/images/profile.png"
    }
}