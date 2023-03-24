import styles from "./Settings.module.scss";

import BackgroundSetting from "./BackgroundSetting";

function Settings() {
  return (
    <div className={styles.container}>
      <BackgroundSetting />
    </div>
  );
}

export default Settings;
