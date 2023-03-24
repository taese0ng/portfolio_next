import { Children } from "react";

import { bgImgs } from "@/constants/bgSetting";
import { BgImg } from "@/interfaces/bgSetting";
import { bgImgAtom } from "@/store";
import { useRecoilState } from "recoil";
import styles from "./BackgroundSetting.module.scss";
import classNames from "classnames";

function BackgroundSetting() {
  const [bgImg, setBgImg] = useRecoilState(bgImgAtom);

  const handleSetImg = (bg: BgImg) => {
    setBgImg(bg);
    localStorage.setItem("background", JSON.stringify(bg));
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>배경 설정</div>
      </div>

      <div>
        <ul className={styles.itemsWrapper}>
          {Children.toArray(
            bgImgs.map((img) => (
              <li className={styles.item} onClick={() => handleSetImg(img)}>
                <img
                  className={classNames(styles.itemImage, {
                    [styles.selected]: bgImg.title === img.title,
                  })}
                  draggable={false}
                  src={img.src}
                  alt=""
                />
                <div
                  className={classNames(styles.itemTitle, {
                    [styles.selected]: bgImg.title === img.title,
                  })}
                >
                  {img.title}
                </div>
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  );
}

export default BackgroundSetting;
