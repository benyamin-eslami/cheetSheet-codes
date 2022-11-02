import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface settingInitialStateInitTypes {
  translator: string;
  fontFamily: string;
  fontSize: string;
}
const settingInitialState = {
  translator: "fooladvand",
  fontFamily: "iranSans",
  fontSize: "average",
};

const settingSlice = createSlice({
  name: "setting",
  initialState: settingInitialState,
  reducers: {
    translatorTextChangor(state, action: PayloadAction<string | null>) {
      state.translator = action.payload ? action.payload : "fooladvand";
    },
    translateTextFontFamilyChangor(
      state,
      action: PayloadAction<string | null>
    ) {
      state.fontFamily = action.payload ? action.payload : "iranSans";
    },
    translateTextFontSizeChangor(state, action: PayloadAction<string | null>) {
      state.fontSize = action.payload ? action.payload : "average";
    },
  },
});

export const {
  translatorTextChangor,
  translateTextFontFamilyChangor,
  translateTextFontSizeChangor,
} = settingSlice.actions;

export default settingSlice.reducer;
