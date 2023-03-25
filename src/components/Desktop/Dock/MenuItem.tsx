import { MouseEvent, useState } from "react";

import { DockItemType } from "@/interfaces/dock";
import styles from "./MenuItem.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveImage } from "@/components/shared";

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
    <div className={styles.container}>
      <motion.div
        className={styles.wrapper}
        initial={{ top: 0 }}
        animate={{ top: isBounce ? -20 : 0 }}
        transition={{ duration: 0.3, ease: "linear" }}
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
          <ResponsiveImage src={icon} alt={title} />
        </div>
      </motion.div>{" "}
      {isOpen && <div className={styles.menuItemDot} />}
    </div>
  );
}

export default MenuItem;
