import { QuranDataSura, QuranDataPage } from "./quran-metadata";
import { quranTextEmla } from "./QuranTextEmla";
export let pageSplitNumberArray: any = [];
export let surahFirstAyeh: any = [];
export let newTextEmla: any = [];

QuranDataSura.map((data, index, quranMetaData) => {
  let pageSplitNumber: any;

  QuranDataPage.map((pageInfo, i, arrayPage) => {
    let j = i + 1;
    const pageStartAyeh =
      +quranMetaData[arrayPage[i][0] - 1][0] + arrayPage[i][1];
    const pageEndAyeh =
      j < arrayPage.length &&
      +quranMetaData[arrayPage[j][0] - 1][0] + arrayPage[j][1];
    pageSplitNumber = +pageEndAyeh - pageStartAyeh;
    pageSplitNumberArray.push(pageSplitNumber);
  });
});
pageSplitNumberArray = pageSplitNumberArray.map((elem: any, index: any) =>
  pageSplitNumberArray.slice(0, index + 1).reduce((a: any, b: any) => a + b)
);

pageSplitNumberArray.unshift(0);

newTextEmla = [...quranTextEmla];

QuranDataSura.map((data) => {
  const start = +data[0];
  const surahName = data[4];
  surahFirstAyeh.push({ surahName, start: quranTextEmla[start] });
});

//it shows what is the beggining page of each surah(by index)
// I need this data and I extract it from this website "http://www.shahrequran.ir/thread569-11.html#post6027"
// with running this code in console in site above we have this array result:
// function getColumn(table_id, col) {
//   let tab = document.getElementById(table_id);
//   let n = tab.rows.length;
//   let i, tr, td;

//   // First check that col is not less then 0
//   if (col < 0) {
//     return null;
//   }
//   const arr = [];

//   for (i = 1; i < n; i++) {
//     tr = tab.rows[i];
//     if (tr.cells.length > col) {
//       td = tr.cells[col];
//       +td.innerText.trim() && arr.push(+td.innerText.trim());
//     }
//   }
//   return arr;
// }

// let pagesArr = [];
// for (let i = 2; i <= 30; i = i + 4) {
//   let arr = getColumn("table", i);
//   arr.forEach((num) => pagesArr.push(num));
// }

// SurahPages is pagesArr

export const surahPages = [
  1, 2, 50, 77, 106, 128, 151, 177, 187, 208, 221, 235, 249, 255, 262, 267, 282,
  293, 305, 312, 322, 332, 342, 350, 359, 367, 377, 385, 396, 404, 411, 415,
  418, 428, 434, 440, 446, 453, 458, 467, 477, 483, 489, 496, 499, 502, 507,
  511, 515, 518, 520, 523, 526, 528, 531, 534, 537, 542, 545, 549, 551, 553,
  554, 556, 558, 560, 562, 564, 566, 568, 570, 572, 574, 575, 577, 578, 580,
  582, 583, 585, 586, 587, 587, 589, 590, 591, 591, 592, 593, 594, 595, 595,
  596, 596, 597, 597, 598, 598, 599, 599, 600, 600, 601, 601, 601, 602, 602,
  602, 603, 603, 603, 604, 604, 604,
];
