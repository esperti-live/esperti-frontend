import { Expert } from "../ts/interfaces";

export const getExpertImage = (expert: Expert): string => {
    try {
        return expert.image.url
    } catch(err){
        return "/images/profile.png"
    }
}