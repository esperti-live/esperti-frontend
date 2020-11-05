import { Magic } from "magic-sdk";


export const getToken = async () => {
    const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PK);
    const tokenId = await m.user.generateIdToken();
    if(tokenId){
        return tokenId
    } else {
        throw new Error("You're not logged in")
    }
}