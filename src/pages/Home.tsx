import { Box, Stack, Typography } from "@mui/material";
import WeddingFallingImages from "../components/WeddingFallingImages";
import { IMAGE_DOVE, LIST_IMAGES_FALLING } from "../constants/common";
import TopSection from "../components/home/TopSection";
import StorySection from "../components/home/StorySection";
import VideoSection from "../components/home/VideoSection";
import ProfileSection from "../components/home/ProfileSection";
import MusicPlayerFloating from "../components/MusicPlayerFloating";
import CollectionSection from "../components/home/CollectionSection";
import EventSection from "../components/home/EventSection";

export default function Home() {
  return (
    <>
      <Box>
        <TopSection />
        <StorySection />
        <VideoSection />
        <ProfileSection />
        <CollectionSection />
        <EventSection />
      </Box>
      <WeddingFallingImages
        images={LIST_IMAGES_FALLING}
        doveImage={IMAGE_DOVE}
        enableGlitter={true}
        enableFireworks={false}       // khuyên: bật sparingly (burst gây đông)
        enableDoves={true}
        enableBokeh={true}
        enableSync={true}
        slowMotion={false}
        zIndex={9999}
      />
      <MusicPlayerFloating />
    </>
  );
}
