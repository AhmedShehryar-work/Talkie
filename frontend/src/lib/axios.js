import axios from "axios"

export const axi = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true
})