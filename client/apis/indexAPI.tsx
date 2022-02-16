import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_ART_STORE_API,
});
