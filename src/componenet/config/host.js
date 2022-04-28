import axios from "axios";
export let host = "https://baratov.credence.uz/uz"; //http://62.209.129.3:8000
export let hosten = "https://baratov.credence.uz/en";
export let hostru = "https://baratov.credence.uz/ru";
export let host1 = "https://baratov.credence.uz";

export let HttpRequest = (config) => {
  return axios({
    url: host,
    url: host1,
    ...config,
  });
};
