import { Children, useState } from "react";

import { Popup, ResponsiveImage } from "@/components/shared";
import { certificateList } from "@/constants/certificates";

import { Certificate as CertificateType } from "@/interfaces/certificates";
import styles from "./Certificate.module.scss";

function Certificate() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<CertificateType>();

  const handleClickItem = (certificate: CertificateType) => {
    setSelectedCertificate(certificate);
    setIsOpenPopup(true);
  };

  const handleClosePopup = () => {
    setIsOpenPopup(false);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.wrapper}>
        {Children.toArray(
          certificateList.map((certificate) => (
            <li
              className={styles.item}
              onClick={() => handleClickItem(certificate)}
            >
              <ResponsiveImage
                className={styles.itemImg}
                src={certificate.src}
                alt={certificate.title}
              />
              <div className={styles.itemTitle}>
                {certificate.title} ({certificate.class})
              </div>
            </li>
          )),
        )}
      </ul>

      {isOpenPopup && selectedCertificate && (
        <Popup onClosePopup={handleClosePopup} hasCloseBtn>
          <div className={styles.imageWrapper}>
            <ResponsiveImage
              src={selectedCertificate.src}
              alt={selectedCertificate.title}
            />
          </div>
        </Popup>
      )}
    </div>
  );
}

export default Certificate;
