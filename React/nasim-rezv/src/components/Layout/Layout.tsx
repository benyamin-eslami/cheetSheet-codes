import { ReactNode } from "react";
import Navigation from "./Navigation";
import Header from "./Header";
import styles from "./container.module.css";
import { useLocation } from "react-router-dom";
import AudioPart from "../AudioPart";
const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  return (
    <>
      <div className={styles["container"]}>
        <Header />
        {children}
        {location.pathname === "/setting" ||
        location.pathname === "/search" ||
        location.pathname === "/main" ? (
          <Navigation />
        ) : (
          <AudioPart />
        )}
      </div>
    </>
  );
};

export default Layout;
