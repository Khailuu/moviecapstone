import axios from "axios"
import { RegisterType } from "schemas"

export const qlndServices = {
    dangKy: (payload: RegisterType) => axios.post('https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy' , payload, {
        headers: {
            TokenCybersoft: 
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2MyIsIkhldEhhblN0cmluZyI6IjA5LzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNTg0MDAwMDAwMCIsIm5iZiI6MTY5Njg3MDgwMCwiZXhwIjoxNzI1OTg3NjAwfQ.eka9nnrY4RvjgyAAdJH7uruVGj0DfXCfIM8V8HRpIMI"
        }
    }) 
}