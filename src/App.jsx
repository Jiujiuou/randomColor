import { useEffect, useState, useRef } from "react";
import chroma from "chroma-js";
import { toJpeg } from "html-to-image";
import download from "downloadjs";

import styles from "./App.module.less";

let count = 0;

function App() {
  const [backgroundColor, setBackgroundColor] = useState("blue");
  const [color, setColor] = useState("white");
  const intervalId = useRef(null);

  useEffect(() => {
    initColor();
    intervalId.current = setInterval(initColor, 500);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  const initColor = () => {
    if (count >= 500) {
      clearInterval(intervalId.current);
      return;
    }

    const newBgColor = chroma.random();
    const newColor = chroma.random();

    setBackgroundColor(newBgColor);
    setColor(newColor);

    const element = document.getElementById("img-wrapper");
    toJpeg(element).then(function (dataUrl) {
      download(dataUrl, `第${count}张.png`);
      count++;
    });
  };

  return (
    <div className={styles.wrapper}>
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
