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
  const { title, isOpen, icon } = item;
  const [isHover, setIsHover] = useState(false);
  const [isBounce, setIsBounce] = useState(false);

  const onClickMenu = (
    e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement },
    dockItem: DockItemType,
  ) => {
    e.preventDefault();
    if (!dockItem.isOpen) {
      setIsBounce(true);
      setTimeout(() => setIsBounce(false), 700);

      onOpenModal(dockItem.id);
    } else {
      onUpperModal(dockItem.id);
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
        {title}
      </div>

      <div
        className={classNames(styles.menuItemIcon, {
          [styles.menuItemIconIsBounce]: isBounce,
        })}
        onClick={(e) => onClickMenu(e, item)}
      >
        <img draggable={false} src={icon} alt={title} />
      </div>

      {isOpen && <div className={styles.menuItemDot} />}
    </div>
  );
}

export default MenuItem;
