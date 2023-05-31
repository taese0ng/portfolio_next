import { useRef } from "react";
import Image from "next/image";
import styled from "@emotion/styled";

interface Props {
  src: string;
  onClick?: () => void;
  onLoadComplete?: (imageElement: HTMLImageElement) => void;
  onLoadError?: () => void;
  alt?: string;
  className?: string;
  draggable?: boolean;
}

const placeholderImage = "/assets/icons/defaultImage.svg";

function ResponsiveImage({
  src,
  alt = "",
  className,
  onClick,
  onLoadError,
  onLoadComplete,
  draggable = false,
}: Props) {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleClickImage = () => {
    onClick?.();
  };

  const handleLoadImage = () => {
    if (imageRef.current) {
      onLoadComplete?.(imageRef.current);
    }
  };

  const handleErrorImage = () => {
    onLoadError?.();
  };

  return (
    <Container className={className}>
      <Img
        ref={imageRef}
        src={src}
        draggable={draggable}
        onClick={handleClickImage}
        onLoad={handleLoadImage}
        onError={handleErrorImage}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={placeholderImage}
        quality={89}
        priority={true}
      />
    </Container>
  );
}

export default ResponsiveImage;

const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled(Image)`
  position: relative !important;
  object-fit: cover;
`;
