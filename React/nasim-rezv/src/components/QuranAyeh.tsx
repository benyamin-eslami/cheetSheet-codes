import style from "./QuranAyeh.module.css";
import QuranTraslateFarsi from "./QuranTraslateFarsi";
import { v4 as uuidv4 } from "uuid";
import { memo, useEffect, useRef, useState } from "react";
import { quranTextEmla } from "../datas/QuranTextEmla";
import { QuranDataSura } from "../datas/quran-metadata";
import { EmailShareButton } from "react-share";
import {
  selectIsPageStartPlaying,
  selectSurahAyehStringGenerator,
  useAppDispatch,
} from "./store/store";
import { pauseAudio, playAudio, playAudioPage } from "./store/features/audio";
import { useSelector } from "react-redux";

interface QuranAyehPropsTypes {
  ayeh: string;
  ayehIndexSpliced: number;
  pageArr: number[];
  nextAyeh: string;
  prevAyeh: string;
  pageIndex: number;
}

const QuranAyeh = ({
  ayeh,
  ayehIndexSpliced,
  pageArr,
  nextAyeh,
  prevAyeh,
  pageIndex,
}: QuranAyehPropsTypes) => {
  const dispatch = useAppDispatch();
  const surahAyehString = useSelector(selectSurahAyehStringGenerator);
  const isPageStartPlaying = useSelector(selectIsPageStartPlaying);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const listAyehElementRef = useRef<HTMLLIElement>(null);

  // generate audio format example 1 => 001
  const ayehFormatGenerator = (number: number) => {
    let result = "";
    let numberLenght = number.toString().length;
    if (numberLenght === 3) {
      result = `${number}`;
    } else if (numberLenght === 2) {
      result = `0${number}`;
    } else if (numberLenght === 1) {
      result = `00${number}`;
    }
    return result;
  };

  let ayehIndex =
    quranTextEmla.findIndex((ayehT, i, arr) => {
      return ayeh === ayehT && arr[i + 1] === nextAyeh
        ? ayeh === ayehT && arr[i + 1] === nextAyeh
        : ayeh === ayehT && arr[i - 1] === prevAyeh;
    }) + 1;

  //number of ayeh  for current surah
  let ayehOrder = 0;

  //calculate surahnumber based on what page we are in
  let surahNumberCheck = QuranDataSura.findIndex((data: any, index) => {
    let start = data[0];
    let end = data[1] + data[0];
    let newcounter: number = -1;

    for (let i = start; i <= end; i++) {
      newcounter++;
      if (ayehIndex === i) {
        ayehOrder = newcounter;
        return index + 1;
      }
    }
  });

  // identifing first ayeh of the page to play when we clicked on page number we want from search part

  useEffect(() => {
    let firstPageAyeh = "0";
    if (+spanRef.current!.id === 0) {
      firstPageAyeh = spanRef.current!.innerHTML;
      isPageStartPlaying &&
        dispatch(
          playAudio({
            surahNumberNew: (surahNumberCheck + 1).toString(),
            ayehNumberNew: firstPageAyeh,
          })
        ) &&
        dispatch(playAudioPage(false));
    }
  }, []);

  //implementing highlited playing ayeh
  useEffect(() => {
    const ayehInnerHtml = spanRef.current!.innerHTML;
    const finalString = `${ayehFormatGenerator(
      surahNumberCheck + 1
    )}${ayehFormatGenerator(+ayehInnerHtml)}`;
    if (finalString === surahAyehString) {
      listAyehElementRef.current!.classList.add(`${style["highlight"]}`);
    } else {
      listAyehElementRef.current!.classList.remove(`${style["highlight"]}`);
    }
  }, [surahAyehString]);

  const audioHandler = () => {
    let surahNumberNew = (surahNumberCheck + 1).toString();
    let ayehNumberNew = ayehOrder.toString();
    dispatch(playAudio({ surahNumberNew, ayehNumberNew }));
    dispatch(pauseAudio(false));
  };

  return (
    <>
      <li
        ref={listAyehElementRef}
        onClick={audioHandler}
        className={style["search__result-list"]}
      >
        <div className={style["search__result"]}>
          <div className={style["search__result-icons"]}>
            <div className={style["aye__container"]}>
              <span
                ref={spanRef}
                id={`${ayehIndexSpliced}`}
                className={style["aye__number"]}
              >
                {ayehOrder}
              </span>
              <svg
                fill="none"
                width="40"
                height="40"
                viewBox="0 0 152 152"
                className={`${style["svg"]} ${style["aye__svg"]}`}
              >
                <path
                  fill="#fff"
                  d="M49.68 12.96c6.68-3.44 13.21-7.17 20-10.36 2-.927 4-1.793 6-2.6 2 .807 4 1.673 6 2.6 6.8 3.2 13.33 6.93 20 10.36 7.15 2.29 14.41 4.27 21.47 6.82 2.047.74 4.063 1.533 6.05 2.38.847 2 1.64 4.017 2.38 6.05 2.55 7.07 4.53 14.32 6.82 21.48 3.44 6.68 7.17 13.21 10.36 20 .927 2 1.793 4 2.6 6-.807 2-1.673 4-2.6 6-3.2 6.8-6.93 13.33-10.36 20-2.29 7.15-4.27 14.41-6.82 21.48a115.945 115.945 0 01-2.38 6.05c-2 .847-4.017 1.64-6.05 2.38-7.07 2.55-14.32 4.53-21.47 6.82-6.68 3.44-13.21 7.17-20 10.36-2 .927-4 1.793-6 2.6-2-.807-4-1.673-6-2.6-6.8-3.2-13.33-6.93-20-10.36-7.15-2.29-14.41-4.27-21.47-6.82a115.945 115.945 0 01-6.05-2.38c-.847-2-1.64-4.017-2.38-6.05-2.55-7.07-4.53-14.32-6.82-21.48-3.44-6.68-7.17-13.21-10.36-20-.927-2-1.793-4-2.6-6 .807-2 1.673-4 2.6-6 3.2-6.8 6.93-13.33 10.36-20 2.29-7.15 4.27-14.41 6.82-21.48.74-2.047 1.533-4.063 2.38-6.05 2-.847 4.017-1.64 6.05-2.38 7.06-2.55 14.33-4.52 21.47-6.82zm26-9.17a116.682 116.682 0 00-7.29 3.31c-2.72 1.34-5.41 2.77-8.09 4.19l5.5 2.37c3.25-1.63 6.54-3.18 9.88-4.57 3.34 1.39 6.63 2.93 9.88 4.57l5.5-2.37c-2.68-1.43-5.37-2.85-8.09-4.19a136.75 136.75 0 00-7.32-3.31h.03zm50.82 21a110.654 110.654 0 00-7.5-2.81c-2.87-1-5.78-1.87-8.68-2.75.73 1.86 1.47 3.72 2.21 5.56 3.46 1.14 6.88 2.38 10.22 3.76 1.38 3.34 2.61 6.76 3.76 10.22l5.56 2.21c-.89-2.9-1.78-5.81-2.75-8.68a143.73 143.73 0 00-2.86-7.46l.04-.05zm21.04 50.87a116.662 116.662 0 00-3.31-7.29c-1.34-2.72-2.77-5.41-4.19-8.09-.8 1.83-1.59 3.67-2.37 5.5 1.63 3.25 3.18 6.54 4.57 9.88-1.39 3.34-2.93 6.63-4.57 9.88.78 1.83 1.58 3.67 2.37 5.5 1.43-2.68 2.85-5.37 4.19-8.09a145.636 145.636 0 003.31-7.29zm-21 50.82a110.494 110.494 0 002.81-7.5c1-2.87 1.87-5.78 2.75-8.68l-5.56 2.21c-1.14 3.46-2.38 6.88-3.76 10.22-3.34 1.38-6.76 2.61-10.22 3.76-.74 1.85-1.48 3.71-2.21 5.56 2.9-.89 5.81-1.78 8.68-2.75a133.45 133.45 0 007.43-2.82h.08zm-50.82 21a116.688 116.688 0 007.29-3.31c2.72-1.34 5.41-2.77 8.09-4.19l-5.56-2.32c-3.25 1.63-6.54 3.18-9.88 4.57-3.34-1.39-6.63-2.93-9.88-4.57l-5.5 2.37c2.68 1.43 5.37 2.85 8.09 4.19 2.4 1.187 4.827 2.29 7.28 3.31l.07-.05zm-50.82-21a110.374 110.374 0 007.5 2.81c2.87 1 5.78 1.87 8.68 2.75-.73-1.86-1.47-3.72-2.21-5.56-3.46-1.14-6.88-2.38-10.22-3.76-1.38-3.34-2.61-6.76-3.76-10.22l-5.56-2.21c.89 2.9 1.78 5.81 2.75 8.68a93.358 93.358 0 002.75 7.51h.07zm-21-50.82a116.694 116.694 0 003.31 7.29c1.34 2.72 2.77 5.41 4.19 8.09.79-1.83 1.59-3.67 2.37-5.5-1.64-3.25-3.18-6.54-4.57-9.88 1.39-3.34 2.93-6.63 4.57-9.88-.78-1.83-1.58-3.67-2.37-5.5-1.43 2.68-2.85 5.37-4.19 8.09a84.845 84.845 0 00-3.43 7.29h.12zm21-50.82a110.494 110.494 0 00-2.81 7.5c-1 2.87-1.87 5.78-2.75 8.68l5.56-2.21c1.14-3.46 2.38-6.88 3.76-10.22 3.34-1.38 6.76-2.61 10.22-3.76.74-1.85 1.48-3.71 2.21-5.56-2.9.89-5.81 1.78-8.68 2.75-2.58.867-5.107 1.807-7.58 2.82h.07zm50.75-13.18c-2.38 1-4.74 2.11-7.08 3.26l6.55 2.84.53-.22.53.22 6.55-2.84c-2.34-1.2-4.7-2.26-7.08-3.26zm45.29 18.76c-2.4-1-4.84-1.86-7.31-2.7.88 2.207 1.757 4.42 2.63 6.64l.53.21.21.53 6.64 2.56c-.85-2.45-1.74-4.89-2.71-7.29l.01.05zm18.75 45.24c-1-2.38-2.11-4.74-3.26-7.08-.94 2.187-1.887 4.37-2.84 6.55l.22.53-.22.53c.953 2.18 1.9 4.363 2.84 6.55 1.11-2.34 2.25-4.7 3.26-7.08zm-18.76 45.29c1-2.4 1.86-4.84 2.7-7.31l-6.64 2.63-.21.53-.53.21a914.367 914.367 0 01-2.63 6.64c2.47-.84 4.92-1.73 7.31-2.7zm-45.28 18.71c2.38-1 4.74-2.11 7.08-3.26l-6.56-2.74-.53.22-.53-.22-6.57 2.79c2.37 1.15 4.72 2.21 7.11 3.21zM30.36 120.9c2.4 1 4.84 1.86 7.31 2.7-.88-2.207-1.757-4.42-2.63-6.64l-.53-.21-.21-.53-6.65-2.56c.89 2.45 1.74 4.89 2.71 7.29v-.05zM11.6 75.66c1 2.38 2.11 4.74 3.26 7.08.94-2.187 1.887-4.37 2.84-6.55l-.22-.53.22-.53c-.953-2.18-1.9-4.363-2.84-6.55-1.15 2.34-2.25 4.7-3.26 7.08zm18.76-45.29c-1 2.4-1.86 4.84-2.7 7.31l6.64-2.63.21-.53.53-.21a914.367 914.367 0 012.63-6.64c-2.47.84-4.91 1.73-7.31 2.7zm45.29-8.61c-6.39-2.87-12.86-5.57-19.28-8.38-1.77.95-3.55 1.89-5.35 2.81-1.92.62-3.84 1.21-5.77 1.8-2.56 6.53-5.22 13-7.71 19.56-6.54 2.49-13 5.16-19.56 7.71-.58 1.92-1.18 3.85-1.8 5.77-.92 1.79-1.86 3.57-2.81 5.35 2.81 6.42 5.51 12.9 8.38 19.28-2.87 6.39-5.57 12.86-8.38 19.28.95 1.77 1.89 3.55 2.81 5.35.62 1.92 1.21 3.84 1.8 5.77 6.53 2.56 13 5.22 19.56 7.71 2.49 6.54 5.16 13 7.71 19.56 1.92.58 3.85 1.18 5.77 1.8 1.79.92 3.57 1.86 5.35 2.81 6.42-2.81 12.89-5.51 19.28-8.38 6.39 2.87 12.86 5.57 19.28 8.38 1.77-.95 3.55-1.89 5.35-2.81 1.92-.62 3.84-1.21 5.77-1.8 2.56-6.53 5.22-13 7.71-19.56 6.54-2.49 13-5.16 19.56-7.71.58-1.92 1.18-3.85 1.8-5.77.92-1.79 1.86-3.57 2.81-5.35-2.81-6.42-5.51-12.9-8.38-19.28 2.87-6.39 5.57-12.86 8.38-19.28-.95-1.77-1.89-3.55-2.81-5.35-.62-1.92-1.21-3.84-1.8-5.77-6.53-2.56-13-5.22-19.56-7.71-2.49-6.54-5.16-13-7.71-19.56-1.92-.58-3.85-1.18-5.77-1.8-1.79-.92-3.57-1.86-5.35-2.81-6.39 2.81-12.89 5.52-19.28 8.39v-.01zM53.1 21.2c7.59 3.32 15.16 6.58 22.55 10.17 7.39-3.59 15-6.85 22.55-10.17 3 7.71 6.07 15.38 8.75 23.14 7.77 2.69 15.43 5.74 23.14 8.75-3.31 7.57-6.55 15.18-10.17 22.57 3.59 7.39 6.85 15 10.17 22.55-7.71 3-15.38 6.07-23.14 8.75-2.69 7.77-5.74 15.43-8.75 23.14-7.59-3.32-15.16-6.58-22.55-10.17-7.39 3.59-15 6.85-22.55 10.17-3-7.71-6.07-15.38-8.75-23.14-7.77-2.69-15.43-5.74-23.14-8.75 3.33-7.55 6.57-15.16 10.16-22.55-3.59-7.39-6.85-15-10.17-22.55 7.71-3 15.38-6.07 23.14-8.75 2.68-7.78 5.73-15.44 8.75-23.15l.01-.01z"
                />
                <path
                  fill="#F6E0AE"
                  d="M75.65 31.38c-7.39-3.59-15-6.85-22.55-10.17-3 7.71-6.07 15.38-8.75 23.14-7.77 2.69-15.43 5.74-23.14 8.75 3.33 7.56 6.57 15.17 10.16 22.56-3.59 7.39-6.85 15-10.17 22.55 7.71 3 15.38 6.07 23.14 8.75 2.69 7.77 5.74 15.43 8.75 23.14 7.59-3.32 15.16-6.58 22.55-10.17 7.39 3.59 15 6.85 22.55 10.17 3-7.71 6.07-15.38 8.75-23.14 7.77-2.69 15.43-5.74 23.14-8.75-3.3-7.55-6.54-15.16-10.16-22.55 3.59-7.39 6.85-15 10.17-22.55-7.71-3-15.38-6.07-23.14-8.75-2.69-7.77-5.74-15.43-8.75-23.14-7.59 3.31-15.16 6.57-22.55 10.16zM51.02 16.19c1.79-.92 3.57-1.86 5.35-2.81 6.42 2.81 12.89 5.51 19.28 8.38 6.39-2.87 12.86-5.57 19.28-8.38 1.77.95 3.55 1.89 5.35 2.81 1.92.62 3.84 1.21 5.77 1.8 2.56 6.53 5.22 13 7.71 19.56 6.54 2.49 13 5.16 19.56 7.71.58 1.92 1.18 3.85 1.8 5.77.92 1.79 1.86 3.57 2.81 5.35-2.81 6.42-5.51 12.9-8.38 19.28 2.87 6.39 5.57 12.86 8.38 19.28-.95 1.77-1.89 3.55-2.81 5.35-.62 1.92-1.21 3.84-1.8 5.77-6.53 2.56-13 5.22-19.56 7.71-2.49 6.54-5.16 13-7.71 19.56-1.92.58-3.85 1.18-5.77 1.8-1.79.92-3.57 1.86-5.35 2.81-6.42-2.81-12.9-5.51-19.28-8.38-6.39 2.87-12.86 5.57-19.28 8.38-1.77-.95-3.55-1.89-5.35-2.81-1.92-.62-3.84-1.21-5.77-1.8-2.56-6.53-5.22-13-7.71-19.56-6.54-2.49-13-5.16-19.56-7.71-.58-1.92-1.18-3.85-1.8-5.77-.92-1.79-1.86-3.57-2.81-5.35 2.81-6.42 5.51-12.9 8.38-19.28-2.87-6.39-5.57-12.86-8.38-19.28.95-1.77 1.89-3.55 2.81-5.35.62-1.92 1.21-3.84 1.8-5.77 6.53-2.56 13-5.22 19.56-7.71 2.49-6.54 5.16-13 7.71-19.56 1.92-.58 3.85-1.18 5.76-1.8h.01z"
                />
                <path
                  fill="#00B3A0"
                  d="M75.65 9.1c-3.34 1.39-6.63 2.93-9.88 4.57l-5.5-2.37c2.68-1.43 5.37-2.85 8.09-4.19a120.29 120.29 0 017.29-3.31 116.656 116.656 0 017.29 3.31c2.72 1.34 5.41 2.77 8.09 4.19l-5.49 2.36c-3.27-1.63-6.56-3.17-9.89-4.56zm47.06 19.5c-3.34-1.38-6.76-2.61-10.22-3.76-.74-1.85-1.48-3.71-2.21-5.56 2.9.89 5.81 1.78 8.68 2.75 2.547.86 5.047 1.797 7.5 2.81a110.334 110.334 0 012.81 7.5c1 2.87 1.87 5.78 2.75 8.68l-5.56-2.21c-1.14-3.45-2.37-6.87-3.75-10.21zm19.49 47.06c-1.39-3.34-2.93-6.63-4.57-9.88.78-1.83 1.58-3.67 2.37-5.5 1.43 2.68 2.85 5.37 4.19 8.09a120.268 120.268 0 013.31 7.29 116.688 116.688 0 01-3.31 7.29c-1.34 2.72-2.77 5.41-4.19 8.09-.8-1.83-1.59-3.67-2.37-5.5 1.64-3.25 3.19-6.54 4.57-9.88zm-19.49 47.06c1.38-3.34 2.61-6.76 3.76-10.22l5.56-2.21c-.89 2.9-1.78 5.81-2.75 8.68a121.346 121.346 0 01-2.81 7.5 110.494 110.494 0 01-7.5 2.81c-2.87 1-5.78 1.87-8.68 2.75.73-1.86 1.47-3.72 2.21-5.56 3.45-1.13 6.87-2.37 10.21-3.75zm-47.06 19.5c3.34-1.39 6.63-2.93 9.88-4.57l5.5 2.37c-2.68 1.43-5.37 2.85-8.09 4.19a120.268 120.268 0 01-7.29 3.31 116.688 116.688 0 01-7.29-3.31c-2.72-1.34-5.41-2.77-8.09-4.19l5.5-2.37c3.25 1.64 6.54 3.18 9.88 4.57zm-47.11-19.5c3.34 1.38 6.76 2.61 10.22 3.76.74 1.85 1.48 3.71 2.21 5.56-2.9-.89-5.81-1.78-8.68-2.75a121.49 121.49 0 01-7.5-2.81 110.654 110.654 0 01-2.81-7.5c-1-2.87-1.87-5.78-2.75-8.68l5.56 2.21c1.18 3.45 2.41 6.87 3.75 10.21zM9.09 75.66c1.39 3.34 2.93 6.63 4.57 9.88-.78 1.83-1.58 3.67-2.37 5.5-1.43-2.68-2.85-5.37-4.19-8.09a120.318 120.318 0 01-3.31-7.29 116.656 116.656 0 013.31-7.29c1.34-2.72 2.77-5.41 4.19-8.09.79 1.83 1.59 3.67 2.37 5.5-1.64 3.25-3.18 6.54-4.57 9.88zM28.54 28.6c-1.38 3.34-2.61 6.76-3.76 10.22l-5.56 2.21c.89-2.9 1.78-5.81 2.75-8.68.86-2.547 1.797-5.047 2.81-7.5a110.534 110.534 0 017.5-2.81c2.87-1 5.78-1.87 8.68-2.75-.73 1.86-1.47 3.72-2.21 5.56-3.41 1.13-6.83 2.37-10.21 3.75z"
                />
                <path
                  fill="#FFB312"
                  d="M75.65 17.48l-.53.22-6.58-2.83c2.34-1.15 4.7-2.24 7.08-3.26 2.38 1 4.74 2.11 7.08 3.26l-6.53 2.79-.52-.18zm41.13 17.04l-.53-.21a914.367 914.367 0 00-2.63-6.64c2.47.84 4.91 1.74 7.31 2.7 1 2.4 1.86 4.84 2.7 7.31l-6.64-2.63-.21-.53zm17.04 41.14l-.22-.53c.953-2.18 1.9-4.363 2.84-6.55 1.15 2.34 2.24 4.7 3.26 7.08-1 2.38-2.11 4.74-3.26 7.08-.94-2.187-1.887-4.37-2.84-6.55l.22-.53zm-17.04 41.14l.21-.53 6.65-2.61c-.84 2.47-1.74 4.91-2.7 7.31-2.4 1-4.84 1.86-7.31 2.7.88-2.207 1.757-4.42 2.63-6.64l.52-.23zm-41.13 17.04l.53-.22 6.55 2.84c-2.34 1.15-4.7 2.24-7.08 3.26-2.38-1-4.74-2.11-7.08-3.26l6.55-2.84.53.22zM34.54 116.8l.53.21a914.38 914.38 0 002.63 6.64c-2.47-.84-4.91-1.74-7.31-2.7-1-2.4-1.86-4.84-2.7-7.31l6.64 2.63.21.53zM17.47 75.66l.22.53c-.953 2.18-1.9 4.363-2.84 6.55-1.15-2.34-2.24-4.7-3.26-7.08 1-2.38 2.11-4.74 3.26-7.08a1138.7 1138.7 0 002.84 6.55l-.22.53zm17.07-41.14l-.21.53-6.68 2.61c.84-2.47 1.74-4.91 2.7-7.31 2.4-1 4.84-1.86 7.31-2.7-.88 2.207-1.757 4.42-2.63 6.64l-.49.23z"
                />
              </svg>
            </div>
            <div className={style["action-section"]}>
              <svg
                onClick={() => {
                  navigator.clipboard.writeText(ayeh).then(() => {
                    setIsCopied(true);
                    setTimeout(() => {
                      setIsCopied(false);
                    }, 1500);
                  });
                }}
                width="25"
                height="30"
                viewBox="0 0 30 24"
                className={`${style["svg"]} ${style["more-svg"]}`}
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="square"
                  stroke-miterlimit="10"
                  stroke-width="1.5"
                  d="M14.797 3.587H1V19.97h13.797V3.587z"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="square"
                  stroke-miterlimit="10"
                  stroke-width="1.5"
                  d="M2.725 1h14.659v17.246M4.448 7.898h6.899m-6.899 3.45h6.899m-6.899 3.449h3.45"
                />
              </svg>

              <EmailShareButton url={`/pages/${pageIndex}`} title="share">
                <svg
                  width="40"
                  height="25"
                  viewBox="0 0 30 24"
                  className={`${style["svg"]} ${style["more-svg"]}`}
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M6.978 9.542l6.591-3.418m-6.591 6.334l6.591 3.418m-9.402-1.709a3.167 3.167 0 100-6.334 3.167 3.167 0 000 6.334zm12.214-6.334a3.167 3.167 0 100-6.333 3.167 3.167 0 000 6.333zm0 12.667a3.167 3.167 0 100-6.333 3.167 3.167 0 000 6.333z"
                  />
                </svg>
              </EmailShareButton>
            </div>
          </div>
          <div className={style["search__result-context"]}>
            <p
              className={`${style["quran__text"]} ${style["quran__text-weight"]}`}
            >
              {ayeh}
            </p>
            <QuranTraslateFarsi
              pageArr={pageArr}
              key={uuidv4()}
              ayehIndexSpliced={ayehIndexSpliced}
            />
          </div>
        </div>
      </li>
      {isCopied && <span className={style["copied"]}>copied</span>}
    </>
  );
};

export default memo(QuranAyeh);
