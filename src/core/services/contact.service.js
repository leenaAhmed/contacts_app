import axios from "axios";

export const getContacts = (page = 1, results = 15) => {
  return axios.get(`https://randomuser.me/api/?page=${page}&results=${results}`);
};

