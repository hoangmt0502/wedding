import { useEffect, useState } from "react";
import { getContentWidth } from "../utils/getContentWidth";

export const useContentWidth = () => {
  const [widths, setWidths] = useState(() =>
    getContentWidth(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setWidths(getContentWidth(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // widths = { mainWidth, compactWidth }
  return widths;
};
