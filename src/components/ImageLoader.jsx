import React, { useState } from "react";
import styles from "./ImageLoader.module.css";

export default function ImageLoader({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className={`${styles.imageContainer} ${className || ""}`}>
      {!isLoaded && !hasError && (
        <div className={styles.placeholder}>
          <div className={styles.spinner}></div>
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`${styles.image} ${isLoaded ? styles.loaded : styles.loading}`}
      />
      
      {hasError && (
        <div className={styles.errorState}>?</div>
      )}
    </div>
  );
}