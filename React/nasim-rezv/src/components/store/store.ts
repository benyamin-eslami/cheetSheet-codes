import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./features/audio";
import settingReducer from "./features/setting";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { audio: audioReducer, setting: settingReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const selectAudioSrc = (state: RootState) =>
  state.audio.audioGenerator();
export const selectIsPlayAudioPage = (state: RootState) =>
  state.audio.playAudioPage;
export const selectIsIsPauesed = (state: RootState) => state.audio.isPauesed;
export const selectIsPageStartPlaying = (state: RootState) =>
  state.audio.isPageStartPlaying;
export const selectSurahAyehStringGenerator = (state: RootState) =>
  state.audio.surahAyehStringGenerator();

export const selectTranslator = (state: RootState) => state.setting.translator;
export const selectFontFamily = (state: RootState) => state.setting.fontFamily;
export const selectFontSize = (state: RootState) => state.setting.fontSize;
