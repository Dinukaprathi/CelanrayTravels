"use client";
import { useState } from "react";

export default function SafeImage({ src, alt, ...props }: { src: string; alt: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc('/fallback.jpg')}
      style={{ objectFit: "cover", width: "100%", height: "100%" }}
      {...props}
    />
  );
} 