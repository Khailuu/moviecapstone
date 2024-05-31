import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyRapServices } from "services/qlr.services";
import { sleep } from "utils";

export const getCinemaListThunk = createAsyncThunk(
    "quanLyRap/getCinemaList",
    async (_ , {rejectWithValue}) => {
        try{
            const data = await quanLyRapServices.getThongTinHeThongRap();
            await sleep(5000)
            return data.data.content
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const getShowTimesListThunk = createAsyncThunk(
    "quanLyRap/getShowTimesList",
    async(_,{rejectWithValue}) =>{
        try{
            const data = await quanLyRapServices.getShowTimesList();
            
            return data.data.content
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const getShowTimesDetailThunk = createAsyncThunk(
    "quanLyRap/getShowTimesDetail",
    async(payload :number,{rejectWithValue}) =>{
        try{
            const data = await quanLyRapServices.getShowTimesDetail(payload)
            return data.data.content
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)