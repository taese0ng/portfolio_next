import { Children, useState } from "react";

import { DockItemType } from "@/interfaces/dock";

import styles from "./Dock.module.scss";
import MenuItem from "./MenuItem";
import classNames from "classnames";
const safariIcon = "/assets/icons/safari.webp";

interface Props {
  itemList: Array<DockItemType>;
  onOpenModal: (id: string) => void;
  onUpperModal: (id: string) => void;
}

function Dock({ itemList, onOpenModal, onUpperModal }: Props) {
  const [safariIsHover, setSafariIsHover] = useState(false);

  const handleClickSafari = () => {
    window.open("https://www.google.co.kr");
  };

  const handleMouseEnter = () => {
    setSafariIsHover(true);
  };

  const handleMouseLeave = () => {
    setSafariIsHover(false);
  };

  return (
    <div className={styles.container} id="dock">
      <div className={styles.menu}>
        <div
          className={styles.menuItemWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={classNames(styles.menuItemTitle, {
              [styles.menuItemTitleIsHover]: safariIsHover,
            })}
          >
            safari
          </div>

          <div
            className={classNames("bounce", styles.menuItemIcon)}
            onClick={handleClickSafari}
          >
            <img draggable={false} src={safariIcon} alt="safari" />
          </div>
        </div>

        {Children.toArray(
          itemList.map((item) => (
            <MenuItem
              item={item}
              onOpenModal={onOpenModal}
              onUpperModal={onUpperModal}
            />
          )),
        )}
      </div>
    </div>
  );
}

export default Dock;
