import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.lardi-trans.com/v2",
  headers: {
    Accept: "application/json",
    Authorization: "3WQ1EQ465C4005000130",
  },
});

export default instance;
