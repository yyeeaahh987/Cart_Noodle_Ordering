import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Meat: null,
  Vegetable: null,
  Drink: null,
  price: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.Meat = action.payload.Meat;
      state.Vegetable = action.payload.Vegetable;
      state.Drink = action.payload.Drink;
      state.price = action.payload.price;
    },
    removeProduct: (state) => {
      state.Meat = null;
      state.Vegetable = null;
      state.Drink = null;
      state.price = null;
      localStorage.clear();
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
