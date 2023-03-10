import { Children } from "react";

import { contents, profileImg } from "@/constants/info";
import styles from "./Info.module.scss";
import classNames from "classnames";

function Info() {
  const handleClickContent = (link?: string) => {
    if (link) window.open(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileImage}>
        <img draggable={false} src={profileImg} alt="profileImg" />
      </div>

      <ul className={styles.profileContents}>
        <li className={styles.profileContentsName}>
          <div>김태성</div>
        </li>

        {Children.toArray(
          contents.map((content) => (
            <li
              className={classNames(styles.profileContent, {
                [styles.contentsLink]: Boolean(content.link),
              })}
              onClick={() => handleClickContent(content?.link)}
            >
              <img
                className={styles.contentsIcon}
                draggable={false}
                src={content.icon}
                alt={content.id}
              />
              <span>{content.text}</span>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

export default Info;
