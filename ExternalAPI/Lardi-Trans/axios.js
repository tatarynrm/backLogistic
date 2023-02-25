import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.lardi-trans.com/v2",
  headers: {
    Accept: "application/json",
    Authorization: "2MU6H9PLKNH000003122",
  },
});

export default instance;
