import axios from "axios";

const api = axios.create({
    baseURL: "https://unified-education-interface-production.up.railway.app"
});


export default api;