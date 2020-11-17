/**
 * Builds channel from ids, ensure sorting is consistent to ensure chat A-B is B-A
 * @param initiator 
 * @param receiver 
 */
export const getChannel = (initiator: number, receiver: number): string => {
    if(initiator > receiver){
        return `${receiver}-${initiator}`
    }
    return `${initiator}-${receiver}`
}