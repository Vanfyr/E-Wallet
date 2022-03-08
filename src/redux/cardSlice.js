import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRandomUser = createAsyncThunk(
  "card/fetchRandomUser",
  async () => {
    return fetch(`https://randomuser.me/api/`)
      .then((response) => response.json())
      .then((data) => data.results[0]);
  }
);

const initialState = {
  activeObject: null,
  loading: false,
  error: false,
  cardList: [],
  cardInformation: [
    {
      cardName: "Random",
      cardNumber: "1234567891011121",
      cardMonth: "12",
      cardYear: "21",
      ccv: "111",
      bankName: "Visa",
      cardStateActive: false,
    },
  ],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addNewCard: (state, action) => {
      state.cardInformation = state.cardInformation.concat(action.payload);
    },
  },
  extraReducers: {
    [fetchRandomUser.pending]: (state) => {
      state.status = "loading...";

      console.log(state.status);
    },

    [fetchRandomUser.fulfilled]: (state, action) => {
      state.status = "success";
      const { first, last } = action.payload.name;
      let wholeName = first + " " + last;
      for (let i = 0; i < state.cardInformation.length; i++) {
        state.cardInformation[i].cardName = wholeName.toUpperCase();
      }
    },

    [fetchRandomUser.rejected]: (state) => {
      state.status = "rejected";
      console.log(state.status);
    },
  },
});
export const { addNewCard } = cardSlice.actions;

export default cardSlice.reducer;
