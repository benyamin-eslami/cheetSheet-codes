import { Link } from "react-router-dom";
import textIcon from "../assets/img/letter-t-pngrepo-com.png";
import close from "../assets/img/close.png";
import play from "../assets/img/play-img.png";
import pause from "../assets/img/pause-img.png";
import haram from "../assets/img/haram2.7b1ffc7.png";
import basfar from "../assets/img/basfar.jpg";
import menshavi from "../assets/img/menshavi.png";
import fooladvandImg from "../assets/img/translator-fooladvand.0c7065d.png";
import makaremImg from "../assets/img/translator-makarem.17a2064.png";
import upArrow from "../assets/img/up-arrow.png";
import styles from "./audiopart.module.css";
import Gharies from "./setting/Gharies";
import { useSelector } from "react-redux";
import {
  selectAudioSrc,
  selectTranslator,
  useAppDispatch,
} from "./store/store";
import { useEffect, useRef, useState } from "react";
import {
  ghariAudioChangeHandler,
  pauseAudio,
  playNextAudio,
} from "./store/features/audio";
import { selectIsIsPauesed } from "./store/store";
import Translators from "./setting/Translators";
import TextSettings from "./setting/TextSettings";
import {
  translateTextFontFamilyChangor,
  translateTextFontSizeChangor,
  translatorTextChangor,
} from "./store/features/setting";

const AudioPart = () => {
  const dispatch = useAppDispatch();

  //get ghari aznd translator status in initial render
  useEffect(() => {
    const ghariNameStorage = localStorage.getItem("ghari")
      ? localStorage.getItem("ghari")
      : "Menshawi_16kbps";
    dispatch(ghariAudioChangeHandler(ghariNameStorage));

    const translatorNameStorage = localStorage.getItem("translator")
      ? localStorage.getItem("translator")
      : "fooladvand";

    dispatch(translatorTextChangor(translatorNameStorage));

    const fontNameStorage = localStorage.getItem("fontname")
      ? localStorage.getItem("fontname")
      : "iranSans";
    dispatch(translateTextFontFamilyChangor(fontNameStorage));

    const fontSizeStorage = localStorage.getItem("fontsize")
      ? localStorage.getItem("fontsize")
      : "average";

    dispatch(translateTextFontSizeChangor(fontSizeStorage));
  }, []);

  const [isShowTranslatorPart, setIsShowTranslatorPart] =
    useState<boolean>(false);
  const [isShowGhariPart, setIsShowGhariPart] = useState<boolean>(false);
  const [isShowTextSetting, setIsShowTextSetting] = useState<boolean>(false);
  const audioSrcSelect = useSelector(selectAudioSrc);
  const isPauesed = useSelector(selectIsIsPauesed);
  const translatorName = useSelector(selectTranslator);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioPartSection = useRef<HTMLElement>(null);
  const ShowAudioRef = useRef<HTMLLIElement>(null);

  const closeAudioPartHandler = () => {
    audioPartSection.current!.style.display = "none";
    audioRef.current?.pause();
    dispatch(pauseAudio(true));
    ShowAudioRef.current!.style.display = "flex";
  };
  const showAudioPartHandler = () => {
    ShowAudioRef.current!.style.display = "none";

    audioPartSection.current!.style.display = "block";
  };

  const playPauseHandler = () => {
    if (audioRef.current?.paused) {
      dispatch(pauseAudio(false));
      audioRef.current?.play();
    } else {
      dispatch(pauseAudio(true));
      audioRef.current?.pause();
    }
  };

  const audioFinishedHandler = () => {
    dispatch(playNextAudio());
  };

  const closeGhariHandler = (isClose: boolean) => {
    isClose && setIsShowGhariPart(false);
  };
  const closeTranslatorHandler = (isClose: boolean) => {
    isClose && setIsShowTranslatorPart(false);
  };
  const closeTextSettingHandler = (isClose: boolean) => {
    isClose && setIsShowTextSetting(false);
  };

  return (
    <>
      <li
        ref={ShowAudioRef}
        onClick={showAudioPartHandler}
        className={styles["show__wrapper"]}
      >
        <p>نمایش پنل مدیریت صوت</p>
        <img
          src={upArrow}
          alt="show-audio-part"
          className={styles["show-img"]}
        />
      </li>
      <section ref={audioPartSection} className={styles["nav__wrapper"]}>
        <audio
          onEnded={audioFinishedHandler}
          ref={audioRef}
          autoPlay
          src={audioSrcSelect}
        ></audio>
        <nav>
          <li
            onClick={closeAudioPartHandler}
            className={styles["close__wrapper"]}
          >
            <img className={styles["close"]} src={close} alt="text-setting" />
          </li>
          {isShowGhariPart && (
            <Gharies
              isShowGhariPart={isShowGhariPart}
              closeGhariHandler={closeGhariHandler}
            />
          )}
          {isShowTranslatorPart && (
            <Translators
              isShowTranslatorPart={isShowTranslatorPart}
              closeTranslatorHandler={closeTranslatorHandler}
            />
          )}
          {isShowTextSetting && (
            <TextSettings
              isShowTextSetting={isShowTextSetting}
              closeTextSettingHandler={closeTextSettingHandler}
            />
          )}

          <ul>
            <li
              className={styles["menu-list"]}
              onClick={() => setIsShowTextSetting((prev: boolean) => !prev)}
            >
              <img
                className={styles["text-icon"]}
                src={textIcon}
                alt="text-setting"
              />
            </li>
            <li
              className={styles["menu-list"]}
              onClick={() => setIsShowTranslatorPart((prev: boolean) => !prev)}
            >
              <img
                className={styles["menu-list-img"]}
                src={translatorName === "makarem" ? makaremImg : fooladvandImg}
                alt="home"
              />
            </li>
            <li onClick={playPauseHandler} className={styles["menu-list"]}>
              <img
                className={styles["playImg"]}
                src={isPauesed ? play : pause}
                alt="play"
              />
            </li>
            <li
              className={styles["menu-list"]}
              onClick={() => setIsShowGhariPart((prev: boolean) => !prev)}
            >
              <img
                className={styles["menu-list-img"]}
                src={
                  localStorage.getItem("ghari") === "Abdullah_Basfar_32kbps"
                    ? basfar
                    : menshavi
                }
                alt="home"
              />
            </li>
            <Link to={"/Main"}>
              <li className={styles["menu-list"]}>
                <img
                  className={styles["menu-list-img"]}
                  src={haram}
                  alt="haram-home"
                />
              </li>
            </Link>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default AudioPart;
