import axios from "axios"; 

const Instance = axios.create({
  baseURL : 'https://api.escuelajs.co/api/v1/',
  headers: {
    "Content-Type": "application/json",
    timeout : 1000,
  }, 
});

export { Instance };