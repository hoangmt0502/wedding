import { Box, Typography } from "@mui/material";
import { useContentWidth } from "../../hooks/useContentWidth";
import SharedImage from "../SharedImage";
import { MAIN_COLOR } from "../../constants/common";

const PersonCard = ({ image, name, father, mother, address }: any) => (
  <Box
    sx={{
      width: { xs: "100%", md: "46%" },
      background: "rgba(255,255,255,0.85)",
      borderRadius: "14px",
      border: "1.7px solid rgba(200,150,70,0.65)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 0 30px rgba(0,0,0,0.08)",
      p: 3,
      textAlign: "center",
      transition: "0.35s",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 0 35px rgba(0,0,0,0.16)",
      }
    }}
  >
    {/* Ảnh */}
    <Box
      component="img"
      src={image}
      sx={{
        width: 260,
        height: 360,
        borderRadius: "10px",
        objectFit: "cover",
        boxShadow: "0 6px 22px rgba(0,0,0,0.32)",
        mx: "auto",
        transition: "0.45s",
        "&:hover": { transform: "scale(1.05)" }
      }}
    />

    {/* Tên */}
    <Typography
      sx={{
        mt: 2.5,
        fontFamily: "'Great Vibes', cursive",
        fontSize: 34,
        fontWeight: 600,
        color: "#2e2e2e"
      }}
    >
      {name}
    </Typography>

    <Typography sx={{ fontSize: 14, opacity: 0.55, my: 1 }}>♡</Typography>

    {/* Nhà */}
    <Typography
      sx={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: 0.6,
        color: "#7b5a2f",
        mb: .5
      }}
    >
      {name === "Xuân Thịnh" ? "NHÀ TRAI" : "NHÀ GÁI"}
    </Typography>

    {/* Cha mẹ */}
    <Typography
      sx={{
        fontFamily: "'Cormorant Garamond', serif",
        color: "#3f3f3f",
        lineHeight: 1.55,
        fontSize: 15
      }}
    >
      {father} <br/> {mother}
    </Typography>

    <Typography sx={{ mt: 1.5, fontSize: 14, color: "#555" }}>
      {address}
    </Typography>
  </Box>
);


export default function GroomBrideSection() {
  const { compactWidth } = useContentWidth();

  return (
    <Box sx={{ width: "100%", pb: 9, display: "flex", justifyContent: "center", background: 'rgb(248, 246, 246)' }}>
      <Box
        sx={{
          width: compactWidth,
          mx: "auto",
          borderRadius: 3,
          backgroundImage: "url('https://daknong.1cdn.vn/2025/07/25/1(1).jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        {/* Gradient overlay sang trọng hơn */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.58) 10%, rgba(255,255,255,0.65) 90%)",
            backdropFilter: "blur(6px)",
            zIndex: 1,
          }}
        />

        {/* CONTENT */}
        <Box sx={{ position: "relative", zIndex: 2, textAlign: "center", py: 4 }}>
          <SharedImage src="/images/marriage_icon.png" width={75} style={{ margin: "0 auto" }} />

          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontWeight: 600,
              letterSpacing: 1,
              color: 'rgb(54, 54, 54)',
              fontSize: 40,
              mt: 1,
              mb: 5,
            }}
          >
            Chú Rể & Cô Dâu
          </Typography>

          {/* Flex layout card */}
          <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={6} justifyContent="center">
            <PersonCard
              image="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474087zej/anh-chu-re-don-2k_013637758.jpg"
              name="Xuân Thịnh"
              father="Nguyễn Xuân Dung"
              mother="Nguyễn Thị Tuyết"
              address="Tư gia: Xóm 9, Diễn Thái, Diễn Châu, Nghệ An."
            />

            <PersonCard
              image="https://bizweb.dktcdn.net/100/368/426/products/set-vay-chup-anh-cuoi-ngoai-canh-jpeg.jpg?v=1703058721527"
              name="Diễm Hằng"
              father="Nghiêm Xuân Hợp"
              mother="Nguyễn Thị Loan"
              address="Tư gia: Phố Chàng, Việt Tiến, Việt Yên, Bắc Giang."
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
