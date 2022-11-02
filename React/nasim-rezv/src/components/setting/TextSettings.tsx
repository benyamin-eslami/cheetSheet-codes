import { ChangeEvent, useState } from "react";
import {
  translateTextFontFamilyChangor,
  translateTextFontSizeChangor,
} from "../store/features/setting";
import { useAppDispatch } from "../store/store";
import styles from "./TextSettings.module.css";

const TextSettings = ({
  closeTextSettingHandler,
  isShowTextSetting,
}: {
  closeTextSettingHandler?: (isClose: boolean) => void;
  isShowTextSetting?: boolean;
}) => {
  const [fontName, setFontName] = useState<any>(
    localStorage.getItem("fontname")
      ? localStorage.getItem("fontname")
      : "iranSans"
  );
  const [fontSize, setfontSize] = useState<any>(
    localStorage.getItem("fontsize")
      ? localStorage.getItem("fontsize")
      : "average"
  );

  const dispatch = useAppDispatch();
  const fontFamilyChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFontName(event.target.value);
      localStorage.setItem("fontname", event.target.value);
      dispatch(translateTextFontFamilyChangor(event.target.value));
    }
  };
  const fontSizeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setfontSize(event.target.value);
      localStorage.setItem("fontsize", event.target.value);
      dispatch(translateTextFontSizeChangor(event.target.value));
    }
  };
  const [isClose, setIsClose] = useState<boolean>(false);
  closeTextSettingHandler && closeTextSettingHandler(isClose);
  return (
    <div
      className={`${styles["translate__sec"]} ${styles["translate__text-setting"]}`}
    >
      {isShowTextSetting && (
        <button
          className={styles["close__btn"]}
          onClick={() => setIsClose(true)}
        >
          بستن
        </button>
      )}

      <p className={styles["translate__option-title"]}>اندازه متن:</p>
      <div className={styles["translate-size"]}>
        <label className={styles["translate-label"]} htmlFor="big">
          بزرگ
          <input
            onChange={fontSizeChangeHandler}
            name="translate-size"
            id="big"
            type="radio"
            value={"big"}
            checked={fontSize === "big"}
          />
        </label>
        <label className={styles["translate-label"]} htmlFor="average">
          متوسط
          <input
            onChange={fontSizeChangeHandler}
            name="translate-size"
            id="average"
            type="radio"
            value={"average"}
            checked={fontSize === "average"}
          />
        </label>
        <label className={styles["translate-label"]} htmlFor="small">
          کوچک
          <input
            onChange={fontSizeChangeHandler}
            name="translate-size"
            id="small"
            type="radio"
            value={"small"}
            checked={fontSize === "small"}
          />
        </label>
      </div>
      <p className={styles["translate__option-title"]}>فونت:</p>
      <div className={styles["translate-size"]}>
        <label className={styles["translate-label"]} htmlFor="iranSans">
          ایران سنس
          <input
            onChange={fontFamilyChangeHandler}
            name="translate-font"
            id="iranSans"
            type="radio"
            value={"iranSans"}
            checked={fontName === "iranSans"}
          />
        </label>
        <label className={styles["translate-label"]} htmlFor="yekan">
          یکان
          <input
            onChange={fontFamilyChangeHandler}
            name="translate-font"
            id="yekan"
            type="radio"
            value={"yekan"}
            checked={fontName === "yekan"}
          />
        </label>
      </div>
    </div>
  );
};

export default TextSettings;
