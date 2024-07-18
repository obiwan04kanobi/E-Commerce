import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/Config";

const initialState = {
  orders: []
};

export const FetchAllOrders = createAsyncThunk(
  "order/FetchAllOrders",
  async () => {
    const response = await getDocs(collection(db, "Orders"));
    return response;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload.orders;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchAllOrders.pending, (state) => {
        // Handle loading state if needed
      })
      .addCase(FetchAllOrders.fulfilled, (state, action) => {
        const querySnapshot = action.payload;
        const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        state.orders = orders;
      })
      .addCase(FetchAllOrders.rejected, (state, action) => {
        // Handle error state if needed
      });
  },
});

export const { setOrders } = orderSlice.actions;

export default orderSlice.reducer;
