import style from "./wallpaper.module.css";

const WallPaper = () => {
  return (
    <div className={style.wallpaper_container}>
      <div className={style.slogan_container}>
        <h1 className={style.slogan_1}>要吃就來</h1>
        <h1 className={style.slogan_2}>壹點。甜</h1>
      </div>
    </div>
  );
};

export default WallPaper;
