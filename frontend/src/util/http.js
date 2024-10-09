import axios from "axios";

const domain = '14.225.27.183';
const http = axios.create({
    baseURL: `http://${domain}:8082/api`,
})

export default http;