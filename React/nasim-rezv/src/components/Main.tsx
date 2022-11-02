import style from "./Main.module.css";
import settingLogo from "../assets/img/setting.svg";
import quranSvg from "../assets/img/quran.svg";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <>
      <section className={style["main-content"]}>
        <div className={style["date__container"]}>
          <div className={style["date__container-pattern-holder"]}>
            <div className={style["date__content-container"]}>
              <div
                className={`${style["date-section"]} ${style["date__ghamari"]}`}
              >
                <p>صفر1444 7</p>
                <p>یا ذالجلال و الاکرام</p>
              </div>
              <div
                className={`${style["date-section"]} ${style["date__shamsi"]}`}
              >
                <p>13</p>
                <p>شهریور 1401</p>
              </div>
            </div>
          </div>
        </div>

        <div className={style["app__menu"]}>
          <Link to={"/setting"} className={style["app__menu-container"]}>
            <div className={style["app__menu-item"]}>
              <img
                className={style["app__menu-item__img"]}
                src={settingLogo}
                alt="setting"
              />
            </div>
            <p className={style["app_menu-item__desc"]}>تنظیمات</p>
          </Link>
          <Link to={"/search"} className={style["app__menu-container"]}>
            <div className={style["app__menu-item"]}>
              <img
                className={style["app__menu-item__img"]}
                src={quranSvg}
                alt="quran"
              />
            </div>
            <p className={style["app_menu-item__desc"]}>قرآن</p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Main;
