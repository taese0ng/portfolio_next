import Link from "next/link";
import styles from "./404.module.scss";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>잘못된 경로입니다.</div>
      <div className={styles.link}>
        <Link href={"/"}>Home</Link> 으로 이동하기
      </div>
    </div>
  );
}
