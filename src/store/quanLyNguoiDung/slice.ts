import { createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungActionThunks } from ".";
import { LOCAL_USER_LOGIN_KEY } from "constant";
import { getUserLogin } from "utils";
import { Ghe, Update, UserLogin } from "types";
import { getAccessToken } from "utils/getAccessToken";

type QuanLyNguoiDungInitialState = {
  accessToken: string | undefined;
  isFetchingRegister: boolean;
  isFetchingLogin: boolean;
  isFetchingUpload: boolean;
  userLogin: UserLogin | undefined;
  cartList: Ghe[];  
  userInfo: {};
  update?: Update[];
};

const initialState: QuanLyNguoiDungInitialState = {
  accessToken: getAccessToken() ?? undefined,
  isFetchingRegister: false,
  isFetchingLogin: false,
  isFetchingUpload: false,
  userLogin: getUserLogin(),
  cartList: [] as Ghe[],
  userInfo: {},
  update: [] as Update[],
};

export const {
  reducer: quanLyNguoiDungReducer,
  actions: quanLyNguoiDungAction,
} = createSlice({
  name: "quanLyNguoiDung",
  initialState,

  reducers: {
    logOut: (state) => {
      state.accessToken = undefined;
      state.userLogin = undefined;
      localStorage.removeItem("ACCESSTOKEN");
    },
    update: (state, { payload }) => {
      state.userLogin = payload;
    },
    addToCart: (state, action) => {
      const index = state.cartList.findIndex(
        (gheDD) => gheDD.maGhe === action.payload.maGhe
      );
      if (index !== -1) {
        state.cartList.splice(index, 1);
      } else {
        state.cartList.push(action.payload);
      }
    },
    clearCart: (state) => {
      state.cartList = [];
    },
    updateUserLogin: (state, action) => {
      state.userLogin = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(quanLyNguoiDungActionThunks.registerThunk.pending, (state) => {
        state.isFetchingRegister = true;
      })
      .addCase(quanLyNguoiDungActionThunks.registerThunk.fulfilled, (state) => {
        state.isFetchingRegister = false;
      })
      .addCase(quanLyNguoiDungActionThunks.registerThunk.rejected, (state) => {
        state.isFetchingRegister = false;
      })
      .addCase(quanLyNguoiDungActionThunks.loginThunk.pending, (state) => {
        state.isFetchingLogin = true;
      })
      .addCase(
        quanLyNguoiDungActionThunks.loginThunk.fulfilled,
        (state, { payload }) => {
          state.isFetchingLogin = false;
          localStorage.setItem(LOCAL_USER_LOGIN_KEY, JSON.stringify(payload));
          state.userLogin = payload;
        }
      )
      .addCase(quanLyNguoiDungActionThunks.loginThunk.rejected, (state) => {
        state.isFetchingLogin = false;
      })
      .addCase(quanLyNguoiDungActionThunks.uploadThunk.pending, (state) => {
        state.isFetchingUpload = true;
      })
      .addCase(quanLyNguoiDungActionThunks.uploadThunk.fulfilled, (state) => {
        state.isFetchingUpload = false;
      })
      .addCase(quanLyNguoiDungActionThunks.uploadThunk.rejected, (state) => {
        state.isFetchingUpload = false;
      });
  },
});
