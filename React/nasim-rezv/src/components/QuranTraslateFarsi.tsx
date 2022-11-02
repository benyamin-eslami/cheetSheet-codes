import styles from "./QuranTraslateFarsi.module.css";
import { quranTranslateAnsarian } from "../datas/quran-translate.fa.ansarian";
import { qurnaTranslateMakarem } from "../datas/quran-translate.fa.makarem";
import { memo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  selectFontFamily,
  selectFontSize,
  selectTranslator,
} from "./store/store";

interface QuranTraslateFarsiPropsTypes {
  ayehIndexSpliced: number;
  pageArr: number[];
}
const QuranTraslateFarsi = ({
  ayehIndexSpliced,
  pageArr,
}: QuranTraslateFarsiPropsTypes) => {
  const translator = useSelector(selectTranslator);
  const translatedText = useRef<HTMLParagraphElement>(null);
  const fontSize = useSelector(selectFontSize);
  const fontFamily = useSelector(selectFontFamily);

  useEffect(() => {
    translatedText.current!.style.fontFamily = fontFamily;
  }, [fontFamily]);
  useEffect(() => {
    let fontSizeNumber = "1rem";
    if (fontSize === "small") {
      fontSizeNumber = "0.8rem";
    } else if (fontSize === "average") {
      fontSizeNumber = "1rem";
    } else {
      fontSizeNumber = "1.15rem";
    }
    translatedText.current!.style.fontSize = fontSizeNumber;
  }, [fontSize]);

  const selectedTranslator =
    translator === "fooladvand"
      ? quranTranslateAnsarian
      : qurnaTranslateMakarem;

  const quranTextTranslatedSliced = selectedTranslator.slice(
    pageArr[0],
    pageArr[1]
  );

  return (
    <p ref={translatedText} className={styles["translate__text"]}>
      {quranTextTranslatedSliced[ayehIndexSpliced]}
    </p>
  );
};

export default memo(QuranTraslateFarsi);
