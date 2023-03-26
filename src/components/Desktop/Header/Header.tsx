import { useEffect, useState } from "react";

import { Battery, ResponsiveImage } from "@/components/shared";
import { itemIDs } from "@/constants/dock";
import { DockItemType } from "@/interfaces/dock";

import Calendar from "./Calendar";
import Time from "./Time";
import styles from "./Header.module.scss";

const logoImg = "/assets/icons/logo.webp";
let dock: HTMLDivElement | null = null;
let header: HTMLDivElement | null = null;

interface Props {
  itemList: Array<DockItemType>;
  onOpenModal: (id: string, nowOpen: boolean) => void;
  onUpperModal: (id: string) => void;
}

export default function Header({ itemList, onOpenModal, onUpperModal }: Props) {
  const [isFocusedPopup, setIsFocusedPopup] = useState(false);
  const [isOpenedCalendar, setIsOpenedCalendar] = useState(false);

  const handleFocusMenu = () => {
    setIsFocusedPopup(true);
  };

  const handleBlurMenu = () => {
    setTimeout(() => {
      setIsFocusedPopup(false);
    }, 100);
  };

  const handleClickMyInfo = () => {
    const item = itemList.find((item) => item.id === itemIDs.myInfo);
    if (item) {
      if (!item.isOpen) {
        onOpenModal(item.id, true);
      } else {
        onUpperModal(item.id);
      }
    }
  };

  const handleOpenCalendar = () => {
    if (header && dock) {
      header.style.zIndex = "0";
      dock.style.zIndex = "-1";
    }
    setIsOpenedCalendar(true);
  };

  const handleCloseCalendar = () => {
    if (header && dock) {
      header.style.zIndex = "70000";
      dock.style.zIndex = "70000";
    }
    setIsOpenedCalendar(false);
  };

  useEffect(() => {
    dock = document.querySelector("#dock");
    header = document.querySelector("#header");
  }, []);

  return (
    <div className={styles.container} id="header">
      <div className={styles.left}>
        <div className={styles.elementWrapper}>
          <div
            className={styles.logoWrapper}
            tabIndex={0}
            onFocus={handleFocusMenu}
            onBlur={handleBlurMenu}
          >
            <ResponsiveImage className={styles.logo} src={logoImg} alt="logo" />
          </div>

          {isFocusedPopup && (
            <div className={styles.menuList}>
              <li onClick={handleClickMyInfo}>김태성에 관하여</li>
            </div>
          )}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.elementWrapper}>
          <div className={styles.element}>
            <Battery onPercent={true} blackMode={false} />
          </div>

          <div className={styles.element}>
            <div className={styles.timeWrapper} onClick={handleOpenCalendar}>
              <Time />
            </div>

            {isOpenedCalendar && (
              <>
                <div className={styles.calendarWrapper}>
                  <Calendar />
                </div>
                <div className={styles.dim} onClick={handleCloseCalendar} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
