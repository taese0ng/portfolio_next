import { Children } from "react";

import { skillList } from "@/constants/skills";
import styles from "./Skill.module.scss";

function Skill() {
  return (
    <div className={styles.container}>
      <ul className={styles.skills}>
        {Children.toArray(
          skillList.map((skill) => (
            <li className={styles.item}>
              <img
                className={styles.itemImage}
                draggable={false}
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
