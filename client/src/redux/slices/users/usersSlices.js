import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
//Login action

export const loginUserAction = createAsyncThunk(
    "user/login",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const config =  {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const { data } = await axios.post(
                `${baseURL}/users/login`,
                payload,
                config
            );
            //save user into local storage
           localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error){
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
 );

 //register action

export const registerUserAction = createAsyncThunk(
    "user/register",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const config =  {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const { data } = await axios.post(
                `${baseURL}/users/register`,
                payload,
                config
            );

            return data;
        } catch (error){
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
 );

 //Logout action
export const logoutAction = createAsyncThunk(
    "/user/logout",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        localStorage.removeItem("userInfo");
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );


//profile
export const userProfileAction = createAsyncThunk(
    "user/profile",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const userToken = getState()?.users?.userAuth?.token;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        };
        try {
            const { data } = await axios.get(`${baseURL}/users/profile`, config);

            return data;
        } catch (error){
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
 );

 //update
export const updateProfileAction = createAsyncThunk(
    "user/update",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const userToken = getState()?.users?.userAuth?.token;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        };
        try {
            const { data } = await axios.put(`${baseURL}/users/update`,
            {firstname: payload?.firstname,
            lastname: payload?.lastname,
            email: payload?.email,
        },
             config
            );

            return data;
        } catch (error){
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
 );


//slices
const userLoginFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : undefined;
 const userSlices = createSlice({
    name: "users",
    initialState: {
        userAuth: userLoginFromStorage,
    },
    extraReducers: builder =>{
        //handle pending state
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userLoading = true;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });
        //handle success state
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.userLoading = false;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });
        //handle rejection state
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.userLoading = false;
            state.userAppErr = action?.payload?.msg;
            state.userServerErr = action?.error?.msg;
        });


        //handle pending state
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.userLoading = true;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });
        //handle success state
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.isRegistered = true;
            //state.userAuth = action?.payload;
            state.userLoading = false;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });
        //handle rejection state
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.userLoading = false;
            state.userAppErr = action?.payload?.msg;
            state.userServerErr = action?.error?.msg;
        });
        

        //profile
        builder.addCase(userProfileAction.pending, (state, action) => {
            state.loading = true;
            state.AppErr = undefined;
            state.ServerErr = undefined;
        });
        //handle success state
        builder.addCase(userProfileAction.fulfilled, (state, action) => {
            state.userUpdate = action?.payload;
            state.isEdited = true;
            state.profile = action?.payload;
            state.loading = false;
            state.AppErr = undefined;
            state.ServerErr = undefined;
        });
        //handle rejection state
        builder.addCase(userProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.AppErr = action?.payload?.msg;
            state.ServerErr = action?.error?.msg;
        });

        //update
        builder.addCase(updateProfileAction.pending, (state, action) => {
            state.loading = true;
            state.AppErr = undefined;
            state.ServerErr = undefined;
        });
        //handle success state
        builder.addCase(updateProfileAction.fulfilled, (state, action) => {
            state.userUpdate = action?.payload;
            state.loading = false;
            state.AppErr = undefined;
            state.ServerErr = undefined;
        });
        //handle rejection state
        builder.addCase(updateProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.AppErr = action?.payload?.msg;
            state.ServerErr = action?.error?.msg;
        });
    }, 
 });

 export default userSlices.reducer;


