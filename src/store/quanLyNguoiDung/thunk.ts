import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginType, RegisterType } from "schemas";
import { qlNguoiDungServices, quanLyPhimServices } from "services";
import { Update } from "types";
import { sleep } from "utils";
import { getAccessToken } from "utils/getAccessToken";

// quản lý bất đồng bộ
export const registerThunk = createAsyncThunk('quanLyNguoiDung/register',
async (payload: RegisterType, {rejectWithValue /*,dispatch, getState*/}) => {
    try {
        // console.log(payload)
        // sleep them 1s
        await sleep()
        const res = await qlNguoiDungServices.dangKy(payload)
        console.log(res)
    } catch (err) {
        return rejectWithValue(err)
    }
}
)

export const loginThunk = createAsyncThunk('quanLyNguoiDung/login',
async (payload: LoginType, {rejectWithValue}) => {
    try {
        await sleep()
        const res = await qlNguoiDungServices.dangNhap(payload)
        return res.data.content
    } catch (err) {
        return rejectWithValue(err)
    }
}
)


export const putUpdateInfoThunk = createAsyncThunk(
    "quanLyNguoiDung/putUpdateInfo",
    async(payload : Update, {rejectWithValue}) => {
        try {
            const data = await qlNguoiDungServices.updateAccount(payload)
            return data.data.content
        } catch(err) {
            return rejectWithValue(err)
        }
    }
)

export const uploadThunk = createAsyncThunk('ThemPhimUploadHinh',
async (payload: FormData, {rejectWithValue}) => {
    try {
        const res = await quanLyPhimServices.uploadPhim(payload)
        console.log(res)
    }
    catch(err) {
        return rejectWithValue(err)
    }
}
)

export const getHistoryBookingThunk = createAsyncThunk(
    "quanLyNguoiDung/getHistoryBooking",
    async(_,{rejectWithValue}) => {
        try{
            const token = getAccessToken()
            if(token) {
                const data = await qlNguoiDungServices.getHistoryBooking();
                return data.data.content
            }
        } catch(err) {
            return rejectWithValue(err)
        }
    }
)