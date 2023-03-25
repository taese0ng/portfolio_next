import { Children } from "react";

import { contents, profileImg } from "@/constants/info";
import styles from "./Info.module.scss";
import classNames from "classnames";
import { ResponsiveImage } from "@/components/shared";

function Info() {
  const handleClickContent = (link?: string) => {
    if (link) window.open(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileImage}>
        <ResponsiveImage src={profileImg} alt="profileImg" />
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
              <ResponsiveImage
                className={styles.contentsIcon}
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
