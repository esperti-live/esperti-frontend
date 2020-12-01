import axios from 'axios'
import useSWR from 'swr'

import { getToken } from "../../utils/magic";

const fetcher = async (...args) => {
    const token = await getToken()

    const res = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/chats`,
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log("useNotifications fetcher res.data", res.data)
    return res.data
}

export const useNotifications = (user) => {
    if(!user) {
        return []
    }

    const { data, error } = useSWR('/api/user', fetcher)


    return data || []
}