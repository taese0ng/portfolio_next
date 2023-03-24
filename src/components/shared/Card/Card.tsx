import { ReactNode } from "react";

import styles from "./Card.module.scss";

interface Props {
  children: ReactNode;
}

function Card({ children }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.cardLabel} />

      <div>{children}</div>
    </div>
  );
}

export default Card;
