import { ChangeEvent, useState } from "react";
import basfar from "../../assets/img/basfar.jpg";
import menshavi from "../../assets/img/menshavi.png";
import styles from "./Gharies.module.css";
import { ghariAudioChangeHandler } from "../store/features/audio";
import { useAppDispatch } from "../store/store";

const Gharies = ({
  closeGhariHandler,
  isShowGhariPart,
}: {
  closeGhariHandler?: (isClose: boolean) => void;
  isShowGhariPart?: boolean;
}) => {
  const [ghariName, setGhariName] = useState<any>(
    localStorage.getItem("ghari")
      ? localStorage.getItem("ghari")
      : "Menshawi_16kbps"
  );

  const dispatch = useAppDispatch();
  const ghariChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setGhariName(event.target.value);
      localStorage.setItem("ghari", event.target.value);
      dispatch(ghariAudioChangeHandler(event.target.value));
    }
  };

  const [isClose, setIsClose] = useState<boolean>(false);
  closeGhariHandler && closeGhariHandler(isClose);
  return (
    <div className={styles["translate__sec"]}>
      {isShowGhariPart && (
        <div>
          <button
            className={styles["close__btn"]}
            onClick={() => setIsClose(true)}
          >
            بستن
          </button>
        </div>
      )}

      <div>
        <p> انتخاب قاری</p>

        <label className={styles["translate-label"]} htmlFor="menshavi">
          <input
            onChange={ghariChangeHandler}
            name="ghari"
            id="menshavi"
            type="radio"
            value="Menshawi_16kbps"
            checked={ghariName === "Menshawi_16kbps"}
          />
          <div className={styles["translate-info__sec"]}>
            <p>منشاوی</p>
            <img src={menshavi} alt="fooladvand" />
          </div>
        </label>
        <label
          className={styles["translate-label"]}
          htmlFor="Abdullah_Basfar_32kbps"
        >
          <input
            onChange={ghariChangeHandler}
            name="ghari"
            id="Abdullah_Basfar_32kbps"
            type="radio"
            value="Abdullah_Basfar_32kbps"
            checked={ghariName === "Abdullah_Basfar_32kbps"}
          />
          <div className={styles["translate-info__sec"]}>
            <p>عبد الله بن علي بصفر</p>
            <img src={basfar} alt="makarem" />
          </div>
        </label>
      </div>
    </div>
  );
};

export default Gharies;
