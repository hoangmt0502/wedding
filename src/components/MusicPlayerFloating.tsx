import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { PLAYLIST } from "../constants/common";

const globalStyles = `
@keyframes rotateMusic {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulseMusic {
  0% { transform: scale(1); }
  50% { transform: scale(1.18); }
  100% { transform: scale(1); }
}

@keyframes ripple {
  0% { transform: scale(1); opacity: 0.4; }
  70% { transform: scale(1.8); opacity: 0; }
  100% { opacity: 0; }
}

@keyframes pinkGlow {
  0% { box-shadow: 0 0 0px rgba(255, 77, 143, 0.4); }
  50% { box-shadow: 0 0 28px rgba(255, 77, 143, 0.75); }
  100% { box-shadow: 0 0 0px rgba(255, 77, 143, 0.4); }
}
`;


export default function MusicPlayerFloating() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * PLAYLIST.length)
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = PLAYLIST[currentIndex];

    const tryPlay = async () => {
      try {
        await audio.play();
        console.log("Audio started after user gesture");
      } catch (err) {
        console.log("play blocked:", err);
      }
    };

    window.addEventListener("scroll", tryPlay, { once: true });
    window.addEventListener("click", tryPlay, { once: true });
    window.addEventListener("touchstart", tryPlay, { once: true });
    window.addEventListener("wheel", tryPlay, { once: true });

    return () => audio.pause();
  }, [currentIndex]);

  // Khi bài hát kết thúc → random bài khác
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      let next = currentIndex;

      // Random cho đến khi khác bài hiện tại
      while (next === currentIndex && PLAYLIST.length > 1) {
        next = Math.floor(Math.random() * PLAYLIST.length);
      }

      setCurrentIndex(next);
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentIndex]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <style>{globalStyles}</style>

      <Box
        onClick={toggle}
        sx={{
          position: "fixed",
          bottom: 24,
          left: 24,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 9999,
          overflow: "visible",
          transition: "transform 0.2s ease",
          animation: playing
            ? "pinkGlow 2s infinite ease-in-out"
            : "none",
          "&:hover": {
            transform: "scale(1.08)",
          },
        }}
      >
        {/* Hiệu ứng ripple khi đang phát */}
        {playing && (
          <Box
            sx={{
              position: "absolute",
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "rgba(255, 77, 143, 0.15)",
              animation: "ripple 2.2s infinite ease-out",
            }}
          />
        )}

        {/* ICON SVG */}
        {playing ? (
          <Box sx={{
            animation: playing ? "pulseMusic 2s infinite ease-in-out" : "none",
            display: "flex",
          }}>
            {/* PLAY ICON */}
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="#ff4d8f"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="M8.962 17.968V6.696a1.5 1.5 0 0 1 1.106-1.447l8.15-2.223a1.5 1.5 0 0 1 1.895 1.447v11.468M8.963 9.92l11.15-3.04M8.962 17.968a3.041 3.041 0 1 1-6.082 0a3.041 3.041 0 0 1 6.082 0" />
                <path d="M20.113 15.94a3.041 3.041 0 1 1-6.082 0a3.041 3.041 0 0 1 6.082 0" />
              </g>
            </svg>
          </Box>
        ) : (
          <Box>
            {/* OFF ICON */}
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 20 20">
              <path
                fill="#888"
                d="M2.854 2.146a.5.5 0 1 0-.708.708L7 7.707V13.5a2.5 2.5 0 1 0 1 2V8.707l3.414 3.414a2.5 2.5 0 0 0 3.465 3.465l2.267 2.268a.5.5 0 0 0 .708-.708zm11.293 12.708a1.5 1.5 0 0 1-2-2zM5.5 14a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m8-3q-.18 0-.354.025l2.83 2.829q.023-.174.024-.354V3.18a1 1 0 0 0-1.298-.954l-7 2.187a1 1 0 0 0-.617.55L8 5.88v-.511l7-2.188v1.952L9.098 6.977l.798.798L15 6.18v5.32a2.5 2.5 0 0 0-1.5-.5"
              />
            </svg>
          </Box>
        )}
      </Box>

      <audio ref={audioRef} loop={false} playsInline />
    </>
  );
}
