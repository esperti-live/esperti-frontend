import axios from "axios";
import { useState, useEffect } from "react";
import useSWR from "swr";
import {dequal} from "dequal"

import { getToken } from "../utils/magic";
let loading = true;
const fetcher = async (...args) => {
  const token = await getToken();

  const res = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/chats`,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("useNotifications fetcher res.data", res.data);
  loading = false;
  return res.data;
};

export const useNotifications = () => {
  const [previous, setPrevious] = useState(null)
  const [newCount, setNewCount] = useState(0)
  const { data, error } = useSWR("/api/user", fetcher);

  useEffect(() => {
    if(data && previous && !dequal(data, previous)){
      setPrevious(data)
      setNewCount(newCount + 1)
    }
    if(data && !previous){
      setPrevious(data)
    }
  }, [data])


  return [data || [], loading, newCount, setNewCount];
};
