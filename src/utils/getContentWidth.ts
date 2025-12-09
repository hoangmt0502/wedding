export const getContentWidth = (windowWidth: number) => {
  let mainWidth = 0;
  let compactWidth = 0;

  // Mobile (xs)
  if (windowWidth < 600) {
    mainWidth = windowWidth;                           // 100%
    compactWidth = mainWidth
  }

  // Tablet nhỏ (sm)
  else if (windowWidth < 900) {
    mainWidth = Math.round(windowWidth * 0.90);        // 90%
    compactWidth = mainWidth
  }

  // Tablet lớn (md)
  else if (windowWidth < 1200) {
    mainWidth = 900 - 96;                              // 804
    compactWidth = mainWidth
  }

  // Desktop (lg)
  else if (windowWidth < 1536) {
    mainWidth = 1200;   
    compactWidth = Math.round(mainWidth * 0.86)                                 // container wide
  }

  // Wide desktop (xl)
  else {
    mainWidth = 1440;       
    compactWidth = Math.round(mainWidth * 0.8)                          // max container
  }

  return {
    mainWidth,
    compactWidth,
  };
};
