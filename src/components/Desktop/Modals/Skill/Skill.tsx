import { Children } from "react";

import { skillList } from "@/constants/skills";
import styles from "./Skill.module.scss";
import { ResponsiveImage } from "@/components/shared";

function Skill() {
  return (
    <div className={styles.container}>
      <ul className={styles.skills}>
        {Children.toArray(
          skillList.map((skill) => (
            <li className={styles.item}>
              <ResponsiveImage
                className={styles.itemImage}
                src={skill.src}
                alt={skill.title}
              />
              <div className={styles.itemTitle}>{skill.title}</div>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

export default Skill;
