import { Children, useState } from "react";

import { Popup, ResponsiveImage } from "@/components/shared";
import { certificateList } from "@/constants/shared/certificates";

import { Certificate as CertificateType } from "@/interfaces/certificates";
import styled from "@emotion/styled";

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
    <Container>
      <Wrapper>
        {Children.toArray(
          certificateList.map((certificate) => (
            <Item onClick={() => handleClickItem(certificate)}>
              <ItemImage src={certificate.src} alt={certificate.title} />
              <ItemTitle>
                {certificate.title} ({certificate.class})
              </ItemTitle>
            </Item>
          )),
        )}
      </Wrapper>

      {isOpenPopup && selectedCertificate && (
        <Popup onClosePopup={handleClosePopup} hasCloseBtn>
          <ImageWrapper>
            <Image
              src={selectedCertificate.src}
              alt={selectedCertificate.title}
            />
          </ImageWrapper>
        </Popup>
      )}
    </Container>
  );
}

export default Certificate;

const Container = styled.div`
  background-color: var(--gray-20);
  height: 100%;
`;

const Wrapper = styled.ul`
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: row wrap;
  overflow: auto;
`;

const Item = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 15px;
  width: 230px;
  height: 180px;
`;

const ItemImage = styled(ResponsiveImage)`
  width: 100%;
  border-radius: 8px;

  &:hover {
    box-shadow: 0 0 0 3px var(--blue-20);
  }
`;

const ItemTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
`;

const ImageWrapper = styled.div`
  max-height: calc(100vh - 150px);
  width: 80vw;
  max-width: 1300px;
  border-radius: 15px;
  overflow: hidden;
`;

const Image = styled(ResponsiveImage)`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;
