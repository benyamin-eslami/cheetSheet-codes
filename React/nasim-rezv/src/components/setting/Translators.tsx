import { ChangeEvent, useState } from "react";
import fooladvandImg from "../../assets/img/translator-fooladvand.0c7065d.png";
import makaremImg from "../../assets/img/translator-makarem.17a2064.png";
import { translatorTextChangor } from "../store/features/setting";
import { useAppDispatch } from "../store/store";
import styles from "./Translators.module.css";
const Translators = ({
  closeTranslatorHandler,
  isShowTranslatorPart,
}: {
  closeTranslatorHandler?: (isclose: boolean) => void;
  isShowTranslatorPart?: boolean;
}) => {
  const [translatorName, setTranslatorName] = useState<any>(
    localStorage.getItem("translator")
      ? localStorage.getItem("translator")
      : "fooladvand"
  );

  const dispatch = useAppDispatch();
  const translateChangerHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setTranslatorName(event.target.value);
      localStorage.setItem("translator", event.target.value);
      dispatch(translatorTextChangor(event.target.value));
    }
  };
  const [isClose, setIsClose] = useState<boolean>(false);
  closeTranslatorHandler && closeTranslatorHandler(isClose);
  return (
    <div className={styles["translate__sec"]}>
      {isShowTranslatorPart && (
        <div className="close__wrapper">
          <button
            className={styles["close__btn-red"]}
            onClick={() => setIsClose(true)}
          >
            بستن
          </button>
        </div>
      )}

      <div>
        <p>انتخاب ترجمه</p>
        <label className={styles["translate-label"]} htmlFor="fooladvand">
          <input
            onChange={translateChangerHandler}
            name="translate"
            type="radio"
            id="fooladvand"
            value={"fooladvand"}
            checked={translatorName === "fooladvand"}
          />
          <div className={styles["translate-info__sec"]}>
            <p>فولادوند</p>
            <img src={fooladvandImg} alt="fooladvand" />
          </div>
        </label>
        <label className={styles["translate-label"]} htmlFor="makarem">
          <input
            onChange={translateChangerHandler}
            name="translate"
            id="makarem"
            type="radio"
            value={"makarem"}
            checked={translatorName === "makarem"}
          />
          <div className={styles["translate-info__sec"]}>
            <p>مکارم شیرازی</p>
            <img src={makaremImg} alt="makarem" />
          </div>
        </label>
      </div>
    </div>
  );
};

export default Translators;
