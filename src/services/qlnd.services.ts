import { QUAN_LY_NGUOI_DUNG_API, apiInstance } from 'constant'
import { LoginType, RegisterType } from 'schemas'
import { UserLogin } from 'types'

const api = apiInstance.create({
    baseURL: QUAN_LY_NGUOI_DUNG_API,
})

export const qlNguoiDungServices = {
    dangKy: (payload: RegisterType) => api.post('/DangKy', payload),

    dangNhap: (payload: LoginType) => api.post<HttpResponse<UserLogin>>('/DangNhap', payload),
}





// import axios from "axios"
// import { apiInstance } from "constant"
// import { LoginType, RegisterType } from "schemas"

// const api = apiInstance.create({
//     baseURL: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung',
// })

// export const qlndServices = {
//     dangKy: (payload: RegisterType) => axios.post('https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy' , payload, {
//         headers: {
//             TokenCybersoft: 
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2MyIsIkhldEhhblN0cmluZyI6IjA5LzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNTg0MDAwMDAwMCIsIm5iZiI6MTY5Njg3MDgwMCwiZXhwIjoxNzI1OTg3NjAwfQ.eka9nnrY4RvjgyAAdJH7uruVGj0DfXCfIM8V8HRpIMI"
//         }
//     }),
//     dangNhap: (payload: LoginType) => axios.post('https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap' , payload, {
//         headers: {
//             TokenCybersoft: 
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2MyIsIkhldEhhblN0cmluZyI6IjA5LzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNTg0MDAwMDAwMCIsIm5iZiI6MTY5Njg3MDgwMCwiZXhwIjoxNzI1OTg3NjAwfQ.eka9nnrY4RvjgyAAdJH7uruVGj0DfXCfIM8V8HRpIMI"
//         }
//     }), 

// }

