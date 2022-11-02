import homeImg from "../../assets/img/haram2.7b1ffc7.png";
import { Link } from "react-router-dom";
import openBook from "../../assets/img/openbook.png";
import styles from "./navigation.module.css";

const Navigation = () => {
  return (
    <section>
      <nav>
        <ul>
          <Link to="/search">
            <li className={styles["menu-list"]}>
              <img
                className={styles["openbookImg"]}
                src={openBook}
                alt="search"
              />
            </li>
          </Link>
          <Link to={"/setting"}>
            <li className={styles["menu-list"]}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                className={styles["svg"]}
              >
                <g
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M14.526 17.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
                  <path d="M22.526 14a8.023 8.023 0 00-.188-1.713l2.714-2.055-2-3.464-3.143 1.326a7.982 7.982 0 00-2.961-1.719L16.526 3h-4l-.422 3.375c-1.1.352-2.11.939-2.961 1.719L6 6.768l-2 3.464 2.714 2.055a7.904 7.904 0 000 3.426L4 17.768l2 3.464 3.143-1.326a7.983 7.983 0 002.961 1.719L12.526 25h4l.422-3.375a7.982 7.982 0 002.961-1.719l3.143 1.326 2-3.464-2.714-2.055A8.023 8.023 0 0022.526 14v0z" />
                </g>
              </svg>
            </li>
          </Link>

          <div className={styles["home-nav"]}>
            <Link to="/main">
              <img className={styles["haram-img"]} src={homeImg} alt="home" />
            </Link>
          </div>
        </ul>
      </nav>
    </section>
  );
};

export default Navigation;
