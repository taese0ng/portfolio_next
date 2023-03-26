import { Children, useState } from "react";

import { Popup, ResponsiveImage } from "@/components/shared";
import { awardList } from "@/constants/awards";
import { Award as AwardType } from "@/interfaces/awards";
import styles from "./Award.module.scss";

function Award() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedAward, setSelectedAward] = useState<AwardType>();

  const handleClickItem = (award: AwardType) => {
    setSelectedAward(award);
    setIsOpenPopup(true);
  };

  const handleClosePopup = () => {
    setIsOpenPopup(false);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.wrapper}>
        {Children.toArray(
          awardList.map((award) => (
            <li className={styles.item} onClick={() => handleClickItem(award)}>
              <ResponsiveImage
                className={styles.itemImg}
                src={award.src}
                alt={award.title}
              />
              <div className={styles.itemTitle}>
                {award.title} ({award.class})
              </div>
            </li>
          )),
        )}
      </ul>

      {isOpenPopup && selectedAward && (
        <Popup onClosePopup={handleClosePopup} hasCloseBtn>
          <div className={styles.imageWrapper}>
            <ResponsiveImage
              className={styles.image}
              src={selectedAward.src}
              alt={selectedAward.title}
            />
          </div>
        </Popup>
      )}
    </div>
  );
}

export default Award;
