import style from "./LoadingSpinner.module.css";
const LoadingSpinner = () => {
  return (
    <div className={style["spinner__wrapper"]}>
      <div className={style["lds-default"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>در حال بارگذاری اولیه...</p>
      <p>لطفا کمی صبر کنید</p>
    </div>
  );
};

export default LoadingSpinner;
