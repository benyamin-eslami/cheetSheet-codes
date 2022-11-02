import styles from "./Setting.module.css";
import Gharies from "./Gharies";
import Translators from "./Translators";
import TextSettings from "./TextSettings";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectFontFamily, selectFontSize } from "../store/store";

const Setting = () => {
  const exampleText = useRef<HTMLParagraphElement>(null);
  const fontSize = useSelector(selectFontSize);
  const fontFamily = useSelector(selectFontFamily);

  useEffect(() => {
    exampleText.current!.style.fontFamily = fontFamily;
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
    exampleText.current!.style.fontSize = fontSizeNumber;
  }, [fontSize]);

  return (
    <>
      <section className={`${styles["search-wrapper"]} ${styles["rtl"]}`}>
        <section className={styles["setting__wrapper"]}>
          <p className={styles["setting-title"]}>انتخاب ترجمه</p>

          <Translators />

          <p className={styles["setting-title"]}>انتخاب قاری</p>

          <Gharies />
          <p className={styles["setting-title"]}>تنظیمات متون ترجمه</p>

          <TextSettings />
          <div className={styles["examole__translate"]}>
            <p className={styles["examole__translate-title"]}>نمونه:</p>
            <p ref={exampleText} className={styles["examole__translate-bio"]}>
              و آنان كه بدانچه به سوى تو فرود آمده، و به آنچه پيش از تو نازل شده
              است، ايمان مى آورند؛ و آنانند كه به آخرت يقين دارند.
            </p>
          </div>
        </section>
      </section>
    </>
  );
};

export default Setting;
