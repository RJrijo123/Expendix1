import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";


//action for redirect
export const resetExpCreated = createAction('expense/created/reset');
export const resetExpUpdate = createAction('expense/update/reset');


// Register action
export const createExpAction = createAsyncThunk(
  "expense/create",
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
            `${baseURL}/expenses`,
            payload,
            config
        );

        //dispatch
        dispatch(resetExpCreated());
        

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
export const fetchAllExpAction = createAsyncThunk(
  "expense/fetch",
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
            `${baseURL}/expenses?page=${payload}`,
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
export const updateExpAction = createAsyncThunk(
  "expense/update",
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
            `${baseURL}/expenses/${payload?.id}`,
            payload,
            config
        );
        
          dispatch(resetExpUpdate());
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
  name: "expenses",
  initialState: {
    loading: false,
    expenseCreated: null,
    appErr: null,
    serverErr: null,
  },
  extraReducers: (builder) => {
    // Create Expense
    builder.addCase(createExpAction.pending, (state, action) => {
      state.loading = true;
    });
    //resetAction
    builder.addCase(resetExpCreated, (state, action) => {
      state.isExpCreated = true;
    });
    builder.addCase(createExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isExpCreated = false;
    });
    builder.addCase(createExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });
  

      // fetch all Expenses
      builder.addCase(fetchAllExpAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(fetchAllExpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseList = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchAllExpAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.msg;
        state.serverErr = action?.error?.msg;
      });

      //update Expense
      builder.addCase(updateExpAction.pending, (state, action) => {
        state.loading = true;
      });
      //resetAction
      builder.addCase(resetExpUpdate, (state, action) => {
      state.isExpUpdated = true;
      });
      builder.addCase(updateExpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseUpdated = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.isExpUpdated = false;
      });
      builder.addCase(updateExpAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.msg;
        state.serverErr = action?.error?.msg;
      });

  },

});

export default expenseSlices.reducer;
