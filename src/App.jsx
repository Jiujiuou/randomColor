import { useEffect, useState, useRef } from "react";
import chroma from "chroma-js";
import { toJpeg } from "html-to-image";
import download from "downloadjs";

import styles from "./App.module.less";

let count = 0;

function App() {
  const [backgroundColor, setBackgroundColor] = useState("blue");
  const [color, setColor] = useState("white");
  const [blurArr, setBlurArr] = useState(
    chroma.scale(["#ADD8E6", "#0000FF"]).mode("lch").colors(20)
  );

  const start = async () => {
    const element = document.getElementById("img-wrapper");

    for (const bg of blurArr) {
      const newColor = chroma.random();
      setColor(newColor);
      setBackgroundColor(bg);

      const dataUrl = await toJpeg(element);
      download(dataUrl, `第${count}张.png`);
      count++;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.start} onClick={start}>
        开始
      </div>
      <div
        className={styles.background}
        id="img-wrapper"
        style={{
          backgroundColor: backgroundColor,
          color: color,
        }}
      >
        <div className={styles.first}>只道</div>
        <div>寻常</div>
      </div>
    </div>
  );
}

export default App;
