import { MouseEvent, useState } from "react";

import { DockItemType } from "@/interfaces/dock";
import styles from "./MenuItem.module.scss";
import { motion, AnimatePresence } from "framer-motion";

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
      setTimeout(() => setIsBounce(false), 300);

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
    <motion.div
      initial={{ top: 0 }}
      animate={{ top: isBounce ? -20 : 0 }}
      transition={{ duration: 0.3, ease: "linear" }}
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        {isHover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.menuItemTitle}
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={styles.menuItemIcon}
        onClick={(e) => onClickMenu(e, item)}
      >
        <img draggable={false} src={icon} alt={title} />
      </div>

      {isOpen && <div className={styles.menuItemDot} />}
    </motion.div>
  );
}

export default MenuItem;
