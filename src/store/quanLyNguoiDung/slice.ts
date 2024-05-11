import { createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungActionThunks } from ".";
import { LOCAL_USER_LOGIN_KEY } from "constant";
import { getUserLogin } from "utils";



const initialState = {
    isFetchingRegister: false,
    isFetchingLogin: false,
    userLogin: getUserLogin()
}

export const { reducer: quanLyNguoiDungReducer, actions: quanLyNguoiDungAction  } = createSlice({
    name: 'quanLyNguoiDung',
    initialState,

    // xử lý action đồng bộ
    reducers: {},

    // xử lý action bất đồng bộ
    extraReducers: (builder) => {
        builder.addCase(quanLyNguoiDungActionThunks.registerThunk.pending,(state) => {
            state.isFetchingRegister = true
        })
        .addCase(quanLyNguoiDungActionThunks.registerThunk.fulfilled,(state) => {
            state.isFetchingRegister = false
        })
        .addCase(quanLyNguoiDungActionThunks.registerThunk.rejected,(state, action) => {
            console.log('action', action)
            state.isFetchingRegister = false
        })


        builder.addCase(quanLyNguoiDungActionThunks.loginThunk.pending,(state) => {
            state.isFetchingLogin = true
        })
        .addCase(quanLyNguoiDungActionThunks.loginThunk.fulfilled,(state, {payload}) => {
            state.isFetchingLogin = false
            // luu thong tin dang nhap cua user vao localstorage
            localStorage.setItem(LOCAL_USER_LOGIN_KEY, JSON.stringify(payload))
            // set lai thong tin ueser login
            state.userLogin
        })
        .addCase(quanLyNguoiDungActionThunks.loginThunk.rejected,(state, action) => {
            console.log('action', action)
            state.isFetchingLogin = false
        })
    }
})