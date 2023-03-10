import { MouseEvent, useState } from "react";

import { DockItemType } from "@/interfaces/dock";
import styles from "./MenuItem.module.scss";
import classNames from "classnames";
interface Props {
  item: DockItemType;
  onOpenModal: (id: string) => void;
  onUpperModal: (id: string) => void;
}

function MenuItem({ item, onOpenModal, onUpperModal }: Props) {
  const [isHover, setIsHover] = useState(false);
  const [isBounce, setIsBounce] = useState(false);

  const onClickMenu = (
    e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement },
    item: DockItemType,
  ) => {
    e.preventDefault();
    if (!item.isOpen) {
      setIsBounce(true);
      //   setTimeout(() => setIsBounce(false), 700);

      onOpenModal(item.id);
    } else {
      onUpperModal(item.id);
    }
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={classNames(styles.menuItemTitle, {
          [styles.menuItemTitleIsHover]: isHover,
        })}
      >
        {item.title}
      </div>

      <div
        className={classNames(styles.menuItemIcon, {
          [styles.menuItemIconIsBounce]: isBounce,
        })}
        onClick={(e) => onClickMenu(e, item)}
      >
        <img draggable={false} src={item.icon} alt={item.title} />
      </div>

      {item.isOpen && <div className={styles.menuItemDot} />}
    </div>
  );
}

export default MenuItem;
