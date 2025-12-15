import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Fab,
  Stack,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { useContentWidth } from "../../hooks/useContentWidth";
import SharedImage from "../SharedImage";
import { Icon } from '@iconify/react';
import { MAIN_COLOR } from "../../constants/common";
import { useResponsive } from "../../hooks/useResponsive";
// === ADD ===
import { motion, Variants } from "framer-motion";


interface ProfileItem {
  id: number;
  name: string;
  image: string;
  text: string;
}

interface TabItem {
  label: string;
  image: string;
  targetId: number; // để biết tab tương ứng với profile nào
}

const PROFILES: ProfileItem[] = [
  {
    id: 1,
    name: "Xuân Thịnh",
    image: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474087zej/anh-chu-re-don-2k_013637758.jpg",
    text: `Xuất thân từ mảnh đất Nghệ An nhiều nắng gió. Lên Hà Nội học tập và làm việc từ năm 2012...`,
  },
  {
    id: 2,
    name: "Diễm Hằng",
    image: "https://bizweb.dktcdn.net/100/368/426/products/set-vay-chup-anh-cuoi-ngoai-canh-jpeg.jpg?v=1703058721527",
    text: `Hằng, một cô gái nhỏ xinh đến từ Bắc Giang...`,
  },
];

const TABS: TabItem[] = [
  {
    label: "CHÂN DUNG CHÚ RỂ",
    targetId: 1,
    image:
      "https://sonstudio.vn/wp-content/uploads/2024/11/386540388_797864259014786_8304843955363339914_n-1.jpg",
  },
  {
    label: "CHÂN DUNG CÔ DÂU",
    targetId: 2,
    image:
      "https://alohastudio.vn/wp-content/uploads/2020/11/chup-anh-cuoi-dep-chup-hinh-cuoi-uy-tin-phan-thiet-binh-thuan.jpg",
  },
];

// ======================= HEADER TABS ======================= //

function HeaderTabs(props: {
  src: string;
  tabs: TabItem[];
  value: number;
  onChange: (v: number) => void;
}) {
  const { src, tabs, value, onChange } = props;

  const handleChange = (_e: React.SyntheticEvent, v: number) => {
    onChange(v);
  };

  return (
    <Paper
      sx={{
        p: 2,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${src}')`,
        backgroundPosition: "50%",
        backgroundSize: "cover",
        mb: {xs: 2, sm: 4},
        mx: {xs: 1, sm: 0},
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{hidden: true}}
        sx={{
          width: '100%',
          py: {xs: 2, sm: 6},
          border: "1px solid #fff",
          borderRadius: 2,
          "& .Mui-selected": {
            color: `#ff6e6e !important`,
            border: "none !important",
          },
          
          "& .MuiTabs-list": {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: {xs: 'column', sm: 'row'},
            gap: {xs: 2, sm: 0}
          },

          // Style chung cho tab
          "& .MuiTab-root": {
            minWidth: 300,
            px: {xs: 2 ,sm: 4},
            py: {xs: 1, sm: 3},
            mx: {xs: 2, sm: 4},
            borderRadius: 1,
            color: "#333",
            fontSize: "1.05rem",
            textTransform: "none",
            transition: "0.2s",
          },
        }}
      >
        {tabs.map((t) => (
          <Tab
            key={t.label}
            label={
              <Stack direction="row" alignItems="center" gap={1.5}>
                <Typography fontSize="1.05rem">▼</Typography>
                <Typography fontSize="1.05rem">{t.label}</Typography>
              </Stack>
            }
            sx={{
              backgroundImage: `linear-gradient(rgba(247, 244, 236, 0.9), rgba(247, 244, 236, 0.9)), url('${t.image}')`,
              backgroundPosition: "50%",
              backgroundSize: "cover",
            }}
          />
        ))}
      </Tabs>
    </Paper>
  );
}

// ======================= MAIN COMPONENT ======================= //

export default function ProfileSection() {
  const src =
    "https://jejuwedding.vn/wp-content/uploads/2024/11/PLUS3736-scaled.jpg";

  const [tab, setTab] = useState(0);
  const {compactWidth} = useContentWidth();
  const {isMobile} = useResponsive();

    // === ADD animation config (FADE XA – SCROLL XUỐNG MỚI HIỆN) ===
  const fadeFar: Variants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 30 : 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.6 : 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeFarDelay = (delay: number): Variants => ({
    hidden: {
      opacity: 0,
      y: isMobile ? 30 : 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.6 : 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });


  // Lấy id profile tương ứng tab
  const activeId = TABS[tab].targetId;

  // Filter profile
  const activeProfile = PROFILES.filter((p) => p.id === activeId);

  return (
    <Box sx={{background: "#faf6f6", pb: {xs: 2, sm: 4}, pt: {xs: 2, sm: 1} }}>
      <Box sx={{ width: compactWidth, mx: "auto" }}>
        <HeaderTabs src={src} tabs={TABS} value={tab} onChange={setTab} />

        {activeProfile.map((p) => (
          <Grid
            key={p.id}
            container
            spacing={3}
            sx={{ mb: {xs: 2, md: 6} }}
            direction="row"
          >
                        <Grid item xs={12} md={6} sx={{mx: {xs: 1, sm: 0}}}>
              {/* === ADD motion wrapper === */}
              <motion.div
                variants={fadeFar}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-120px" }}
              >
                <SharedImage
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: isMobile ? 2 : 4,
                    height: isMobile ? 500 : 700
                  }}
                />
              </motion.div>
            </Grid>


            <Grid item xs={12} md={6} sx={{mx: {xs: 1, sm: 0}}}>
              <motion.div
                variants={fadeFarDelay(0.15)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-120px" }}
                style={{height: '100%'}}
              >
              <Paper
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  height: "100%",
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    border: "1px solid #b3b3b3",
                    borderRadius: 2,
                    p: 3,
                    height: "100%",
                    position: "relative",
                    background: "linear-gradient(180deg, #ffffffee, #fffafaff)",
                  }}
                >
                  {/* Decor bo góc nhẹ */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      backgroundImage: `url('/images/decor_corner.png')`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "top left, top right, bottom left, bottom right",
                      opacity: 0.12,
                    }}
                  />

                  {/* Icon hoa trên cùng */}
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <SharedImage
                      src="/images/story_icon.png"
                      alt="decor"
                      width={150}
                      height={80}
                      variant="cover"
                    />
                  </Box>

                 <Box 
                    sx={{ 
                      display: "flex", 
                      justifyContent: "center", 
                      alignItems: "center", 
                      gap: 1.5, 
                      mb: 2 
                    }}
                  >
                    <Icon icon="mdi:flower" width={26} color="#c07b85" />
                    
                    <Typography
                      variant="h4"
                      fontWeight={600}
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#444",
                      }}
                    >
                      {p.name}
                    </Typography>

                    <Icon icon="mdi:flower" width={26} color="#c07b85" />
                  </Box>



                  {/* Nội dung */}
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2,
                      lineHeight: 1.6,
                      textAlign: "justify",
                      color: "rgba(0,0,0,0.82)",
                      fontSize: "1.08rem",
                      fontFamily: "'Noto Serif', serif",
                    }}
                  >
                    {p.text}
                  </Typography>
                </Box>
              </Paper>
              </motion.div>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
