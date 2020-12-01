import { User } from "../ts/interfaces"

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

/**
 * A channel is AID-BID
 * If I'm AID, Return BID
 * If I'm BID, return AID
 * @param channel 
 * @param user 
 */
export const getOtherUserId = (channel: string, user: User): string => {
    const options = channel.split('-')
    const me = options.indexOf(String(user.id))
    return me === 0 ? options[1] : options[0]
}

export const getUserInbox = (receiver: string) => {
    const inbox = `inbox-${receiver}`
    console.log("getUserInbox inbox", inbox)
    return inbox
}