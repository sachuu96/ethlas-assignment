import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { ratings: [], currentRating: 0 };

export const shipSlice = createSlice({
  name: "ship",
  initialState: initialStateValue,
  reducers: {
    setRating: (state, { payload }) => {
      return {
        ...state,
        ratings: payload.ratings,
      };
    },

    updateRating: (state, { payload }) => {
      let updatedRating = state.ratings.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            ratings: payload.rating,
          };
        }
        return item;
      });
      return {
        ...state,
        ratings: [...updatedRating],
      };
    },

    getCurrentShipRating: (state, { payload }) => {
      let selectedRating = 0;
      state.ratings.map((item) => {
        if (item.id === payload.id) {
          selectedRating = item.ratings;
        }
      });
      console.log("selectedRating", selectedRating);
      console.log("payload", payload);
      return {
        ...state,
        currentRating: selectedRating[0].ratings,
      };
    },
  },
});

export const { setRating, updateRating, getCurrentShipRating } =
  shipSlice.actions;

export default shipSlice.reducer;
