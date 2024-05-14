import { createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungActionThunks } from ".";
import { LOCAL_USER_LOGIN_KEY } from "constant";
import { getUserLogin } from "utils";
import { Ghe } from "types";



const initialState = {
    isFetchingRegister: false,
    isFetchingLogin: false,
    userLogin: getUserLogin(),
    cartList: [] as Ghe[]
}

export const { reducer: quanLyNguoiDungReducer, actions: quanLyNguoiDungAction  } = createSlice({
    name: 'quanLyNguoiDung',
    initialState,

    // xử lý action đồng bộ
    reducers: {
        addToCart: (state, action) => {
        
           
           console.log("payload: ",action.payload)
            const index = state.cartList.findIndex((gheDD) => {
                return gheDD.maGhe === action.payload.maGhe
            })
            console.log(index)
            if(index !== -1) {
                state.cartList.splice(index,1)
            }else {
                state.cartList.push(action.payload)
                console.log("cart: ",state.cartList)
            }
        },
        updateUserLogin: (state, action) => {
            state.userLogin = action.payload;
        },
    },
  
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
            state.userLogin = payload
        })
        .addCase(quanLyNguoiDungActionThunks.loginThunk.rejected,(state, action) => {
            console.log('action', action)
            state.isFetchingLogin = false
        })
    }
})