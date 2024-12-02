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
    chroma.scale(["#0086ff", "#0000FF"]).mode("lch").colors(500)
  );

  const generateRandomString = (length = 8) => {
    // 定义可能包含的字符：大写字母、小写字母和数字
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    // 循环生成指定长度的随机字符串
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  const start = async () => {
    const element = document.getElementById("img-wrapper");

    for (const bg of blurArr) {
      const newColor = chroma.random();
      setColor(newColor);
      setBackgroundColor(bg);

      const dataUrl = await toJpeg(element);
      download(dataUrl, `${generateRandomString()}.png`);
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
