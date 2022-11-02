import backImg from "../../assets/img/back.svg";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { pauseAudio } from "../store/features/audio";
import { useAppDispatch } from "../store/store";
import { useEffect, useState } from "react";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [mytitle, setTitle] = useState<string>("اپلیکیشن قرآنی فراوین");

  useEffect(() => {
    switch (location.pathname) {
      case "/main":
        setTitle("اپلیکیشن قرآنی فراوین");
        break;
      case "/search":
        setTitle("جستجو در قرآن");
        break;
      case "/setting":
        setTitle("تنظیمات");
        break;

      default:
        setTitle("اپلیکیشن قرآنی فراوین");

        break;
    }
  }, [location.pathname]);

  return (
    <div className={styles["top__header-wrappper"]}>
      <div className={styles["top-header__gradient"]}>
        <div className={styles["top-header"]}>
          <div className={styles["top-header__icon-wrapper"]}>
            <Link onClick={() => dispatch(pauseAudio(true))} to={"/setting"}>
              <svg
                width="38"
                height="41"
                viewBox="0 0 30 30"
                className={styles["svg"]}
              >
                <g
                  fill="none"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M14.526 17.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
                  <path d="M22.526 14a8.023 8.023 0 00-.188-1.713l2.714-2.055-2-3.464-3.143 1.326a7.982 7.982 0 00-2.961-1.719L16.526 3h-4l-.422 3.375c-1.1.352-2.11.939-2.961 1.719L6 6.768l-2 3.464 2.714 2.055a7.904 7.904 0 000 3.426L4 17.768l2 3.464 3.143-1.326a7.983 7.983 0 002.961 1.719L12.526 25h4l.422-3.375a7.982 7.982 0 002.961-1.719l3.143 1.326 2-3.464-2.714-2.055A8.023 8.023 0 0022.526 14v0z" />
                </g>
              </svg>
            </Link>
          </div>
          <div className={styles["top-header-desc"]}>
            <div className={styles["top-header-desc__text"]}>
              <h3>{mytitle}</h3>
            </div>
            <div
              onClick={() => {
                dispatch(pauseAudio(true));
                navigate(-1);
              }}
            >
              <img className={styles["back__img"]} src={backImg} alt="back" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
