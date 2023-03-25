import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./ResponsiveImage.module.scss";
import classNames from "classnames";

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
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleClickImage = () => {
    onClick?.();
  };

  const handleLoadImage = () => {
    if (imageRef.current) {
      onLoadComplete?.(imageRef.current);
    }
    setIsLoading(false);
  };

  const handleErrorImage = () => {
    onLoadError?.();
    setIsLoading(false);
  };

  return (
    <Image
      ref={imageRef}
      className={classNames({ [styles.image]: isLoading }, className)}
      src={src}
      draggable={draggable}
      onClick={handleClickImage}
      onLoad={handleLoadImage}
      onError={handleErrorImage}
      alt={alt}
      width={90}
      height={90}
      placeholder="blur"
      blurDataURL={"placeholderImage"}
    />
  );
}

export default ResponsiveImage;
