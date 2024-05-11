import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer : rootReducer
})

type Store = typeof store
type AppDispatch = Store['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<Store['getState']>