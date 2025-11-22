export const getContentWidth = (windowWidth: number) => {
  let mainWidth = 0;

  // xs: < 600
  if (windowWidth < 600) mainWidth = windowWidth - 24;

  // sm: < 900
  else if (windowWidth < 900) mainWidth = 600 - 48;     // 552

  // md: < 1200
  else if (windowWidth < 1200) mainWidth = 900 - 96;    // 804

  // lg: < 1536
  else if (windowWidth < 1536) mainWidth = 1200;        // container wide

  // xl: >= 1536
  else mainWidth = 1440;                                // max container

  const compactWidth = Math.round(mainWidth * 0.8);

  return {
    mainWidth,
    compactWidth,
  };
};
