import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginType, RegisterType } from "schemas";
import { qlNguoiDungServices } from "services";
import { sleep } from "utils";

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