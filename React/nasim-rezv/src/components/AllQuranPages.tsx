import style from "./AllQuranPages.module.css";
import nextPageImg from "../assets/img/next-pngrepo-com.png";
import backPageImg from "../assets/img/back-pngrepo-com.png";
import { QuranDataSura } from "../datas/quran-metadata";
import { quranTextEmla } from "../datas/QuranTextEmla";
import QuranAyeh from "./QuranAyeh";
import { v4 as uuidv4 } from "uuid";
import { pageSplitNumberArray } from "../datas/alllQuranPagesLogic";
import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

const AllQuranPages = () => {
  let surahRefs = useRef<HTMLDivElement[]>([]);

  surahRefs.current = [];

  let { id }: any = useParams();
  let { surahNumberSearch }: any = useParams();

  //we need to have ref for every ayeh
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !surahRefs.current.includes(el)) {
      surahRefs.current.push(el);
    }
    surahRefs.current.forEach((element: any) => {
      if (element.id == surahNumberSearch) {
        window.scrollTo({
          top: element!.offsetTop,
          behavior: "smooth",
        });
      }
    });
  };

  id = !id ? 0 : +id - 1; //0=> start page of quran
  const [prev, setPrevNumber] = useState<number>(+id); //prev => current page number
  const [next, setNextNumber] = useState<number>(+id + 2);

  const pageArr: number[] = pageSplitNumberArray.slice(prev, next);
  //pages index for start and end of surah

  const quranTextEmlaSliced = quranTextEmla.slice(pageArr[0], pageArr[1]);
  //extracting indexex of ayeh

  const nextChangeHandler = () => {
    if (next < pageSplitNumberArray.length && prev < 603) {
      setPrevNumber((num) => num + 1);
      setNextNumber((num) => num + 1);
    }
  };
  const prevChangeHandler = () => {
    if (prev > 0) {
      setPrevNumber((num) => num - 1);
      setNextNumber((num) => num - 1);
    }
  };

  return (
    <>
      <section className={style["search-wrapper"]}>
        <div className={style["inner-search-wrapper"]}>
          <div
            onClick={prevChangeHandler}
            className={style["prev-arrow__wrapper"]}
          >
            <img
              className={style["arrow-img"]}
              src={backPageImg}
              onClick={prevChangeHandler}
            />
          </div>
          <div
            onClick={nextChangeHandler}
            className={style["next-arrow__wrapper"]}
          >
            <img
              className={style["arrow-img"]}
              src={nextPageImg}
              onClick={nextChangeHandler}
            />
          </div>
          <ul key={uuidv4()} className={style["search__result-wrapper"]}>
            <div className={style["quran__badge-container"]}>
              <span className={style["search__result-list-badge"]}>
                <span>{prev + 1}</span>صفحه
              </span>
            </div>
            {quranTextEmlaSliced.map((ayeh: string, i: number, arr) => {
              return (
                <React.Fragment key={uuidv4()}>
                  {QuranDataSura.map((data, index) => {
                    const start = +data[0];

                    const surahNumber = index + 1;
                    const surahName = data[4];

                    const cts = arr[i + 3] ? arr[i + 3] : arr[i + 1]; //cts stands for condition
                    const ctsNum = arr[i + 3] ? 3 : 1;

                    if (
                      ayeh === quranTextEmla[start] &&
                      cts === quranTextEmla[start + ctsNum]
                    ) {
                      return (
                        <div
                          ref={addToRefs}
                          id={`${surahNumber}`}
                          key={index}
                          className={style["quran__banner-container"]}
                        >
                          <p
                            className={`${style["quran__text"]} ${style["quran__title-text-weight"]}`}
                          >
                            {surahName}
                          </p>
                          <p>
                            <span>{surahNumber}</span>سوره
                          </p>
                          <p>{data[7] === "Meccan" ? "مکی" : "مدنی"}</p>
                          {index + 1 !== 9 && index + 1 !== 1 && (
                            <p>بسم الله الرحمن الرحیم</p>
                          )}
                        </div>
                      );
                    }
                  })}
                  <QuranAyeh
                    pageArr={pageArr}
                    key={uuidv4()}
                    ayeh={ayeh}
                    nextAyeh={arr[i + 1]}
                    prevAyeh={arr[i - 1]}
                    ayehIndexSpliced={i}
                    pageIndex={prev + 1}
                  />
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default AllQuranPages;
