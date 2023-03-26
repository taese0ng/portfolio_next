import { MouseEvent, ReactNode, useEffect } from "react";

import styles from "./Popup.module.scss";
import { ResponsiveImage } from "@/components/shared";

const closeIcon = "/assets/icons/closeIcon.webp";

interface Props {
  onClosePopup: (e?: MouseEvent) => void;
  hasCloseBtn?: boolean;
  children: ReactNode;
}

function Popup({ onClosePopup, hasCloseBtn = false, children }: Props) {
  const handleClosePopup = (e?: MouseEvent) => {
    onClosePopup(e);
  };

  const handleClickSlot = (e: MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const dock: HTMLDivElement | null = document.querySelector("#dock");
    const header: HTMLDivElement | null = document.querySelector("#header");

    if (header && dock) {
      header.style.zIndex = "0";
      dock.style.zIndex = "-1";
    }

    return () => {
      if (header && dock) {
        header.style.zIndex = "70000";
        dock.style.zIndex = "70000";
      }
    };
  }, []);

  return (
    <div
      className={styles.container}
      onClick={() => !hasCloseBtn && handleClosePopup()}
    >
      <div className={styles.wrapper} onClick={handleClickSlot}>
        {hasCloseBtn && (
          <div className={styles.closeButton} onClick={handleClosePopup}>
            <ResponsiveImage
              className={styles.image}
              src={closeIcon}
              alt="closeButton"
            />
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

export default Popup;
