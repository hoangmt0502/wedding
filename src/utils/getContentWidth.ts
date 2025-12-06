export const getContentWidth = (windowWidth: number) => {
  let mainWidth = 0;

  // Mobile (xs)
  if (windowWidth < 600) {
    mainWidth = windowWidth;                           // 100%
  }

  // Tablet nhỏ (sm)
  else if (windowWidth < 900) {
    mainWidth = Math.round(windowWidth * 0.90);        // 96%
  }

  // Tablet lớn (md)
  else if (windowWidth < 1200) {
    mainWidth = 900 - 96;                              // 804
  }

  // Desktop (lg)
  else if (windowWidth < 1536) {
    mainWidth = 1200;                                  // container wide
  }

  // Wide desktop (xl)
  else {
    mainWidth = 1440;                                  // max container
  }

  const compactWidth = Math.round(mainWidth * 0.8);

  return {
    mainWidth,
    compactWidth,
  };
};
