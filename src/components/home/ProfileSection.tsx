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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import { useContentWidth } from "../../hooks/useContentWidth";
import SharedImage from "../SharedImage";

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
        mb: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{ style: { display: "none" } }} // Ẩn gạch dưới
        sx={{
          width: '100%',
          py: 6,
          border: "1px solid #fff",
          borderRadius: 2,
          "& .Mui-selected": {
            color: "#333 !important",
            border: "none !important",
          },
          
          "& .MuiTabs-list": {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },

          // Style chung cho tab
          "& .MuiTab-root": {
            minWidth: 300,
            px: 4,
            py: 3,
            mx: 4,
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

  // Lấy id profile tương ứng tab
  const activeId = TABS[tab].targetId;

  // Filter profile
  const activeProfile = PROFILES.filter((p) => p.id === activeId);

  return (
    <Box sx={{background: "#faf6f6", pb: 4, pt: 1 }}>
      <Box sx={{ width: compactWidth, mx: "auto" }}>
        <HeaderTabs src={src} tabs={TABS} value={tab} onChange={setTab} />

        {activeProfile.map((p) => (
          <Grid
            key={p.id}
            container
            spacing={3}
            sx={{ mb: 6 }}
            direction="row"
          >
            <Grid item xs={12} md={6}>
              <SharedImage
                src={p.image}
                alt={p.name}
                style={{ width: "100%", display: "block", borderRadius: 4, height: 700 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, borderRadius: 2, height: "100%" }}>
                <Box sx={{
                  border: '1px solid #747474ff',
                  borderRadius: 2,
                  p: 2
                }}>
                  <Box sx={{ display: 'flex', justifyContent: "center", mb: 2 }}>
                    <SharedImage src="/images/story_icon.png" alt="decor" width={150} height={80} variant="cover"/>
                  </Box>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {p.name}
                  </Typography>
  
                  <Typography
                    variant="body1"
                    sx={{ mt: 2, lineHeight: 1.6, textAlign: 'justify' }}
                  >
                    {p.text}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
