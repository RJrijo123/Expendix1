import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";


export const resetIncCreated = createAction('income/created/reset');
export const resetIncUpdate = createAction('income/update/reset');


// Register action
export const createIncomeAction = createAsyncThunk(
  "income/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // Get user token
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
        const { data } = await axios.post(
            `${baseURL}/income`,
            payload,
            config
        );
        
        dispatch(resetIncCreated());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// fetch all action
export const fetchAllIncomeAction = createAsyncThunk(
  "income/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // Get user token
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
        const { data } = await axios.get(
            `${baseURL}/income?page=${payload}`,
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
//update action
export const updateIncomeAction = createAsyncThunk(
  "income/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // Get user token
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
        const { data } = await axios.put(
            `${baseURL}/income/${payload?.id}`,
            payload,
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

const incomeSlices = createSlice({
  name: "income",
  initialState: {
    loading: false,
    expenseCreated: null,
    appErr: null,
    serverErr: null,
  },
  extraReducers: (builder) => {
    // Create Expense
    builder.addCase(createIncomeAction.pending, (state, action) => {
      state.loading = true;
    });
    //resetAction
    builder.addCase(resetIncCreated, (state, action) => {
        state.isIncCreated = true;
      });
    builder.addCase(createIncomeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.incomeCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isIncCreated = false;
    });
    builder.addCase(createIncomeAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });
  

      // fetch all Expenses
      builder.addCase(fetchAllIncomeAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(fetchAllIncomeAction.fulfilled, (state, action) => {
        state.loading = false;
        state.incomeList = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchAllIncomeAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.msg;
        state.serverErr = action?.error?.msg;
      });

      //update Expense
      builder.addCase(updateIncomeAction.pending, (state, action) => {
        state.loading = true;
      });
      //resetAction
      builder.addCase(resetIncUpdate, (state, action) => {
        state.isExpUpdated = true;
      });
      builder.addCase(updateIncomeAction.fulfilled, (state, action) => {
        state.loading = false;
        state.incomeUpdated = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.isExpUpdated = false;
      });
      builder.addCase(updateIncomeAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.msg;
        state.serverErr = action?.error?.msg;
      });

  },

});

export default incomeSlices.reducer;
