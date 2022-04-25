import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { details: null };

export const shipSlice = createSlice({
  name: "ship",
  initialState: initialStateValue,
  reducers: {
    setDetails: (state, { payload }) => {
      return {
        ...state,
        details: payload.details,
      };
    },

    setRatings: (state, { payload }) => {
      return {
        ...state,
        details: {
          ...state.details,
          rating: payload.rating,
        },
      };
    },
  },
});

export const { setDetails, setRatings } = shipSlice.actions;

export default shipSlice.reducer;
