import axios from "axios";
import useSWR from "swr";
import { getToken } from "../utils/magic";

let loading = true;
const fetcher = async (...args) => {
  const token = await getToken();

  const res = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/requests/my`,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("useMyRequest fetcher res.data", res.data);
  loading = false;
  return res.data;
};

export const useMyRequest = (user) => {
  const { data, error } = useSWR("/requests/my", fetcher);
  if (!user) {
    return [[]];
  }
  console.log("useMyRequest data", data);
  return [data || [], loading];
};
