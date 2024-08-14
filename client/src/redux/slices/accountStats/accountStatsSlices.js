import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";



// fetch all action
export const fetchAccountStatsAction = createAsyncThunk(
    "account/fetch",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      // Get user token
      const userToken = getState()?.users?.userAuth?.token;
      const config = {
        headers: {
          authorization: `Bearer ${userToken?.token}`,
        },
      };
      try {
          const { data } = await axios.get(
              `${baseURL}/accounts-statistics`,
              config
          );
          
  
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );


  const expenseSlices = createSlice({
    name: "account",
    initialState: {
      loading: false,
      expenseCreated: null,
      appErr: null,
      serverErr: null,
    },
    extraReducers: (builder) => {
      
    
  
        // fetch all Expenses
        builder.addCase(fetchAccountStatsAction.pending, (state, action) => {
          state.loading = true;
        });
        builder.addCase(fetchAccountStatsAction.fulfilled, (state, action) => {
          state.loading = false;
          state.accountDetails = action?.payload;
          state.appErr = undefined;
          state.serverErr = undefined;
        });
        builder.addCase(fetchAccountStatsAction.rejected, (state, action) => {
          state.loading = false;
          state.appErr = action?.payload?.msg;
          state.serverErr = action?.error?.msg;
        });
  
        
  
    },
  
  });
  
  export default expenseSlices.reducer;
  