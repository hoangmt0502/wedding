import React, { useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";

export type SharedImageProps = {
  src?: string;
  alt?: string;
  width?: number | string; // px or % or '100%'
  height?: number | string;
  aspectRatio?: number; // width / height, optional - will force container ratio if provided
  variant?: "cover" | "contain" | "fixed";
  radius?: number | string; // px or css value
  shadow?: boolean;
  border?: boolean;
  caption?: string;
  fallbackSrc?: string;
  loadingPlaceholder?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

const defaultFallback =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23f3f3f3'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23bbb' font-family='Arial' font-size='16'>No image</text></svg>";

export const SharedImage: React.FC<SharedImageProps> = ({
  src,
  alt = "",
  width = "100%",
  height,
  aspectRatio,
  variant = "cover",
  radius = 12,
  shadow = false,
  border = false,
  caption,
  fallbackSrc = defaultFallback,
  loadingPlaceholder,
  onClick,
  className,
  style,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // compute container styles
  const containerStyles: React.CSSProperties = {
    width,
    height: height ?? (aspectRatio ? 0 : undefined),
    borderRadius: radius,
    overflow: "hidden",
    position: "relative",
    display: "block",
    boxShadow: shadow ? "0 8px 20px rgba(0,0,0,0.12)" : undefined,
    border: border ? "1px solid rgba(0,0,0,0.06)" : undefined,
    cursor: onClick ? "pointer" : undefined,
    ...style,
  };

  // when aspectRatio provided, we use padding-bottom trick
  const ratioWrapper =
    aspectRatio && !height
      ? {
          paddingBottom: `${100 / aspectRatio}%`, // height based on ratio
          width: "100%",
          height: 0,
        }
      : undefined;

  const imgStyles: React.CSSProperties = {
    position: aspectRatio && !height ? "absolute" : undefined,
    top: aspectRatio && !height ? 0 : undefined,
    left: aspectRatio && !height ? 0 : undefined,
    width: variant === "fixed" ? (typeof width === "number" ? width : "100%") : "100%",
    height: variant === "fixed" ? (typeof height === "number" ? height : "100%") : "100%",
    objectFit: variant === "cover" ? "cover" : "contain",
    transition: "opacity .24s ease",
    opacity: loaded ? 1 : 0,
    display: "block",
  };

  const effectiveSrc = !error && src ? src : fallbackSrc;

  return (
    <Box component="figure" className={className} sx={{ m: 0 }}>
      <Box
        onClick={onClick}
        sx={containerStyles as any}
        style={ratioWrapper ? { ...containerStyles, ...ratioWrapper } : containerStyles}
      >
        {/* placeholder skeleton */}
        {!loaded && (loadingPlaceholder ?? <Skeleton variant="rectangular" width="100%" height="100%" />)}

        {/* actual image */}
        <img
          src={effectiveSrc}
          alt={alt}
          loading="lazy"
          style={imgStyles}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true); // hide skeleton, show fallback
          }}
        />
      </Box>

      {caption && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block", textAlign: "center" }}>
          {caption}
        </Typography>
      )}
    </Box>
  );
};

export default SharedImage;
