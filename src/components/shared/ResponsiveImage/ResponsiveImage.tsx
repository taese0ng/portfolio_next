import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./ResponsiveImage.module.scss";
import classNames from "classnames";

interface Props {
  src: string;
  width?: number | string;
  height?: number | string;
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
  width,
  height,
  onClick,
  onLoadError,
  onLoadComplete,
  draggable = false,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const isNormal = !isLoading && !isError;
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
    setIsError(true);
  };

  return (
    <div
      className={classNames(styles.container, className)}
      style={{ width: width, height: height }}
    >
      <Image
        ref={imageRef}
        className={styles.image}
        src={src}
        draggable={draggable}
        onClick={handleClickImage}
        onLoad={handleLoadImage}
        onError={handleErrorImage}
        sizes="100%, 100%"
        alt={alt}
        fill
        quality={100}
        priority={true}
      />

      {!isNormal && (
        <div className={styles.placeholderImageWrapper}>
          <img className={styles.placeholderImage} src={placeholderImage} />
        </div>
      )}
    </div>
  );
}

export default ResponsiveImage;
