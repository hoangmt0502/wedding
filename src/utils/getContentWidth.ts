export const getContentWidth = (windowWidth: number) => {
  let mainWidth = 0;

  // xs: mobile nhỏ
  if (windowWidth < 480) mainWidth = windowWidth - 24;

  // sm: mobile lớn
  else if (windowWidth < 768) mainWidth = 480 - 48;

  // md: tablet nhỏ
  else if (windowWidth < 1024) mainWidth = 768 - 96;

  // lg: tablet lớn / desktop nhỏ
  else if (windowWidth < 1440) mainWidth = 960;

  // xl: desktop rộng
  else if (windowWidth < 1920) mainWidth = 1200;

  // xxl: ultra-wide
  else mainWidth = 1440;

  // 👇 width nhỏ hơn (ví dụ 85% hoặc tuỳ chỉnh)
  const compactWidth = Math.round(mainWidth * 0.85);

  return {
    mainWidth,
    compactWidth,
  };
};
