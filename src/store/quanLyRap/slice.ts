import { createSlice } from "@reduxjs/toolkit"
import { HeThongRap, ShowTimes, ShowTimesDetail} from "types"
import { getCinemaListThunk, getShowTimesDetailThunk, getShowTimesListThunk } from "./thunk"

type QuanLyRapInitialState = {
    rap ?: HeThongRap[],
    showTimesList ?: ShowTimes[],
    showTimesDetail ?: ShowTimesDetail
}

const initialState: QuanLyRapInitialState = {

}

const quanLyRapSlice = createSlice({
    name :"quanLyRap",
    initialState,
    reducers :{},
    extraReducers(builder){
        builder
        .addCase(getCinemaListThunk.fulfilled, (state,{payload}) => {
            state.rap = payload
        })
        .addCase(getShowTimesListThunk.fulfilled,(state, {payload}) => {
            state.showTimesList = payload
        })
        .addCase(getShowTimesDetailThunk.fulfilled,(state , {payload}) => {
            state.showTimesDetail = payload
        })
    } 
})

export const {reducer : quanLyRapReducer , actions : quanLyRapActions} = quanLyRapSlice
